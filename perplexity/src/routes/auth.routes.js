import { Router } from "express";
import { body } from "express-validator";
import { register } from "../controllers/auth.controllers.js";
import { registerValidator } from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * @route POST /api/auth/resister
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 * 
 */

authRouter.post("/register", registerValidator,register);

export default authRouter;