document.addEventListener('DOMContentLoaded', main);

function main() {

    const sqSize = document.querySelector('#squareSize')
    const sqColor = document.querySelector('#squareColor')

    document.body.addEventListener('click', function(evt) {
        let x = evt.x
        let y = evt.y

        const box = document.createElement('div')
        box.style.color = sqColor.value
        box.style.width = sqSize.value + 'px'
        box.style.height = sqSize.value + 'px'
        box.style.position = 'absolute'
        box.style.display = 'block'
        box.style.top = y + 'px'
        box.style.left = x + 'px'

        document.body.appendChild(box)
    })

    /*
    const playBtn = document.querySelector('.playBtn');
    const form = document.querySelector('.start');
    const startVals = document.querySelector('#startValues');
    let cardVals = [];
    playBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        form.classList.remove('start');
        form.classList.toggle("invisible");
        if (startVals.value) {
            cardVals = startVals.value.split(',');
            console.log('cardVals present');
        }
        play(cardVals);
    });
*/
}



function play(cardVals) {
    const gameSpace = document.querySelector('.game');
    setup(gameSpace, cardVals);
}

function getHandVal(hand) {
    let value = 0;
    let numAces = 0;

    hand.forEach(function(card) {
        if (!isNaN(card.value)) {
            value += parseInt(card.value);
        }
        else if (card.value !== "A") {
            value += 10;
        }
        else {numAces++;}
    });

    for(let i=0; i<numAces; i++) {
        if (value < 11) {value += 11;}
        else {value += 1;}
    }

    return value;
}

function win(gameSpace) {
    const winBox = gameSpace.appendChild(document.createElement('div'));
    winBox.classList.add('winBox');
    winBox.textContent = 'You win!';
    const hitBtn = document.querySelector('#hitBtn');
    hitBtn.remove();
    const standBtn = document.querySelector('#standBtn');
    standBtn.remove();
    const resetBtn = winBox.appendChild(document.createElement('button'));
    resetBtn.textContent = 'Reset';
    resetBtn.classList.add('reset')
    resetBtn.addEventListener('click', function() {
        dealerHand = [];
        playerHand = [];
        const playerSection = document.querySelector('.playerSection');
        playerSection.remove();
        const dealerSection = document.querySelector('.dealerSection');
        dealerSection.remove();
        winBox.remove();
        play([]);
    });
}

function lose(gameSpace) {
    const loseBox = gameSpace.appendChild(document.createElement('div'));
    loseBox.classList.add('loseBox');
    loseBox.textContent = 'You Lose!';
    const hitBtn = document.querySelector('#hitBtn');
    hitBtn.remove();
    const standBtn = document.querySelector('#standBtn');
    standBtn.remove();
    const resetBtn = loseBox.appendChild(document.createElement('button'));
    resetBtn.textContent = 'Reset';
    resetBtn.classList.add('reset')
    resetBtn.addEventListener('click', function() {
        dealerHand = [];
        playerHand = [];
        const playerSection = document.querySelector('.playerSection');
        playerSection.remove();
        const dealerSection = document.querySelector('.dealerSection');
        dealerSection.remove();
        loseBox.remove();
        play([]);
    });
}

function tie(gameSpace) {
    const tieBox = gameSpace.appendChild(document.createElement('div'));
    tieBox.classList.add('tieBox');
    tieBox.textContent = "It's a tie!";
    const hitBtn = document.querySelector('#hitBtn');
    hitBtn.remove();
    const standBtn = document.querySelector('#standBtn');
    standBtn.remove();
    const resetBtn = tieBox.appendChild(document.createElement('button'));
    resetBtn.textContent = 'Reset';
    resetBtn.classList.add('reset')
    resetBtn.addEventListener('click', function() {
        dealerHand = [];
        playerHand = [];
        const playerSection = document.querySelector('.playerSection');
        playerSection.remove();
        const dealerSection = document.querySelector('.dealerSection');
        dealerSection.remove();
        tieBox.remove();
        play([]);
    });
}



