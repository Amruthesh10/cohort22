const express=require('express')
const authController=require("../controller/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")
const authrouter=express.Router()




authrouter.post("/register",authController.registerUser)
authrouter.post('/login',authController.loginUser)
authrouter.get('/logout',authMiddleware.authUser,authController.logoutUser)
authrouter.get('/getme',authMiddleware.authUser,authController.getMe)
module.exports=authrouter