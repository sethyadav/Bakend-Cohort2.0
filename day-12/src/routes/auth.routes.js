
//  /api/auth/register agar /register use karana hai to
//  /api/auth use karana ho ham
//  /api/auth ke jagah kuchh bhi likh sakate hai
//  jaise /seth   ye bhi lihk sakate hai



const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    //try {
        const { email, name, password } = req.body

        // 1️⃣ check: email already exists?
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            console.log("❌ With this email user already exists")
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }

        // 2️⃣ create new user
        const user = await userModel.create({
            email,
            name,
            password
        })

        const token = jwt.sign(
            {
                id: user._id,
                email:user.email
            },
            process.env.jwt_SECRET
        )

        res.cookie("jwt_token", token)

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        })

    // } catch (error) {

        // 3️⃣ duplicate key error (extra safety)
        // if (error.code === 11000) {
        //     return res.status(400).json({
        //         message: "Email already exists"
        //     })
        // }

        // res.status(500).json({
        //     message: "Server error",
        //     error
        // })
    //}

   
})

module.exports = authRouter
