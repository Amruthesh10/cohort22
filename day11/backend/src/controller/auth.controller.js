const blackModel = require("../models/blacklistToken.model")
const userModel=require('../models/user.model')
const jwt=require("jsonwebtoken")
const bycrpt=require("bcryptjs")
const redis=require("../config/cache")
async function registerUser(req,res){
   const {username,email,password}=req.body
   const isuserAlreadyExist=await userModel.findOne({
    $or:[
        {
            email
        },
        {
            username
        }
    ]
   })
   if(isuserAlreadyExist){
   return res.status(400).json({
            message: "User with the same email or username already exists"
        })
   }
   const hash=await bycrpt.hash(password,10)
   const user=await userModel.create({
    username,
    email,
    password:hash
   })

   const token=jwt.sign({
    id:user._id,
    username:user.username
   },process.env.JWT_SECRET,{
    expiresIn:"3d"
   })
  res.cookie("token",token)
     return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
async function loginUser(req,res){
   
     const { email, password, username } = req.body;
    const user=await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    const ispasswordValid=await bycrpt.compare(password, user.password)
    if(!ispasswordValid){
          return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
    res.cookie("token",token)

     return res.status(201).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({
                message: "No token found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

       await redis.set(token,Date.now().toString(),"Ex",60*60)

        res.clearCookie("token")

        return res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}
async function getMe(req,res){
    const user=await userModel.findById(req.user.id)

     return res.status(200).json({
        message:"user fetched successfully",
        user
     })
}


module.exports={registerUser,loginUser,logoutUser,getMe}