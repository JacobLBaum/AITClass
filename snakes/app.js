const express = require('express')
const app = express()
app.set('view engine', 'hbs')

const snList = ['Hissy Elliot', 'Monty Python']

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('home', {name: req.name})
})
/*
app.get('/', (req, res) => {
    res.render('home', {snakes: snList})
})

app.post('/', (req, res) => {
    snList.push(req.body.name)
    res.redirect('/')
})
*/
app.listen(3000)