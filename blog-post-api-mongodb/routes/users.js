import expres from "express";
import User from "../models/User.js";
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
    if (!findUser) return res.json({
        message: "No user found",
        statusCode: 400
    })

    res.json(findUser)
})

router.post("/register", async (req, res) => {
    const user = req.body
    const findUser = await User.findOne({ username: user.username })
    if (findUser) return res.json({
        message: "Username already taken!",
        statusCode: 400
    })


    const hashP = await bcrypt.hash(user.password, 10);

    const newUser = await new User({ ...user, password: hashP })
    newUser.save()
    res.json(
        {
            message: "Account Created Successfully!",
            statusCode: 201
        }
    )
})

router.post("/login", async (req, res) => {
    const { password, username } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.json({
        message: "User doesn't exist!",
        statusCode: 400
    })
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({
            message: "Username or Password not currect!"
        })
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.json(
        {
            token,
            userId: user._id,
            username: user.username,
            message: "Login Successfully!",
            statusCode: 200
        }
    )
})

router.patch("/:username", auth, async (req, res) => {
    const user = req.body;
    const { username } = req.params;
    if (user.username !== username) return res.status(400).json({
        message: "Username can't be changed",
        statusCode: 400,
    });
    try {
        if(user.password) {
            const hashP = await bcrypt.hash(user.password, 10);
            user.password = hashP
        }

        const updatedUser = await User.updateOne(
            { username: username },
            { ...user }
        );

        if (updatedUser.n === 0) {
            return res.status(404).json({
                message: "User not found",
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            statusCode: 200,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



export default auth;
export { router as userRouter }