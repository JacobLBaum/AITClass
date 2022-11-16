document.addEventListener("DOMContentLoaded", main)

function main() {
    const sock = io()
    const btn1 = document.querySelector('.player1Btn')
    btn1.addEventListener('click', handleClick1)
    const btn2 = document.querySelector('.player2Btn')
    btn2.addEventListener('click', handleClick2)

    sock.on('move1', function(data) {
        console.log('In move1')
        const player1 = document.querySelector('.player1')
        console.log(player1)
        if (data.pos >= 800) {
            const div = document.body.appendChild(document.createElement('div'))
            div.textContent = 'Tears of joy wins'
            div.classList.add('win')
        }
        player1.style.left = data.pos + 'px'
        /*
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
        */
    })

    sock.on('move2', function(data) {
        console.log('In move2')
        const player2 = document.querySelector('.player2')
        console.log(player2)
        if (data.pos >= 800) {
            const div = document.body.appendChild(document.createElement('div'))
            div.textContent = 'Screaming face wins'
            div.classList.add('win')
        }
        player2.style.left = data.pos + 'px'
    })

    function handleClick1() {
        console.log('clicked1')
        sock.emit('move1', {})
    }
    function handleClick2() {
        console.log('clicked2')
        sock.emit('move2', {})
    }
    /*
    sock.on('welcome', function(data) {
        console.log(data)
    })
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', handleClick)

    

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
    */
}