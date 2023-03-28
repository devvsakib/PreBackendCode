import express from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken";

const router = express.Router();

// Response JSON, will use to reduce code and DRY
const resJson = (message, token, userId) => {
    if (userId && token) {
        const jsn = {
            message: message,
            token: token,
            userId: userId
        }
        return jsn
    }
    const jsn = {
        message: message
    }
    return jsn
}

// Authontication middleware
const auth = (req, res, next) => {
    const token = req.headers.x_auth_token
    if (!token) return res.status(401).json(resJson("Please Login First!"))

    jwt.verify(token, "secret-" + req.params.username, err => {
        if (err) return res.status(403).json(resJson("Unauthorized Access Attempted!"))
        next();
    })
}

// Get all users from database
router.get("/users", async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})
// Create new user
router.post("/user", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })

    if (findUser) {
        return res.status(401).json(resJson("Username Already Taken!"))
    }

    if (!user.password || !user.username || !user.name) {
        return res.status(401).json(resJson("All field Required"))
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const saveUser = await new User({ ...user, password: hashedPassword })

    saveUser.save();
    res.status(201).json(resJson("Registration Success!"))

})

// Login user
router.post("/auth", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })

    if (!findUser) {
        return res.status(404).json(resJson("User Not Found"))
    }

    if (!user.password || !user.username) {
        return res.status(422).json(resJson("All field Required"))
    }

    const comparePassword = bcrypt.compareSync(user.password, findUser.password);

    if (!comparePassword) {
        return res.status(401).json(resJson("Password is incorrect"))
    }

    // Generate token for login AUTH
    const token = jwt.sign({ id: findUser._id,  username: findUser.username }, "secret-" + user.username, { expiresIn: "7d" })
    // const token = jwt.sign({ id: findUser._id,  username: findUser.username }, "secret", { expiresIn: "7d" })

    // Send toking token to client to store in cookies 
    return res.status(200).json(resJson("Password Matched", token, findUser._id))
})

// Update user information, auth middleware to check if usr logged in or not
router.patch("/auth/:username", auth, async (req, res) => {
    const user = req.body;
    const { username } = req.params;
    const findUser = await User.findOne({ username: user.username })

    if (username !== user.username) return res.status(403).json(resJson("Username cannot be change"))

    if (!findUser) return res.status(404).json(resJson("User not found,Please your username"))

    const updatedUser = await User.updateOne({ username: username }, { ...user });
    if (updatedUser) {
        return res.status(200).json(resJson("Update Succesfull"))
    }
    return res.status(500).json(resJson("Server Error. Please try again"))

})

// Delete user, auth middleware to check if usr logged in or not
router.delete("/auth/:username", auth, async (req, res) => {
    const username = req.params.username;
    const findUser = await User.findOne({ username })

    if (!findUser) {
        return res.status(404).json(resJson("User not found"))
    }

    const deleteUser = await User.deleteOne(findUser)
    if (deleteUser) {
        return res.status(200).json(resJson("User Deleted"))
    }
    res.status(500).json(resJson("Server Error, Please try again"))
})


// Get a user by username 
router.get("/user/:username", async (req, res) => {
    const user = req.params
    const findUser = await User.findOne({ username: user.username })
    findUser ? res.status(200).json(findUser) : res.status(201).json(resJson("not found"))
})



export default router;