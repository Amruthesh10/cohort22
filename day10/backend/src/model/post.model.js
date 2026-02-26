const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl:{
        type:String,
        required:[true,"imgurl is required for creating post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"userid is required for an post"]

    }
    
})
const postModel=mongoose.model("post",postSchema)
module.exports=postModel