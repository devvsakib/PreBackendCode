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


// Update user's  Basic Information
router.patch("/:userID/basic-information", async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.basicInformation = updatedInfo;
        await user.save();

        res.status(200).json(user.basicInformation);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user's  Partner Expectation
router.patch("/:userID/partner-expectation", async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.partnerExpectation = updatedInfo;
        await user.save();

        res.status(200).json(user.partnerExpectation);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user's  Family Information
router.patch("/:userID/family-information", async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.familyInformation = updatedInfo;
        await user.save();

        res.status(200).json(user.familyInformation);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user's  Physical Attributes
router.patch("/:userID/physical-attributes", async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.physicalAttributes = updatedInfo;
        await user.save();

        res.status(200).json(user.physicalAttributes);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user's Address
router.patch("/:userID/address", async (req, res) => {
    try {
        const { userID } = req.params;
        const { addressType, updatedAddress } = req.body;

        if (!addressType || !updatedAddress) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOneAndUpdate(
            { userID, "address.addressType": addressType },
            { $set: { "address.$": updatedAddress } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User or address not found" });
        }

        res.status(200).json(user.address);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add education information
router.post("/:userID/education", async (req, res) => {
    try {
        const { degree, institution, start, end, status } = req.body;

        if (!degree || !institution || !start || !end || !status) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.education.push({ degree, institution, start, end, status });
        await user.save();

        res.status(201).json(user.education);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update education information
router.patch("/:userID/education/:educationID", async (req, res) => {
    try {
        const { degree, institution, start, end, status } = req.body;

        if (!degree || !institution || !start || !end || !status) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const educationIndex = user.education.findIndex(edu => edu._id.toString() === req.params.educationID);
        if (educationIndex === -1) {
            return res.status(404).json({ error: "Education not found" });
        }

        user.education[educationIndex] = { degree, institution, start, end, status };
        await user.save();

        res.status(200).json(user.education);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



export { router as usersRoute }