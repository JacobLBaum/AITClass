require('./db.js')

const express = require('express')
const app = express();
const path = require('path')
const Message = mongoose.model('Message')

app.use(express.json()) //json parsing middleware
app.use(express.static(path.join(__dirname), 'public'))

app.get('/api/messages', async (req, res) => {      //this is our own API
    const messages = await MessageSchema.find({}).exec()
    const data = messages.map(m => {
        return {msg: m.msg, name: m.name}
    })
    res.json(data)
})

app.post('/api/messages', async (req, res) => {
    const {msg, name} = req.body;
    const m = new Message({msg, name})
    const saved = await m.save()
    res.json({msg: saved.meg, name: saved.name})
})

app.listen(3000)
