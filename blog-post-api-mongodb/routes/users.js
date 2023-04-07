import User from "../models/User.js";
import express from "express";

const router = express.Router();


// get all users
router.get("/", async (req, res) => {
    const users = await User.find();
    users.length ? res.status(200).json(users) : res.status(404).json({
        Message: "No User's found"
    })
})


// register user
router.post("/", async (req, res) => {
    const user = req.body;
    try {
        if (user.username && user.email) {
            const users = await User.findOne({ username: user.username });
            users && res.status(403).json({
                Message: "Username already taken!"
            })
            const newUser = await User(user)
            const savedUser = newUser.save();
            savedUser ? res.status(201).json({
                Message: "Register Successful"
            }) : res.status(200).json({
                Message: "Please try again!"
            })
        } else {
            res.status(200).json({
                Message: "All field required"
            })
        }
    } catch (error) {
        res.status(200).json({
            Message: error.message
        })
    }
})


export { router as userRouter }