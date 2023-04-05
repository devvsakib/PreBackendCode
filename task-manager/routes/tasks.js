const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Route handler for GET /tasks

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
