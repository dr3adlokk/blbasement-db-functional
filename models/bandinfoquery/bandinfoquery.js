const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blbasement')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Could Not Connect to MongoDB... ', + err))

const bandInfoSchema = new mongoose.Schema({
    bandName: String,
    trackHighLights: String,
    members: String, 
    shortBio: String,
    tags: [ String ],
    isSigned: Boolean
})

const Band = mongoose.model('Band', bandInfoSchema)

const band = new Band ({
    bandName: 'The Flying Cadillac & The Guiotine Cleaners Go to Ibiza',
    trackHighLights: 'I woke up dead, missing you, just a coutry dude in a big city',
    members: 'Atreyu, Zach Brown, the guy that sings SHE BANG from american idol',
    shortBio: 'Founded in whales, then took a pill in ibiza but then we somehow ended up back in tennesee',
    tags: [ indie, deepHouse, country, hxcBreakdowns ],
    isSigned: false
})

band.save();

async function getBand() {
    const band = await Band.find()
    console.log(band)
}
getBand()
// const result = await band.save();
// console.log(result);

// createBand();