import expres from "express";
import Category from "../models/Category.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = expres.Router();

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.json({
                message: "Please Login!"
            })
            next()
        })
    } else {
        res.json({
            message: "Please Login!",
            statusCode: 401
        })
    }

}

router.get("/", async (req, res) => {
    const users = await User.find().select(["-password", "-email", "-_id"]);
    res.json(users);
})

router.get("/:username", async (req, res) => {
    const { username } = req.params
    const findUser = await User.findOne({ username: username }).select("-password")
    if (!findUser) return res.status(404).json({ message: "No user found" })

    res.json(findUser)
})

router.post("/register", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })
    if (findUser) return res.status(400).json({ message: "Username already taken!" })


    const hashP = await bcrypt.hash(user.password, 10);

    const newUser = await new User({ ...user, password: hashP })
    newUser.save()
    res.status(201).json({ message: "Account Created Successfully!" })
})

router.post("/login", async (req, res) => {
    const { password, username } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.status(400).json({ message: "User doesn't exist!" })
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(403).json({
            message: "Username or Password not currect!"
        })
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.status(200).json(
        {
            token,
            userId: user._id,
            username: user.username,
            message: "Login Successfully!"
        }
    )
})

router.patch("/:username", auth, async (req, res) => {
    const user = req.body;
    const { username } = req.params;
    if (user.username !== username) return res.status(400).json({
        message: "Username can't be changed"
    });
    try {
        if (user.password) {
            const hashP = await bcrypt.hash(user.password, 10);
            user.password = hashP
        }

        const updatedUser = await User.updateOne(
            { username: username },
            { ...user }
        );

        if (updatedUser.n === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:username", async (req, res) => {
    const { username } = req.params;
    const user = await User.deleteOne({ username: username })
    if (!user) return res.status(400).json({ message: "User password not matched!" })
    else return res.status(200).json({ message: "User deleted!" })
})

export default auth;
export { router as userRouter }