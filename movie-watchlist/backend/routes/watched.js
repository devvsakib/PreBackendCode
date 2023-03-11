const express = require("express");
const { send } = require("vite");
const router = express.Router();
const Watchedlist = require("../models/Watchlist")

router.get("/", async (req, res) => {
    const movie = await Watchedlist.find({})
    try {
        res.json(movie)
        console.log(movie);
    } catch (error) {
        console.log(error);
    }
})


router.post("/add", async (req, res) => {
    const { name, watched, thumbnail, description } = req.body

    try {
        const data = new Watchedlist({ name, thumbnail, description, watched })
        const newMovie = await data.save();
        res.json(newMovie)
    } catch (error) {
        console.log("Something is wrong. Please try again");
        res.status(401).json(error.message)
    }

})

router.get("/watched", async (req, res) => {
    const movie = await Watchedlist.find({ watched: true })
    try {
        res.json(movie)
        console.log(movie);
    } catch (error) {
        console.log(error);
    }
})

router.get("/watchlist", async (req, res) => {
    const movie = await Watchedlist.find({ watched: false })
    try {
        res.json(movie)
        console.log(movie);
    } catch (error) {
        console.log(error);
    }
})


router.get("/:name", async (req, res) => {
    const movie = await Watchedlist.findOne({ name: req.params.name })
    try {
        movie ? res.json(movie) : res.json({ message: "Movie not found" })

    } catch (error) {
        res.json({ message: error })
    }

})

router.delete("/:name", async (req, res) => {
    const movie = await Watchedlist.findOneAndDelete({ name: req.params.name })
    try {
        // delete movie

        movie ? res.json(movie) : res.json({ message: "Movie not found" })

    } catch (error) {
        res.json({ message: error })
    }

})

router.patch("/update", async (req, res) => {
    const watched = req.body.watched
    try {
        const movie = await Watchedlist.findOneAndUpdate({ name: req.body.name }, { watched: true })
        const newMovie = await movie.save();
        res.json(newMovie)
    } catch (error) {
        res.json({ message: error })
    }
})


module.exports = router