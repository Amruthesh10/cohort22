const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email is required"]
    },
    password:{
         type:String,
        required:[true,"password is required"],
        select:false
    },
     bio: String,
    
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/zqjioi8vi/cohort-instagram/default-avatar-profile-icon-symbol-for-website-vector-46547084__sUco4Zwm.webp?updatedAt=1771045237423"
    }
})

const userModel=mongoose.model("user",UserSchema)

module.exports=userModel