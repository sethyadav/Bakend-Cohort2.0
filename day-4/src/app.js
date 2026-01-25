/* 
- server create karana
- server ko config karana

*/

const express = require ("express")



const app = express()  /* server create ho jata hai */

app.use(express.json())  /* this is middle vayer */

const notes = [
    {

    }
]

app.get ("/", (req,res) => {
    res.send("hello world")
})

app.post("/notes", (req,res) => {
    console.log(req.body)
    notes.push(req.body)

    console.log(notes)

    res.send("note created")
})

app.get("/notes", (req,res) => {
    res.send(notes)
})

app.delete("/notes/:index", (req,res) => {
    delete notes[req.params.index]

    res.send("note delete succesfully")
})

app.patch("/notes/:index", (req,res) => {
    notes [req.params.index ].description = req.body.description
    res.send("Notes updated succesfully")
})

module.exports = app