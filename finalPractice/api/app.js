const express = require('express')
const app = express()
app.set('view engine', 'hbs');
const path = require('path')
const cors = require('cors')
app.use(express.static(path.join(__dirname, 'public'))) //register static file serving middleware
const points = [{x:1, y:2}, {x:3, y:1}, {x:4, y:4}]
app.use(express.urlencoded({ extended: false}))

app.use(cors())

//populate req.body with http req body

app.get('/', (req, res) => {
    res.json(points)
})

app.listen(3000)