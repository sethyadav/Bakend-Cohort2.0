const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User name already exists"],
        require: [true, "User name is require"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        require: [true, "Email is require"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/wzul6hgil/profile.webp"

    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel