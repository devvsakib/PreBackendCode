import express from "express";
import User from "../models/User.js";
import shortUUID from "short-uuid";
import bcrypt from "bcrypt"
const router = express.Router()


const responseMessage = (message, data) => {
    return {
        message,
        data
    }
}


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//  register user
router.post("/", async (req, res) => {
    const user = req.body;
    if (!user.password || !user.basicInformation.email) return res.status(400).json({ error: "Missing required fields!" });
    try {
        const findUser = await User.findOne({ email: user.email })
        if (findUser) return res.status(400).json({ error: "Email already used!" });

        // Generate UUID
        const translator = shortUUID('0123456789');
        const shortID = translator.new().slice(0, 6);
        user.userID = shortID;

        // hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10)

        const savedUser = await new User({ ...user, password: hashedPassword }).save();
        if (!savedUser) return res.status(400).json({ error: "User not Registered!" });

        res.status(201).json(responseMessage("User created successfully", savedUser));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single user by userID
router.get("/:userID", async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // remove the password from the response
        const { password, ...data } = user._doc;
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete a user by userID
router.delete("/:userID", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as usersRoute }