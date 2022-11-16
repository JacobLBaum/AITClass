document.addEventListener('DOMContentLoaded', main)

function main() {
    const div = document.getElementById('hello')
    div.addEventListener('click', handleClick)

    const form = document.getElementsByTagName('form')[0]
}

function createButtons() {
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div')
        div.textContent = "howdy"
        div.addEventListener('click', removeDiv)
    }
}

function removeDiv(evt) {
    
    
    this.remove();
}

function handleClick(evt) {
    evt.preventDefault();   //stop default behavior of elements
    evt.stopPropagation();  //events will set off all event handlers of parent elements unless use stop propagation, stops event bubbling

    this.textContent = 'by' //this in event handler is the element causing the event
    const newDiv = document.body.appendChild(document);
    newDiv.textContent = 'hello x:' + evt.x + ' y:' + evt.y;
}