import { Router } from "express";
import { register, verifyEmail, login, getMe } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();

/**
 * @route POST /api/auth/resister
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 * 
 */

authRouter.post("/register", registerValidator,register);


/**
 * @route Post /api/auth/login
 * @desc Login user and return JWT token
 * @access PUblic
 * @body { emaail, password}
 */

authRouter.post("/login", loginValidator, login)

/**
 * @route GEt /api/auth/get-me
 * @desc Get current logged in user's deatils
 * @acess Private
 */
authRouter.get('/get-me', authUser, getMe)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */

authRouter.get('/verify-email', verifyEmail)

export default authRouter;