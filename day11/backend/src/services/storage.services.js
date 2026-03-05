const Imagekit=require("@imagekit/nodejs")

const client = new Imagekit({
    privateKey:process.env.IMAGEKIT_URL
})


async function uploadFile({buffer, filename, folder = ""}){

    const file=client.files.upload({
  file: await Imagekit.toFile(Buffer.from(buffer)),
  fileName: filename,
  folder
    })
 return file
}

module.exports={uploadFile}