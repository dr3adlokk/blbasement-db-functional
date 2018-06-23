var mongoose = require('mongoose')

var Schema = mongoose.Schema

var EpisodeSchema = new Schema({
    number: {
        type: Number
    },
    band: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    description: {
        type: String
    }
})

var Episode = mongoose.model('Episode', EpisodeSchema)

var epOne = new Episode({
    number: 1,
    band: "Peace'd Out",
    title: "Peace'd Out debuts in live studio session at Bright Lights",
    link: "https://www.youtube.com/embed/EaTE4DeomGE",
    description: "Fresh out of recording their debut EP, Peace'd Out came by Bright Lights to debut the band with a live performance."
})

var epTwo = new Episode({
    number: 2,
    band: "Peace'd Out",
    title: "Peace'd Out debuts in live studio session at Bright Lights",
    link: "https://www.youtube.com/embed/sSC4Rw0HHAc",
    description: "Fresh out of recording their debut EP, Peace'd Out came by Bright Lights to debut the band with a live performance."
})

var epThree = new Episode({
    number: 3,
    band: "Felled Trees",
    title: "Felled Trees performs Dinosaur Jr's 'Get Me' at Bright Lights",
    link: "https://www.youtube.com/embed/L41a6gFEoeo",
    description: "The indie supergroup, Felled Trees, featuring Sergie and Sasha Loobkoff, Garrett Klahn, Ed Breckenridge, Steve Choi, and Roger Camero, perform 'Get Me' at Bright Lights."
})

module.exports = Episode