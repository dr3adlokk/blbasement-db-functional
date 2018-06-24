const express = require('express')
const router = express.ROUTER();

var schema = require('../models')

router.get('/',(req,res,next)=> {
    res.sendFile(process.cwd()+ '/public/index.html')
});