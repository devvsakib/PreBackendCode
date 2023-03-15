import mongoose from "mongoose";

const user = {
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipes"
        }
    ]
}

const UserSchema = new mongoose.Schema(user)


const UserModel = mongoose.model("users", UserSchema)

export default UserModel;