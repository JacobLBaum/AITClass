const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public'))); //register static file serving middleware
app.use(express.urlencoded({ extended: false}));

const nameList = ['Gil', 'Jill', 'Bill', 'Phil'];
app.set("view engine", "hbs")
/*
function parseCookies(req, res, next) {
    const cookieHeader = req.get('Cookie')
    const cookies = cookieHeader.split(';')
    req.myCookies = cookies.reduce((obj, s) => {
        const [name, value] = s.split('=')
        obj[name.trim()] = value
        return obj
    }, {})
    next()
}
app.use(parseCookies)


const secretNum = 32
app.get('/', (req, res) => {
    res.render('index', {}) //hbs setup
})

app.post('/', (req, res) => {
    if (parseInt(req.body.number) === secretNum) {
        res.redirect('/correct')
    } else {res.redirect('/wrong')}
})

app.get('/wrong', (req, res) => {
    res.render('wrong', {})
})

app.get('/correct', (req, res) => {
    res.render('correct', {})
})

app.get('/old', (req, res) => {
    res.redirect('/new')
})

app.get('/new', (req, res) => {
    console.log(req.myCookies)
    res.send('ok')
})
*/
app.listen(3000)