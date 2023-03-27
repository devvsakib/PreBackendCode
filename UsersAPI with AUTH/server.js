import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import usersRoute from "./routes/users.js"

const PORT = process.env.PORT || 5000
const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use(cors())

app.use("/", usersRoute)

app.use("/", (req, res) => {
    res.json({
        status: "API working fine",
        code: 200
    })
})


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(PORT, () => console.log(`DB Connected\nServer running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

