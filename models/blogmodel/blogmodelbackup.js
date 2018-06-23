const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blbasement')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...' + err))

const blogSchema = new mongoose.Schema({
    email: String,
    user: String,
    post: String,
    date: {
        type: date,
        default: Date.now
    },
    tags: [string],
});

const Blog = mongoose.model('Blog', blogSchema);
const blog = new Blog({
    email: 'roger@dopesoundfoo.com',
    user: 'dop3sound5',
    post: 'This shit is so dope foo',
    tags: ['music, dabomb, #instagood,that good good']
})
const result = await blog.save();
console.log(result);

createBlog();

// var BlogSchema = new mongoose.Schema({
// number: {
//     type: Number
// },
// date: {
//     type: Date
// },
// link: {
//     type: String
// },
// title: {
//     type: String
// },
// description: {
//     type: String
// }
// })

// var Blog = mongoose.model('Blog', BlogSchema)

// module.exports = Blog