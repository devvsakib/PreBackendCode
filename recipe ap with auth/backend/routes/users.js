import express from 'express'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserModel from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await UserModel.findOne({ username });
    const useremail = await UserModel.findOne({ email });

    if (user || useremail) {
        return res.json({
            message: "User Already Exits"
        })
    }
    const hashP = await bcrypt.hash(password, 10);

    const newUser = await new UserModel({ username, password: hashP, email })
    newUser.save()
    res.json({
        message: "Register Success!",
        username: username
    })

})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({
            message: "User Doesn't Exits"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({
            message: "Username or Password not currect!"
        })
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token, userId: user._id, username: user.username })


})

export { router as userRouter };

 const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        
        jwt.verify(token, "secret", (err) => {
            if(err) return res.json({
                message: "Please Login!"
            })
            next()
        })
    }else{
        res.sendStatus(401)
    }
        
}

export default auth;