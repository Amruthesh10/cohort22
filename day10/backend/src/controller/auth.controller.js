const userModel=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


async function registerController(req,res){
    const{username,email,password,bio,profileImage}=req.body

    const isUserAlreadyexist=await userModel.findOne({
        $or:[
               {username},{email}
        ] 
    })
    if(isUserAlreadyexist){
        return res.status(409).json({
            message:"User alreadyexist"+(isUserAlreadyexist.email==email?"email already exist":"username already exist")
        })
    }
      const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    const token=jwt.sign(
       {id:user._id,username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"}
)
res.cookie("token",token)
res.status(201).json({
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}
async function loginController(req,res){
    const{username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {
                username:username
            },{
                email:email
            }
        ]
    }).select("+password")
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    const ispassword=await bcrypt.compare(password,user.password)
    if(!ispassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token=jwt.sign(
        {id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"user loggedin successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}
async function getMeController(req,res){
    const userid=req.user.id
    const user=await userModel.findById(userid)
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}
module.exports={
    registerController,loginController,getMeController
}