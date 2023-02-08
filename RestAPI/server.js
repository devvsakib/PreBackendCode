import express, { response } from "express";
import bodyParser from "body-parser";
import UserRouter from "./routers/users.js"

const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use("/", UserRouter)

app.get("/", (request, response) => {
    response.send("Hello RestAPI Home")
})

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})