const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blbasement')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could Not Connect to MongoDB...', + err))

const episodeSchema = new mongoose.Schema({
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


const Episode = mongoose.model('Episode', episodeSchema)
const episode = new Episode({
     number: 1,
         band: "Peace'd Out",
         title: "Peace'd Out debuts in live studio session at Bright Lights",
         link: "https://www.youtube.com/embed/EaTE4DeomGE",
         description: "Fresh out of recording their debut EP, Peace'd Out came by Bright Lights to debut the band with a live performance."
})

// const result = await episode.save();
// console.log(result)

episode.save()
async function getEpisode() {
    // const result = await episode.save();
    const episode = await Episode.find()
    console.log(episode)
}
getEpisode();

// episode.save();
// console.log(episode)

