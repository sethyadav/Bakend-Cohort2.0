const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require ("../models/like.model")

const imageKit = new ImageKit({   
    // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
    

   

    const file = await imageKit.files.upload ({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",  
        folder: "cohort-2-test-posts"     
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully.",
        post
    })



    // res.send(file)
 
}

async function getPostController(req,res) {

   

  const userId  = req.user.id

  const posts  = await postModel.find({
    user:userId
  })

  res.status(200)
  .json ({
    message: "Posts fetched successfully",
    posts
  })

}

async function getPostDetailsController(req, res) {

    

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json ({
        message:"Post fetchrd successfully.",
        post
    })
}

async function likePostController(req, res ) {
 try{
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(400).json({
            message: "post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })
  } catch(error) {
    console.log("Like Error", error)
    res.status(500).json({message: "Server error"})
  }
  
}

async function unLikePostController(req, res){
    const postId = req.params.postId
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn'n like "
        })
    }

    await likeModel.findByIdAndDelete({ _id: isLiked._id})

    return res.status(200).json({
        message: "post un liked successfully."
    })
}

// async function getFeedController(req,res){

//     const user = req.user

//     const posts = await Promise.all ((await postModel.find({})).sort({ _id: -1 }).populate("user").lean())
//        posts.map(async (post) => {
//            const isLiked = await likeModel.findOne({
//             user: user.username,
            
//             post: post._id
//            })

//            post.isLiked = !! isLiked

//            return post
//        })


//      res.status(200).json({
//         message:"posts fetched successfuly.",
//         posts
//     })
// }

async function getFeedController(req, res) {
    try {
        const user = req.user

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }

        const posts = await postModel
            .find({})
            // .sort({ _id: -1 })
            .populate("user")
            .lean()

        const updatedPosts = await Promise.all(
            posts.map(async (post) => {
                const isLiked = await likeModel.findOne({
                    user: user.username,
                    post: post._id
                })

                post.isLiked = !!isLiked
                return post
            })
        )

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: updatedPosts
        })

    } catch (error) {
        console.log("Feed Error:", error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController
}

