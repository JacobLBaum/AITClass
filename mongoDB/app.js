//require('./db.js')


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: false}))

const PersonSchema = new mongoose.Schema({
    first: String,
    last: {type: String, required: true},   
    height: Number
})
mongoose.model('Person', PersonSchema)      
const Person = mongoose.model('Person')


app.get('/people', (req, res) => {
    Person.find({}, (err, people) => {
        const data = people.map(p => {
            first: p.first
        })
        res.render('people', {people: data})
    })
})

mongoose.connect('mongodb://localhost/ait-class11')
app.listen(3000)