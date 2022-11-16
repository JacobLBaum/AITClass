const p = new Promise(function(resolve, reject) {
    resolve(1)
    console.log('after1')
})


const p2 = p.then(function(val) {
    console.log(val)
    return new Promise(function(resolve, reject) {
        resolve(2)      //resolve is basically return statement for promises
    })
})

p2.then(console.log)



//example of bad version of fetch that still returns a promise

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