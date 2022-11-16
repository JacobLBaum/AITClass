const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
let pos1 = 0;
let pos2 = 0;

app.use(express.static(path.join(__dirname, 'public')))



io.on('connect', function(sock) {
    console.log(sock.id, 'has connected')
    //sock.emit('welcome', {msg: 'hi'})

    sock.on('move1', function() {
        pos1 += 50
        console.log(pos1)
        io.emit('move1', {pos: pos1}) //for all connected clients
    })

    sock.on('move2', function() {
        pos2 += 50
        console.log(pos2)
        io.emit('move2', {pos: pos2}) //for all connected clients
    })

    /*
    sock.on('mouse', function(data) {
        data.id = sock.id
        sock.broadcast.emit('mouse', data)
    })
    */
})


server.listen(3000)