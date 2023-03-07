const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
// add user authentication
const passport = require('passport')
require('../passport');



async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.todo = todo;
    next();
}

router.get('/todos', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'Server error': err.message });
    }
});

router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            user: req.user._id // associate the todo with the logged-in user
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), getTodo, (req, res) => {
    res.json(res.todo);
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }

    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }

    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }

    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', getTodo, async (req, res) => {
    try {
        await res.todo.remove();
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





module.exports = router;
