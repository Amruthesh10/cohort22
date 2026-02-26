const mongoose=require('mongoose')

async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    console.log("db connected")
}

module.exports=connectDB