const express = require("express")
const postRouter = express.Router()
const PostController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


/**
 * @routes Post /api/posts [protected]
 * -req.body = { caption,image-file }
 */

postRouter.post('/',upload.single("image"), identifyUser, PostController.createPostController)

/**
 * @route GET /api/posts/ [protected]
 */

postRouter.get("/", identifyUser, PostController.getPostController)

/**
 * @route GET  /api/posts/details/:postid
 * @description return an detail about specific posts with the id. also check whether the posts 
 * bleong to user that request come from
 */

postRouter .get ("/details/:postId",identifyUser,PostController.getPostDetailsController)

/**
 * @route POST  /api/posts/like/:postid
 * @description like a post with the id provided in the request params
 */

postRouter.post("/like/:postId", identifyUser, PostController.likePostController)

module.exports = postRouter
