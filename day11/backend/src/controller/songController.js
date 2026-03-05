const songModel=require("../models/song.model")
const id3=require("node-id3")
const storageServices=require("../services/storage.services")

async function uploadsong(req,res){
    const songBuffer=req.file.buffer
    const {mood}=req.body
    const tags=id3.read(songBuffer)

const [ songFile, posterFile ] = await Promise.all([
        storageServices.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageServices.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])
    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        imgUrl:posterFile.url,
        mood
    })

    res.status(201).json({
        message:"song created succesfully",
        song
    })
}
async function getsong(req,res){
    const {mood}=req.query
    const song=await songModel.find({
        mood,
    })
    res.status(200).json({
        message:"song fetched successfully.",
        song,
    })
}

module.exports={uploadsong,getsong}