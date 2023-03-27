import express from "express"
import User from "../models/User.js"

const router = express.Router();

// Response JSON, will use to reduce code and DRY
const resJson = (message, code) => {
    const jsn = {
        message: message,
        code: code
    }
    return jsn
}

// Get all users from database
router.get("/users", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// Create new user
router.get("/user/:username", async (req, res) => {
    const user = req.params
    const findUser = await User.findOne({ username: user.username })
    findUser ? res.json(findUser) : res.json(resJson("not found", 201))
})

export default router;