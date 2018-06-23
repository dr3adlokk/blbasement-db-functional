const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blbasement')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could Not Connect to MongoDb... ' + err))

const blogSchema = new mongoose.Schema({
     number: {
             type: Number
         },
         date: {
             type: Date
         },
         link: {
             type: String
         },
         title: {
             type: String
         },
         description: {
             type: String
         }
})

const Blog = mongoose.model('Blog', blogSchema)
const blog = new Blog({
     nunber: 1,
         date: "9-10-2013",
         link: "https://www.youtube.com/embed/MiP21jrUyAc",
         title: "Felled Trees in Studio",
         description: "The indie supergroup feating members of Samian, Knapsack, Thrice, and No Motiv recorded an entire album covering Dinosaur Jr's, 'Where You Been', at Bright Lights. Here is the first of 3 promo videos talking about the making of, 'Where We Been'."
})
// const result = await blog.save();
// console.log(result)
blog.save()
async function getBlog() {
//   const result = await blog.save();
  const blog = await Blog.find()
  console.log(blog)
}

getBlog();

// blog.save();    