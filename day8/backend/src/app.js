/*
server ko create karna
server ko config karna

*/
const express=require('express');
const noteModel=require('./models/note.model');
const cors = require("cors"); 
const path=require("path")

const app=express();
app.use(cors());

app.use(express.json());
// http://localhost:3000/assets/index-B6ttKwmf.js
// http://localhost:3000/assets/index-Bl-QtQ08.css
app.use(express.static("./public"))
/*post
/api/notes new notes create krna and save in db
*/
app.post("/api/notes",async(req,res)=>{
    const {title,description}=req.body;
   const notes=await noteModel.create({
        title,description
    }
)
   res.status(201).json({
    message:"Note created successfully",
     notes
   })
})

/*get
/api/notes 
fetch all notes from db
*/
app.get("/api/notes",async(req,res)=>{
   note= await noteModel.find();
   res.status(200).json({
    message:"Notes fetched successfully",
    note
   })
})
/*delete
/api/notes/:id
delete note by id
*/
app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id;
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note delete successfully"
    })

})

/*patch
/api/notes/:id
update note by id
*/
app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id;
    const {description}=req.body;
   await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated successfully"
    })
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
    })
module.exports=app;