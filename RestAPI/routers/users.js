import express, { request, response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [
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

router.get("/user/:id", (request, response) => {
    const { id } = request.params;
    const userFound = users.find(user => user.id === id)
    response.send(userFound)
})

router.delete("/user/:id", (request, response) => {
    const { id } = request.params;
    users = users.filter(user => user.id !== id)
    response.send(`this ${id} user deleted.`)
})

export default router