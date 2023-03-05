const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Logout route

router.post('/', auth, async (req, res) => {
    try {
        // console.log(req.body);
        // const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
        // const userId = decoded.userId;
        // const user = await User.findById(userId);
        // console.log(req.token);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.send("dsfsd");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
