const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // User authenticated, generate token and return user object

    const token = jwt.sign({ userId: user._id }, secretKey);
    const { _id, username } = user;
    res.json({ token, user: { _id, username, email } });
});



module.exports = router;
