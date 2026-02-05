const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

app.use(express.json())

/*
- POST /NOTES
- req.body => {title,description}
*/

app.post("/notes", async (req,res) => {
    const {title,description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"Note created successfully",
        note
    })
})

/*
- GET/ NOTES
- fetch all the notes data

*/

app.get("/notes", async(req, res)=> {
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes fecthed successfully",
        notes
    })
})

module.exports = app