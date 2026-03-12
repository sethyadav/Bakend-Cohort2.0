const songModel = require("../models/song.model")
const storageService = require("../services/storage.services")
const id3 = require ("node-id3")


async function uploadSong(req,res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body
    const tags = id3.read(songBuffer)


    const [ songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            foldername: "/cohort-2/moodify/song"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])
    
    // const songFile = await storageService.uploadFile({
    //     buffer: songBuffer,
    //     filename: tags.title + ".mp3",
    //     folder:"/cohort-2/moodify/songs"
    // })

    // const posterFile = await storageService.uploadFile({
    //     buffer: tags.image.imageBuffer,
    //     filename: tags.title + ".jpeg",
    //     folder:"/cohort-2/moodify/posters"
    // })

    const song =  await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })
}

async function getSong(req, res) {

    const { mood } = req.query
    const song = await songModel.findOne({
        mood
    })

    res.status(200).json({
        message: "song fetched successfully.",
        song,
    })
}

module.exports = { uploadSong, getSong}