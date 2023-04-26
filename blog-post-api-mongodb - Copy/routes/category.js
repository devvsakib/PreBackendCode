import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";


const router = express.Router();

router.get("/", async (req, res)=> {
    const getCategories = await Category.find()
    getCategories.length  > 0 ? res.json(getCategories) : res.json({mesage: "No Category Found"})
})

export {router as categoryRouter}