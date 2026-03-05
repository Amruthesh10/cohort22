const mongoose=require("mongoose")

const songSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood: {
  type: String,
  enum: ["happy", "surprised", "sad"]
  }
   
})

const songModel=mongoose.model("songs",songSchema)
module.exports=songModel