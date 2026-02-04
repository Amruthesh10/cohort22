// server ko create karna
// server ko config karna
const express=require("express");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome")
})

const notes=[]
 //post
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("created")
})


//get
app.get("/notes",(req,res)=>{
    res.send(notes)
})
//post and params for single word data such as index
app.post("/notes/:index",(req,res)=>{
        // console.log(req.params)
        console.log(req.params.index)
     res.send("index is")
})
//delete
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("deleted successfully")
})

//put
//helps to make changes in existing data
app.put("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description
    notes[req.params.index].title=req.body.title
    res.send("updated successfully")

})
module.exports=app;