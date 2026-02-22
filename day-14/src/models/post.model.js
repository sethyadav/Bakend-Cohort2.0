const mongoose = require("mongoose")
//const { default: mongoose } = require("mongoose")


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""  
    },
    imageUrl:{
        type:String,
        required:[true, "imageUrl is required for creating an post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required for creating an post"]
    }
}, {timestamps:true });

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel