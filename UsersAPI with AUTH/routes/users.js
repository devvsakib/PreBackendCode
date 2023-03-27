import express from "express"
import User from "../models/User.js"

const router = express.Router();

// Get all users from database
router.get("/users", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

export default  router;