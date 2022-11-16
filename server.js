const net = require('net');
const path = require('path/posix');
const routes = {
    '/artemis': function(req, res) {
        res.send('<h1>Artemis Fowl is the beeestt!</h1>')
    },
    '/meditation': function(req, res) {
        res.setHeader('Content-Type', 'text/html')
        res.send('<h1>OHhhhhhmmmmmm</h1>')
    }
}

class Request {
    constructor(s) {
        const [method, path, ...everythingElse] = (s + '').split(' ')
        console.log(s+'const')
        this.path = path;
        this.method = method;
    }
}

const codeDescription = {
    200: 'OK',
    404: 'Not Found'
}

class Response {
    constructor(sock, statusCode = 200) {
        this.sock = sock
        this.statusCode = statusCode
        this.headers = {}
    }

    setHeader(name, val) {
        this.headers[name] = val
    }

    send(body) {
        let s = 'HTTP/1.1 ${this.statusCode} ${codeDescription[this.statusCode]}\r\n'
        const arrOfHeaderParts = Object.entries(this.headers)
        const headersArr = arrOfHeaderParts.map(function(parts) {
            const [name, val] = parts
            return '${name}: ${val}'
        })
        const headers = headersArr.join('\r\n')
        s += headers
        s += '\r\n\r\n'
        s += body
        this.sock.write(s)
        this.sock.end()
    }
}

/*
const server = net.createServer(function(sock) {
    console.log('connected', sock.remoteAddress)
    sock.on('data', function(data) {    //calls a function based on some event, first arg is event
        console.log('received ', data);
        const req = new Request(data);
        //console.log(req.path, req.method)
        sock.write('HTTP/1.1 200 OK\r\n\r\n' + '<h1>This is a header</h1>' );
    })
});
*/

function handleConnect(sock) {
    console.log('connected')
    sock.on('data', data => handleData(sock, data))
}

function handleData(sock, data) {
    const req = new Request(data + '')
    const res = new Response(sock)
    //console.log('Path:', req.path, ', Method:', req.method)
    
    if (routes.hasOwnProperty(req.path)) {
        routes[req.path](req, res)
    }
    else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text\plain')
        res.send('No Page found')
    }
    //sock.write('HTTP/1.1 200 OK\r\n\r\n' + '<h1>This is a landing page</h1>')
    sock.end()
}

const server = net.createServer(handleConnect)

server.listen(3000);

