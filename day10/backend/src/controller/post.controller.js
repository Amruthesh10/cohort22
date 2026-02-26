const postModel = require("../model/post.model");
const userModel = require("../model/user.model");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../model/likes.model");
const imagekit = new ImageKit({
 
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  
});



async function createpostController(req, res) {
    
    const base64File = req.file.buffer.toString("base64");

    const result = await imagekit.files.upload({
      file: `data:${req.file.mimetype};base64,${base64File}`,
      fileName: req.file.originalname,
      folder:"cohort-instagram"
    });
    
    const post =await postModel.create({
        caption:req.body.caption,
        imgurl:result.url,
        user:req.user.id
    })
    return res.status(201).json({
        message:"Post created successfully",
        post
    })
}

async function getpostController(req,res){
   
    const userId=req.user.id
    const posts=await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}
async function getPostDetailController(req,res){
   
    const userId=req.user.id
    const postId=req.params.postId
    const posts=await postModel.findById(postId)
    if(!posts){
        return res.status(404).json({
            message:"post not found"
        })
    }
const isuserValid=posts.user.toString()===userId
if(!isuserValid){
    return res.status(403).json({
        message:"Forbidden Content"
    })
}
    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
}

async function likePostController(req,res){
    const username=req.user.username
    const postId=req.params.postId
    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const like=await likeModel.create({
        post:postId,
        user:req.user.username
    })
    return res.status(200).json({
        message:"post liked successfully",
        like
    })
}
async function unlikePostController(req,res){
    const postId=req.params.postId
    const username=req.user.username
    const isLiked=await likeModel.findOne({
        post:postId,
        user:username
    })
    if(!isLiked){
        return res.status(400).json({
            message:"post didn't liked"
        })
    }
    await likeModel.findOneAndDelete({_id:isLiked._id})
    res.status(200).json({
        message:"post unliked successfully"
    })
}

async function getFeedController(req, res) {

    const user = req.user

    const posts = await Promise.all((await postModel.find({}).populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}


module.exports = { createpostController,getpostController,getPostDetailController,likePostController,getFeedController,unlikePostController };

