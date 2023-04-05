import mongoose, { Schema, mongo } from "mongoose";

// creating post schema, will change later for auth and username
const schema = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}

const PostSchema = mongoose.Schema(schema);
const Post = mongoose.model("blog-posts", PostSchema);

export default Post;