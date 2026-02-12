const userModel = require('../models/user.model');
const crypto = require('crypto')
const jwt = require("jsonwebtoken")



 async function registerController (req, res) {
    const {email,username,password,bio,profileImage } = req.body

     const isUserExistsByUsername = await userModel.findOne({ username })

    // if (isUserExistsByEmail) {
    //     return res.status(409).json({
    //         message: "user already exits with same email"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({ username })

    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message: "user already exists vy username"
    //     })
    // }


    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username},
            { email },
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)
        .json({
            message:"User already exists" + (isUserAlreadyExists.email ==
            email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    /* 
    *- USER KA DATA HOANA CHAHIYE
    *- DATA UNIQUE HONA CHAHIYE 
    */

    const token = jwt.sign({
        id: user._id

    },
    process.env.jwt_SECRET,
    {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registed successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController(req,res) {
    const { username,email,password } = req.body

    const user = await userModel.findOne({
        $or: [
            {
                /**
                 * condition
                 */
                username: username/*undefined*/
            },
            {
                /**
                 * condition
                 */

                email:email /* test@test.com */
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash == user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password invalid"
        })
    }

    const token = jwt.sign(
        { id: user._id},
        process.env.jwt_SECRET,
        { expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(200)
    .json({
        message: "User loggedIn successfully.",
        user:{
            username:user.username,
            email:user.email,
            bio:user,
            profileImage:user.profileImage
        }   
    })
}

module.exports = {
    registerController,
    loginController
}