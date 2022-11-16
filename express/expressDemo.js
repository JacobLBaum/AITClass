

const express = require('express');
const app = express();
const path = require('path')


app.use((req, res, next) => {
    res.set('X-Server-Name', 'awesome server')
    next() //causes other middleware functions to be called
})


app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(1)
    next() //causes other middleware functions to be called
})
app.use((req, res, next) => {
    console.log(req.path)
    next()
})

app.get('/', (req, res) => {    //gets base path
    res.send('<h1>Hello</h1>')
});
app.get('/data', (req, res) => {    // gets data path
    console.log(req.path)
    res.sendFile(path.join(__dirname, 'data.json'))
});

app.listen(3000)

