import express from 'express';
import RecipesModel from "../models/Recipes.js"
import UserModel from '../models/User.js';
import auth  from './users.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const recipe = new RecipesModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json({ nessage: error.message })
    }
})
router.get('/', async (req, res) => {
    try {
        const response = await RecipesModel.find({})

        res.json(response)

    } catch (error) {
        res.json({ nessage: error.message })
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const recipe = await RecipesModel.findById(req.body.recipeId)
        const user = await UserModel.findById(req.body.userId)
        user.savedRecipes.push(recipe);
        await user.save()
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (error) {
        res.json({ nessage: error.message })
    }
})

router.get("/savedRecipes/id/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json({ savedRecipes: user.savedRecipes })
    } catch (error) {
        res.json({ nessage: error.message })
    }
})

router.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes }
        })
        res.json({ savedRecipes })
    } catch (error) {
        res.json({ nessage: error.message })
    }
})

export { router as recipesRouter } 