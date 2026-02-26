const express=require("express")
const authController=require("../controller/auth.controller")
const authrouter=express.Router()
const identifyUser=require("../middleware/auth.middleware").identifyUser
authrouter.post('/register',authController.registerController)
authrouter.post('/login',authController.loginController)
authrouter.get('/get-me',identifyUser,authController.getMeController)
module.exports=authrouter