const express = require("express")
const postRouter = express.Router()
const PostController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


/**
 * Post /api/posts [protected]
 * -req.body = { caption,image-file }
 */

postRouter.post('/',upload.single("image"), identifyUser, PostController.createPostController)

/**
 * GET /api/posts/ [protected]
 */

postRouter.get("/", identifyUser, PostController.getPostController)

/**
 * GET  /api/posts/details/:postid
 * - return an detail about specific posts with the id. also check whether the posts 
 * bleong to user that request come from
 */

postRouter .get ("/details/:postId",PostController.getPostDetailsController)

module.exports = postRouter