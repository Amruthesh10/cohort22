const mongoose=require("mongoose")

const UserScehma=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username is unique required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is unique required"]
    },
    password:{
        type:String,
        required: [ true, "Password is required" ],
        select:false

    }
},{
    timestamps:true
})

const UserModel=mongoose.model("users",UserScehma)
module.exports=UserModel