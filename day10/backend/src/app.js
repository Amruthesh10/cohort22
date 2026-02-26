const express=require("express")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const app=express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// requires routes
const authrouter=require('../src/router/auth.router')
const postRouter=require('./router/post.router')
const userRouter=require('./router/user.routes')

//using routes
app.use("/api/auth",authrouter)

app.use("/api/post",postRouter)
app.use("/api/user",userRouter)

module.exports=app