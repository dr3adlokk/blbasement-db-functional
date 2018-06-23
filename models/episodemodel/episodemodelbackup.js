const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blbasement')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect to MongoDB... ', +err))

const episodeSchema = new mongoose.Schema({
    title: String,
    length: String,
    band: String,
    date: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    isSigned: Boolean,
    url: String
})

const Episode = mongoose.model('Episode', episodeSchema);
const episode = new Episode({
    title: 'Dope Sound',
    length: '22 minutes',
    band: 'The Flying Cadillac & The Guiotine Cleaners Go to Ibiza',
    tags: [indie, alternative, melodic, deepHouse / country, dopeshit, hxcBreakDowns, scremo, experimental],
    isSigned: false,
    url: 'https://www.youtube.com/cadillacsound'
})

const result = await episode.save();
createEpisode();

// var mongoose = require('mongoose')

// var Schema = mongoose.Schema

// var EpisodeSchema = new Schema({
// number: {
//     type: Number
// },
// title: {
//     type: String
// },
// link: {
//     type: String
// },
// description: {
//     type: String
// }
// })

// var Episode = mongoose.model('Episode', EpisodeSchema)

// module.exports = Episode