/* database se connect karane ke liye ek folder banao 'config' aur usame ek file create  karo 'database.js'  */

const mongoose = require("mongoose")

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB")
    })
}

module.exports = connectToDB