import mongoose from "mongoose"

const user = {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
};
// You can add email too

const UserModel = mongoose.Schema(user);
const User = mongoose.model("users", UserModel);

export default User;