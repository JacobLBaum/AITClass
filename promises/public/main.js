document.addEventListener('DOMContentLoaded', main);

async function main() {
    const url = 'http://localhost:3000/api/messages'

    //const responseText = await get(url) //or could use built in javascript fetch
    //const data = JSON.parse(responseText)

    const res = await fetch(url)    //returns promise... promise is resolved with response object... one method on res obj is .json()
    const data = await res.json()

    loadReviews(data)
    /*get(url)
        .then(responseText => JSON.parse(responseText))
        .then(loadMessages)
    */
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', handleClick)


    
}

async function handleClick(evt) {
    evt.preventDefault()
    const msg = document.querySelector('#msg').value
    const name = document.querySelector('#name').value

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({msg, name})
    }
    const url = 'http://localhost:3000/api/messages'
    const result = await fetch(url, config)
    const saved = await result.json()
    addMessage(saved)
}


function addMessage(msg) {
    const div = document.body.appendChild(document.createElement('div'))
    div.textContent = msg.name + ': ' + msg.msg
    div.classList.add('msg')

}

function loadReviews(data) {
    const oldMessages = document.querySelectorAll('.msg')
    if (oldMessages) {oldMessages.forEach(m => m.remove())}

    for(const msg of data) {
        const div = document.body.appendChild(document.createElement('div'))
        div.textContent = msg.name + ': ' + msg.msg
        div.classList.add('msg')
    }

    setTimeout(async function() {
        const url = 'http://localhost:3000/api/messages'
        const res = await fetch(url)    //returns promise... promise is resolved with response object... one method on res obj is .json()
        const data = await res.json()
    }, 1000)
    
}

function get(url) { //dont need get when we have fetch
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.addEventListener('load', function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText)
            }
            else {
                reject('got bad status code ' + xhr.status)
            }
        })

        xhr.addEventListener('error', function() {
            reject('could not connect')
        })
        xhr.send()

    })
}
