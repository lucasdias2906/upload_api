const express = require("express")
const morgan = require("morgan")
const mongoose = require('mongoose')

const app = express();

// database setup

mongoose.connect("mongodb+srv://lucas:lucassousa@tranningapi-hbqnj.mongodb.net/upload?retryWrites=true",{
    useNewUrlParser:true
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use(require('./routes'));

app.listen(3000)