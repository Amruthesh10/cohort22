require("dotenv").config()
const app=require("./src/app")
const ConnectToDB=require("./src/config/database")
// const redis=require('./src/config/cache')

// redis.ping()
ConnectToDB()
app.listen(3000,()=>{
    console.log("server is connected")
})