const app = require('./src/app');
const mangoose = require ("mongoose")

function connectToDb(){
    mangoose.connect("mongodb+srv://abhishek:3VYxvfkbheCtxPwi@cluster0.zonbh0h.mongodb.net/day-6")
    .then(() => {
        console.log("Connected to Database")
    })
}

connectToDb()

app.listen(3000, () => {
    console.log("server is running on port 3000");
})
