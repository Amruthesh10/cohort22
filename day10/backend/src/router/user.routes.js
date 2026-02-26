const express=require("express")
const userRouter=express.Router()
const userController=require("../controller/user.controller")
const identifyUser=require("../middleware/auth.middleware").identifyUser




/*
@routes POST /api/user/follow/:username
@desc follow a user
@acess private
*/
userRouter.post("/follow/:username", identifyUser ,userController.followUserController)

/*
@routes POST /api/user/unfollow/:username
@desc unfollow a user
@acess private
*/
userRouter.post("/unfollow/:username", identifyUser ,userController.unfollowUserController)



module.exports=userRouter