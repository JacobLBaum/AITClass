const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

io.on('connect', function(sock) {
    console.log(sock.id, 'has connected')
    sock.emit('welcome', {msg: 'hi'})

    sock.on('chat', function(data) {
        console.log(data)
        io.emit('chat', data)
    })

    sock.on('mouse', function(data) {
        data.id = sock.id
        sock.broadcast.emit('mouse', data)
    })
})

server.listen(3000)