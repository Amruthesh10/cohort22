const express=require("express")
const upload=require("../middleware/upload.middleware")
const songrouter=express.Router()
const songController=require('../controller/songController')

songrouter.post("/",upload.single('song'),songController.uploadsong)
songrouter.get("/",songController.getsong)

module.exports=songrouter