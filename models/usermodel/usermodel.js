const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blbasement')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could Not Connect to MongoDB... ' + err))

const userSchema = new mongoose.Schema({
    email: String,
    userName: String, 
    post: String,
    password: String,
    // date: { type: date, default: Date.now},
    isAdmin: Boolean
})

const User = mongoose.model('User', userSchema)
const user = new User ({
    email: 'dude@dude.com',
    user: 'dude',
    post: 'dhoaiwhdioqw',
    password: 'dude6023',
    isAdmin: true 

})
user.save();
console.log(user)