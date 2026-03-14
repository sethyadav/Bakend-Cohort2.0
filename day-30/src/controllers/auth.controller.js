export async function registerUser(req,res,next) {
    res.status(201).json({
        message: "User registed successfully"
    })
}