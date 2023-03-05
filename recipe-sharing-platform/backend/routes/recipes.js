const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Create a new recipe
router.post('/', (req, res) => {
  const recipe = new Recipe(req.body);

  recipe.save()
    .then(() => res.json(recipe))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Get all recipes
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single recipe by ID
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Update a recipe by ID
router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a recipe by ID
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Recipe deleted successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;

