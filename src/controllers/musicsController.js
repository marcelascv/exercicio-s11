const musics = require("../models/musics.json");
const fs = require("fs");

const getAllMusics = (req, res) => {
    console.log(req.url);
    res.status(200).send(musics);
}

const createMusic = (req, res) => {
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musics.push({ id, title, duration, launchYear, favorited, artists })
    fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicFound = musics.find(music => music.id == id)      
            res.status(200).send(musicFound)
        }
    })
}

const getByMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = musics.find((music) => music.id == musicId);
    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        res.status(404).send({ message: "Música não encontrada"})
    }
}

const updateMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicToUpdate = req.body 

        const musicFound = musics.find(music => music.id == musicId)      
        const musicIndex = musics.indexOf(musicFound)

        if (musicIndex >= 0) {
            musics.splice(musicIndex, 1, musicToUpdate) 
        } else {
            res.status(404).send({ message: "Música não encontrada para ser atualizada" })
        }

        fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo de músicas atualizado com sucesso!")
                const musicUpdated = musics.find(music => music.id == musicId)
                res.status(200).send(musicUpdated)
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateFavoritedStatus = (req, res) => {
    try {
        const musicId = req.params.id
        const favorited = req.body.favorited

        const musicToUpdate = musics.find(music => music.id == musicId)
        const musicIndex = musics.indexOf(musicToUpdate)

        if (musicIndex >= 0) { 
            musicToUpdate.favorited = favorited
            musics.splice(musicIndex, 1, musicToUpdate)
        } else {
            res.status(404).send({ message: "Filme não encontrado para informar se foi assistido ou não" })
        }

        fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {  
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const musicUpdated = musics.find((music) => music.id == musicId)
                res.status(200).send(musicUpdated) 
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicFound = musics.find(music => music.id == musicId)
        const musicIndex = musics.indexOf(musicFound)

        if (musicIndex >= 0) { 
            musics.splice(musicIndex, 1)
        } else {
            res.status(404).send({ message: "Música não encontrada para ser deletada" })
        }

        fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Música deletada com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a música" })
    }
}

module.exports = {
    deleteMusic,
    updateFavoritedStatus,
    updateMusic,
    getByMusic,
    createMusic,
    getAllMusics,
}