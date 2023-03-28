import express from "express"
import bcrypt from "bcrypt"
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
router.post("/user", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })

    if (findUser) {
        return res.json(resJson("Username Already Taken!", 401))
    }

    if (!user.password || !user.username || !user.name) {
        return res.json(resJson("All field Required", 401))
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const saveUser = await new User({ ...user, password: hashedPassword })

    saveUser.save();
    res.json(resJson("Registration Success!", 201))

})

// Login user
router.post("/auth", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })

    if (!findUser) {
        return res.json(resJson("User Not Found", 404))
    }

    if (!user.password || !user.username) {
        return res.json(resJson("All field Required", 422))
    }

    const comparePassword = bcrypt.compareSync(user.password, findUser.password);

    if (!comparePassword) {
        return res.json(resJson("Password is incorrect", 401))
    }
    return res.json(resJson("Password Matched", 200))
})

// Update user information
router.patch("/auth/:username", async (req, res) => {
    const user = req.body;
    const { username } = req.params;
    const findUser = await User.findOne({ username: user.username })

    if (username !== user.username) return res.json(resJson("Username cannot be change", 403))

    if (!findUser) return res.json(resJson("User not found,Please your username", 404))

    const updatedUser = await User.updateOne({ username: username }, { ...user });
    if (updatedUser) {
        return res.json(resJson("Update Succesfull", 200))
    }
    return res.json(resJson("Server Error. Please try again", 200))

})

// Delete user
router.delete("/auth/:username", async (req, res) => {
    const user = req.body;
    const { username } = req.params;
    const findUser = await User.findOne({ username: user.username })

    if (!findUser) {
        return res.json(resJson("User not found", 404))
    }

    const deleteUser = await User.deleteOne(findUser)
    if (deleteUser) {
        return res.json(resJson("User Deleted", 200))
    }


})

// Get a user by username 
router.get("/user/:username", async (req, res) => {
    const user = req.params
    const findUser = await User.findOne({ username: user.username })
    findUser ? res.json(findUser) : res.json(resJson("not found", 201))
})



export default router;