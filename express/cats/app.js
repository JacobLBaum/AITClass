const express = require('express')
const app = express()
app.set('view engine', 'hbs');
const path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) //register static file serving middleware

app.use(express.urlencoded({ extended: false}))

//populate req.body with http req body
const cats = [ 
    {name: 'Kitty Purry', lives: 9},
    {name: 'Bill Furry', lives: 4},
    {name: 'Paw Newman', lives: 2}
]
app.get('/', (req, res) => {
    let data = cats
    if (Object.prototype.hasOwnProperty.call(req.query, 'minLives')) {
        const minLives = parseInt(req.query.minLives)
        data = cats.filter(cat => cat.lives >= minLives)
    }
    res.render('index', {cats: data})
})

app.post('/', (req, res) => {
    const lives = parseInt(req.body.lives)
    if (lives > 0) {
        cats.push({name: req.body.catName, lives: lives})
    }
    else {
        res.render('index', {error: true})//render an error
    }
    //res.render('index', {cats})
    res.redirect('/')
})

app.get('/foo', (req, res) => {
    console.log(req.query)
})


app.listen(3000)