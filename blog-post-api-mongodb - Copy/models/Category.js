import mongoose from "mongoose";

const category = {
    id: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}

const CategorySchema = mongoose.Schema(category);
const Category = mongoose.model("categories", CategorySchema);

export default Category;
