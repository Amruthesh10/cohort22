const express=require("express")
const UserModel=require('../model/user.model')
const jwt=require('jsonwebtoken')
const crypto = require("crypto");

const authRouter=express.Router()

authRouter.post("/register",async(req,res)=>{
    const{name,email,password}=req.body
    const isUserAlreadyexist=await UserModel.findOne({email})
    if(isUserAlreadyexist){
       return res.status(400).json({
            message:"user already exists"
        })
    }
  const hash=crypto.createHash("md5").update(password).digest("hex")
   const user= await UserModel.create({
        name,email,password:hash
    })
    const token=jwt.sign({
        id:user._id,
        email:user.email

    },
    process.env.JWT_SECRET
)

res.cookie("jwt_token",token)
    res.status(201).json({
        message:"user registered sucessfully",
        user,
        token
    })
})

authRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    const user=await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user cannot exist with this email"
        })
    }
    const ispassword=user.password===crypto.createHash("md5").update(password).digest("hex")
    if(!ispassword){
        return res.status(401).json({
            message:"user is invalid"
        })
    }
    const token=jwt.sign({
        id:user.id
    },process.env.JWT_SECRET
)
res.cookie("jsontoken",token)
res.status(201).json({
    message:"user loginned successfully",
    token
})
})
module.exports=authRouter