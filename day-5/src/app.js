/*  isaka do kam hai =
 1= server ko create karana
 2= server ko config karana
*/

const express = require ("express");

const app = express();

app.use(express.json());

const notes = []

/* Post / notes */

app.post("/notes", (req,res) =>{
    notes.push(req.body);
    res.status(201).json({
        message: "Note created successfully"
        
    })

})

/* get / notes */ 

app.get('/notes', (req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

/* Delete / notes/:index */

app.delete("/notes/:seth", (req,res) => {
    delete notes [req.params.seth];

    res.status(204).json({
        message:" deleted successfully"
    })
})

/* patch /notes/:index */

app.patch("/notes/:index", (req,res)=>{
    notes[req.params.index] = req.body;
    res.status(200).json({
        message:"Note updated successfully"
    })
})


module.exports = app;