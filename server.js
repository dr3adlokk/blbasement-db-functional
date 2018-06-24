const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose')


const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


if(process.env.NODE_env == 'production'){
 app.use(express.static("client/build"));
}
else {
//   mongoose.connect('mongodb://localhost/blbasement')
// }
 app.use(express.static("client/public"));
}

// var db = mongoose.connection; 
//mongoose connection errors
// db.once ('error', function(err){
//   console.log('Mongoose Error: ', err); 
// });

// //mongoose connection success
// db.once('open', function(){
//   console.log('Mongoose Connection Successful')
// })

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

var models = require('./models')

var router = require('./controller')

// Send every request to the React app
// Define any API routes before this runs

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/public/index.html"));
// });


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
