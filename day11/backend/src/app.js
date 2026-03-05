const express=require('express')
const cookieParser = require('cookie-parser')

const app=express()
const cors=require("cors")
const path=require("path")
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static("./public"))
const authrouter=require("./router/auth.router")
const songrouter = require('./router/song.router')

app.use('/api/auth',authrouter)
app.use('/api/song',songrouter)
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
    })
module.exports=app