import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { usersRoute } from "./routes/user.js";

const PORT = process.env.PORT || 5000
const app = express();
dotenv.config()

// middleware
app.use(cors())
app.use(bodyParser.json());

// connect mongoose
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URI, options)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });


// Status
app.get("/", (req, res) => res.status(200).json({
    message: "Running",
    server: "Alive",
    statusCode: 200
}))



// Users Route
app.use("/api/users", usersRoute)

// Incorrect route message
app.get('*', (req, res) => {
    const { method, originalUrl, body } = req;
    const response = {
        method,
        url: originalUrl,
        data: {
            message: "Endpoint Not correct",
            server: "Alive",
            statusCode: 404
        },
    };
    res.json(response);
});


app.listen(PORT, () => console.log("Running at port ", PORT))
