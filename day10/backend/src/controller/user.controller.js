const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")

async function followUserController(req, res) {
  const followusername = req.user.username
  const followeeusername = req.params.username


  // Cannot follow yourself
  if (followusername === followeeusername) {
    return res.status(400).json({
      message: "you cannot follow yourself"
    })
  }

  // Check if followee exists
  const isFolloweeExist = await userModel.findOne({
    username: followeeusername
  })

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "user not found"
    })
  }

  // Check if already following
  const alreadyFollow = await followModel.findOne({
      follower: followusername,
    followee: followeeusername,
    status: "accepted"
  })

  if (alreadyFollow) {
    return res.status(409).json({
      message: `you already follow ${followeeusername}`,
      follow: alreadyFollow
    })
  }

  // Create follow record
  const followRecord = await followModel.create({
      follower: followusername,
      followee: followeeusername,
      status: "pending"
  })

  res.status(201).json({
    message: `you started following ${followeeusername}`,
    follow: followRecord
  })
}

async function unfollowUserController(req,res){
  const followusername=req.user.username
  const followeeusername=req.params.username

  const isUserFollowing=await followModel.findOne({
    follower:followusername,
    followee:followeeusername,
    status:"accepted"
  })
  if(!isUserFollowing){
    return res.status(200).json({
      message:`user not following ${followeeusername}`
    })
  }
  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message:`you unfollowed ${followeeusername}`,

  })
}


module.exports = {
  followUserController,unfollowUserController
}
