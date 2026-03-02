const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const studentModel = require('./models/student.js')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/studentDB")
    .then(()=> console.log("mongoDB connected"))
    .catch(err=> console.log(err))

app.post('/register', (req,res) =>{
    studentModel.create(req.body)
    .then(student=> res.json(student))
    .catch(err=> res.status(500).json(err))
});

app.listen(3001, ()=>{
    console.log("server is running")
});