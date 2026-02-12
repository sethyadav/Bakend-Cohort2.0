const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Useer name already exists"],
        require: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/wzul6hgil/profile.webp"

    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel