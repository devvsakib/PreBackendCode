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
router.post("/", async (req, res) => {
    const user = req.body;
    if (!user.password || !user.basicInformation.email) return res.status(400).json({ error: "Missing required fields!" });
    try {
        const newUser = req.body;
        const findUser = await User.findOne({ email: newUser.email })
        if (findUser) return res.status(400).json({ error: "Email already used!" });

        // Generate UUID
        const translator = shortUUID('0123456789');
        const shortID = translator.new().slice(0, 6);
        newUser.userID = shortID;

        // hash password
        newUser.password = await bcrypt.hash(newUser.password, 10);

        const user = new User(newUser);

        const savedUser = await user.save();
        if (!savedUser) return res.status(400).json({ error: "User not Registered!" });

        res.status(201).json(responseMessage("User created successfully", savedUser.userID));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export { router as usersRoute }