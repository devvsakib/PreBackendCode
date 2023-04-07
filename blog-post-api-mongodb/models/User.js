import mongoose from "mongoose";

const user = {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    post: {
        type: Array
    }
}

const UserSchema = mongoose.Schema(user);
const User = mongoose.model("users", UserSchema);

export default User;
