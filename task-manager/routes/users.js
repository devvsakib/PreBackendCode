const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');
require('../passport');
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'Server error': err.message });
    }
});

// Signup a new user
router.post('/signup', (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        User.register(user, password.toString(), (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.sendStatus(200);
                });
            }
        });
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

// Login
// Login
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      try {
        const match = await user.comparePassword(req.body.password);
  
        if (!match) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ token });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  });
  

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

module.exports = router;