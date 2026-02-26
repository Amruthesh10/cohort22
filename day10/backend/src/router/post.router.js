const express=require("express")
const postrouter=express.Router()
const postContoller=require('../controller/post.controller')
const multer=require("multer")
const upload = multer({ storage:multer.memoryStorage()})
const identifyUser=require("../middleware/auth.middleware").identifyUser




/*
/api/post/
req.body={caption,image}
*/
// upload.single("the name sholud be same in frontend also such as name,mama")
postrouter.post('/',upload.single('image'), identifyUser ,postContoller.createpostController)

//api/post/ [protected route]
postrouter.get("/",postContoller.getpostController)

/*
/api/post/detailed/:postId
/params
return an detail about sepecific post with id also check wheter the post belongs to user who request
*/
postrouter.get("/detail/:postId",postContoller.getPostDetailController)


/*
 @route /api/post/like/:postId
    @desc like a post
    @access protected
*/
postrouter.post('/like/:postId',identifyUser,postContoller.likePostController)
postrouter.post('/unlike/:postId',identifyUser,postContoller.unlikePostController)
/*
@routes /api/post/feed
@desc get the feed of the user
@access private
*/
postrouter.get('/feed',identifyUser,postContoller.getFeedController)
module.exports=postrouter