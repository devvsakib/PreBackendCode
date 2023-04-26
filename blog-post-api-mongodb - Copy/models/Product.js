import mongoose, { Schema, mongo } from "mongoose";

// creating post schema, will change later for auth and username
const schema = {
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}

const ProductSchema = mongoose.Schema(schema);
const Product = mongoose.model("products", ProductSchema);

export default Product;