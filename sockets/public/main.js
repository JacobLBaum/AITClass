document.addEventListener("DOMContentLoaded", main)

function main() {
    sock = io()
    sock.on('welcome', function(data) {
        console.log(data)
    })
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', handleClick)

    function handleClick() {
        const msg = document.querySelector('#msg').value
        const from = document.querySelector('#from').value
        const data = {msg: msg, from: from}

        sock.emit('chat', data)
    }

    sock.on('chat', function(data) {
        const div = document.body.appendChild(document.createElement('div'))
        div.textContent = data.msg + ' ' + data.from
    })

    document.addEventListener('mousemove', function(evt) {
        console.log()
        sock.emit('mouse', {x: evt.x, y: evt.y})
    })

    sock.on('mouse', function(data) {
        let otherMouse = document.querySelector('#' + data.id)
        if(!otherMouse) {
            otherMouse = document.createElement('div')
            otherMouse.classList.add('mouse')
            otherMouse.id = data.id
            otherMouse.textContent = data.id
            document.body.appendChild(otherMouse)
        }
        otherMouse.style.top = data.y + 'px'
        otherMouse.style.left = data.x + 'px'
    })
}