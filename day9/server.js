require("dotenv").config();
const app=require("./src/app")
const ConnectToDB=require("./src/config/database")



ConnectToDB()
app.listen(3000,()=>{
    console.log("running 3000 port successfully")
})