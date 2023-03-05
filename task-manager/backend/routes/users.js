const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


// Route handler for GET /users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
);

router.post('/signup', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.sendStatus(200);
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;