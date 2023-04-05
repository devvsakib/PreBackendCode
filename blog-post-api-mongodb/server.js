import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())

app.use(bodyParser.json())

app.get("/", (req, res) => res.json({ Message: "Hi, I'm working fine✅"}))

app.listen(PORT, ()=>console.log(`Server running at ${PORT}`))