import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const users = [
]

router.get("/user", (request, response) => {
    response.send(users)
})

router.post("/user", (request, response) => {
    const user = request.body;
    const userId = uuidv4();
    const addUserId = { ...user, id: userId }
    users.push(addUserId)
    response.send(user);
})


export default router