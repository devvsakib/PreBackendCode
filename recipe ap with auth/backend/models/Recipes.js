import mongoose from "mongoose";


const user = {
    name: {
        type: String,
        require: true,
    },
    ingredients: [{
        type: String,
        require: true
    }],
    instructions: {
        type: String,
        require: true
    },
    imageUrl:{
        type: String,
        require: true
    },
    cookTime:{
        type: Number,
        require: true
    }, 
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        require: true
    },
}

const RecipesSchema = new mongoose.Schema(user)


const RecipesModel = mongoose.model("recipes", RecipesSchema)

export default RecipesModel;