class Card {
    constructor(value, suit='diamond') {
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor(topCards = []) {
        this.topCards = topCards.reverse();
        this.cards = [];
        for (let i=0; i<4; i++) {
            for (let c=2; c<=10; c++) {
                this.cards.push(new Card(c, 'diamonds'));
            }
            this.cards.push(new Card('J'));
            this.cards.push(new Card('Q'));
            this.cards.push(new Card('K'));
            this.cards.push(new Card('A'));
        }
        this.topCards.forEach(target => {
            const i = this.cards.find(card => card.value === target.value);
            this.cards.splice(i, 1);
        });
    }

    draw() {
        if (this.topCards.length !== 0) {
            console.log('drawing top cards');
            return new Card(this.topCards.pop());
        }
        else {
            const num = Math.floor(Math.random()*(this.cards.length));
            const crd = this.cards[num];
            this.cards.splice(num, 1);
            return crd;
        }
    }
}

function dealerHit(dealerSec, deck, dealerDisplay) {
    const card = dealerSec.appendChild(document.createElement('div'));
    card.classList.add('card');
    const hitCard = deck.draw();
    card.textContent = hitCard.value + '    ♢';
    dealerHand.push(hitCard);
    dealerDisplay.textContent = getHandVal(dealerHand);
}

function setup(gameSpace, cardVals) {
    const deck = new Deck(cardVals);
    const dealerSec = gameSpace.appendChild(document.createElement('div'));
    dealerSec.classList.add('dealerSection');
    const playerSec = gameSpace.appendChild(document.createElement('div'));
    playerSec.classList.add('playerSection');

    //add displays
    const playerDisplay = playerSec.appendChild(document.createElement('div'));
    playerDisplay.classList.add('score');

    const dealerDisplay = dealerSec.appendChild(document.createElement('div'));
    dealerDisplay.classList.add('score');
    //add buttons
    const hitBtn = playerSec.appendChild(document.createElement('button'));
    hitBtn.textContent = 'Hit';
    hitBtn.setAttribute('id', 'hitBtn');
    hitBtn.addEventListener('click', function hit() {
        const card = playerSec.appendChild(document.createElement('div'));
        card.classList.add('card');
        const hitCard = deck.draw();
        card.textContent = hitCard.value + '    ♢';
        playerHand.push(hitCard);
        playerDisplay.textContent = getHandVal(playerHand);
        if (playerDisplay.textContent > 21) {
            playerDisplay.textContent += " You bust!";
            lose(gameSpace);
        }
    });

    const standBtn = playerSec.appendChild(document.createElement('button'));
    standBtn.textContent = 'Stand';
    standBtn.classList.add('stand');
    standBtn.setAttribute('id', 'standBtn');
    standBtn.addEventListener('click', function stand() {
        const card2 = document.querySelector('.turned');
        card2.classList.remove('turned');
        card2.classList.add('card');
        dealerDisplay.textContent = getHandVal(dealerHand);
        while (getHandVal(dealerHand) < 15 || getHandVal(dealerHand) < getHandVal(playerHand)) {
            dealerHit(dealerSec, deck, dealerDisplay);
        }
        if (dealerDisplay.textContent > 21) {
            dealerDisplay.textContent += " Dealer busts";
            win(gameSpace);
        }
        else if (getHandVal(dealerHand) < getHandVal(playerHand)) {
            win(gameSpace);
        }
        else if (getHandVal(dealerHand) > getHandVal(playerHand)){
            lose(gameSpace);
        }
        else {
            tie(gameSpace);
        }
    });

    //add cards
    const card1 = playerSec.appendChild(document.createElement('div'));
    card1.classList.add('card');
    const card1Obj = deck.draw();
    card1.textContent = card1Obj.value + '    ♢';
    playerHand.push(card1Obj);

    const card2 = dealerSec.appendChild(document.createElement('div'));
    card2.classList.add('turned');
    const card2Obj = deck.draw();
    card2.textContent = card2Obj.value + '    ♢';
    dealerHand.push(card2Obj);

    const card3 = playerSec.appendChild(document.createElement('div'));
    card3.classList.add('card');
    const card3Obj = deck.draw();
    card3.textContent = card3Obj.value + '    ♢';
    playerHand.push(card3Obj);

    const card4 = dealerSec.appendChild(document.createElement('div'));
    card4.classList.add('card');
    const card4Obj = deck.draw();
    card4.textContent = card4Obj.value + '    ♢';
    dealerHand.push(card4Obj);

    playerDisplay.textContent = getHandVal(playerHand);
    dealerDisplay.textContent = '???';
}


