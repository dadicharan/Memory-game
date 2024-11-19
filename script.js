// Get all the card elements
const cards = document.querySelectorAll('.card');

// Array to store the cards' values
const cardValues = ['!', '@', '#', '$', '%', '^', '&', '*', '!', '@', '#', '$', '%', '^', '&', '*' ];

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to initialize the game
function startGame() {
    shuffle(cardValues);
    cards.forEach((card, index) => {
        card.textContent = ''; // Clear text content
        card.classList.remove('flipped', 'matched'); // Remove any flipped or matched styles
        card.addEventListener('click', flipCard);
        card.dataset.value = cardValues[index]; // Set card data value
    });
}

// Handle card flip
let flippedCards = [];
let matchedPairs = 0;

function flipCard(e) {
    const clickedCard = e.target;

    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.textContent = clickedCard.dataset.value; // Show card value
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if the flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === 8) {
            alert('You won! All pairs matched!');
        }

        flippedCards = []; // Reset flipped cards
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Start the game on page load
startGame();