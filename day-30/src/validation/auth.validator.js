import { body, validationResult } from "express-validator"

const validate =  (req,res,next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

     res.status(400).json({
        errors: errors.array()
    })

}
       


export const registerValidation = [
        body("username").isString().withMessage("username should be string"),
        body("email").isEmail().withMessage("email should be valid email address"),
        // body("password").isLength({ min: 6, max: 12 }).withMessage("password should be at leat 6 and 12 characters "),
        body("password").custom((value) => {
            if (value.length < 6 || value.length > 12 ) {
                throw new Error("password should be at least 6 and 12 characters long")
            }
            const passwordRegex = /(?=.*[A-Z])(?=.*\d).+$/
            if (!passwordRegex.test(value)) {
                throw new Error("password should contain at one uppercase letter and one number")
            }
            return true
        }),
        // .withMessage("password should be 6-12 characters and contain at least one uppercase letter and one number"),
        // .withMessage("password should be at least 6 characters long and conatin at least one uppercase letter"),
        validate
]
    