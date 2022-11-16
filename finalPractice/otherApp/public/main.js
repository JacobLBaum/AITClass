document.addEventListener('DOMContentLoaded', main)



function main() {
    const res = await fetch('https://localhost:3001/api/foo')
    const data = await res.json
    console.log('fetch:', data)
}
