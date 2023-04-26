import express from "express";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken"

const router = express.Router();

// get all blogs
router.get("/", async (req, res) => {
    const allProduct = await Product.find();
    allProduct.length ? res.status(200).json(allProduct) : res.status(404).json({ message: "No posts found" });
})

// get single post by id
router.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findById(id);
        return res.status(200).json(findProduct);
    } catch (error) {
        return res.status(404).json({
            Message: "Product Not found"
        });
    }
});

// post new blog 
router.post("/", async (req, res) => {
    const { content } = req.body
    const product = req.body
    const findProduct = await Product.findOne({ content: content })

    if (findProduct) return res.status(404).json({
        Message: "Product Already Exits"
    })

    const newProduct = await new Product(post);
    const savedProduct = newProduct.save();
    if (savedProduct) {
        return res.status(200).json({
            isSaved: true
        })
    }
    res.status(500).json({
        isSaved: false,
        Error: "Something happend with server"
    })
})

// edit post, if user authenticated, then edit or show auth required
router.patch("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newPost = req.body;
        const findPost = await Post.findById(id);

        if (findPost) {
            const updatePost = await Post.updateOne(newPost)
            if (updatePost) {
                return res.json({
                    Msg: "updated"
                })
            }
            else {
                return res.json({
                    Msg: "not updated"
                })

            }
        }
    } catch (error) {
        return res.status(404).json({
            Message: "Something happend,Please try again!"
        });
    }
})

// delete post, if user authenticated
router.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findPost = await Product.deleteOne({ _id: id })
        
        if (findPost.deletedCount === 0) {
            return res.status(404).json({
                Message: "Post Not Found!"
            });
        }
        return res.status(200).json({
            Message: "Post Deleted Successfully!"
        });
    } catch (error) {
        return res.status(404).json({
            Message: "Server issue!"
        });

    }
})

// Generate token for auth
// router.get("/auth", async (req, res) => {
//     const { username } = req.body
//     const token = jwt.sign({ username: username }, "secrete-" + username, { expiresIn: "2h" });
//     return res.json({
//         token: token,
//     })
// })

export { router as productRouter }