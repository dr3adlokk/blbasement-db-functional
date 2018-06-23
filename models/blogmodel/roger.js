var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BlogSchema = new Schema({
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

var Blog = mongoose.model('Blog', BlogSchema)

var blogOne = new Blog({
    nunber: 1,
    date: "9-10-2013",
    link: "https://www.youtube.com/embed/MiP21jrUyAc",
    title: "Felled Trees in Studio",
    description: "The indie supergroup feating members of Samian, Knapsack, Thrice, and No Motiv recorded an entire album covering Dinosaur Jr's, 'Where You Been', at Bright Lights. Here is the first of 3 promo videos talking about the making of, 'Where We Been'."
})

module.exports = Blog