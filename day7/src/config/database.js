const mongoose=require('mongoose');


function connectToDB(){
    mongoose.connect("mongodb+srv://amruthesh:6DBxlAn6Tp2jY6GL@cluster0.dnrcfsh.mongodb.net/day")
    .then(()=>{
        console.log('Connected to DB');
    })
}

module.exports=connectToDB;