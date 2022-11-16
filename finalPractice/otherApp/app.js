const express = require('express')
const app = express()
app.set('view engine', 'hbs');
const path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) //register static file serving middleware

app.use(express.urlencoded({ extended: false}))

//populate req.body with http req body

app.get('/', (req, res) => {
    
})

app.listen(3000)