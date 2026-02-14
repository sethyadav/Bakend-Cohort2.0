const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({   
    // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
    console.log(req.body, req.file)

    const token = req.cookies.token

    if(!token) {
        return req.cookies(401).json({
           message: "Token not provided, Unauthorized"
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json ({
            message: "user not authorized"
        })
    }    
    console.log(decoded)

    const file = await imageKit.files.upload ({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",  
        folder: "cohort-2-test-posts"     
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully.",
        post
    })



    // res.send(file)
 
}

module.exports = {
    createPostController
}

