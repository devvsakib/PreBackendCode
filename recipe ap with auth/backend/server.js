import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyPerser from "body-parser";

import { userRouter } from "./routes/users.js"
import { recipesRouter } from "./routes/recipes.js"

const PORT = process.env.PORT || 5000
dotenv.config();

const app = express();
app.use(bodyPerser.json())
app.use(cors())


app.use('/auth', userRouter)
app.use('/recipes', recipesRouter)


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.listen(PORT, () => console.log(`Server running at ${PORT} dude...`))