import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken"

const router = express.Router();

// get all blogs
router.get("/", async (req, res) => {
    const allPosts = await Post.find();
    allPosts.length ? res.status(200).json(allPosts) : res.status(404).json({ message: "No posts found" });
})

// get single post by id
router.get("/post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findPost = await Post.findById(id);
        return res.status(200).json(findPost);
    } catch (error) {
        return res.status(404).json({
            Message: "Post Not found"
        });
    }
});

// post new blog 
router.post("/", async (req, res) => {
    const { content } = req.body
    const post = req.body
    const findPost = await Post.findOne({ content: content })

    if (findPost) return res.status(404).json({
        Message: "Post Already Exits"
    })

    const newPost = await new Post(post);
    const savedPost = newPost.save();
    if (savedPost) {
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
router.patch("/post/:id", async (req, res) => {
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
router.delete("/post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findPost = await Post.deleteOne({ _id: id })
        
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

export { router as postRouter }