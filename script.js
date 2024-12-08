// List of possible solution words
const words = ["STONE", "GLORY", "GLOVE", "GLYPH", "GNASH", "GOING", "GOLEM", "GONER", "GOOFY", "GOOSE", "GORGE", "LINEN", "LINER", "LINGO", "LITHE", "LIVER", "LOCAL", "LOCUS", "LOFTY", "LOGIC", "LOOPY", "LOSER","APPLE", "BRAVE", "CANDY", "DAISY", "EAGLE", "FANCY", "GLOBE", "HEART", "IVORY", "JOKER", "KARMA", "LEMON", "MELON", "NOBLE", "OCEAN", "PEARL", "QUEEN", "ROBIN", "STORM", "TIGER"];
// Randomly select a word from the list as the solution
const solution = words[Math.floor(Math.random() * words.length)];

let currentRow = 0;
let gameOver = false; // Track if the game is over

// Generate the game board
const board = document.getElementById('board');
for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 5; j++) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.type = 'text';
        input.dataset.row = i;
        input.dataset.col = j;
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeydown);
        row.appendChild(input);
    }
    board.appendChild(row);
}

// Handle input movement
function handleInput(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);

    if (input.value.length > 0 && /^[a-zA-Z]$/.test(input.value)) {
        if (col < 4) {
            document.querySelector(`[data-row="${row}"][data-col="${col + 1}"]`).focus();
        }
    } else {
        input.value = '';
    }
}

// Handle backspace and navigation
function handleKeydown(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);

    if (e.key === 'Backspace') {
        if (input.value.length === 0 && col > 0) {
            const prevInput = document.querySelector(`[data-row="${row}"][data-col="${col - 1}"]`);
            prevInput.focus();
            prevInput.value = '';
        }
    } else if (e.key === 'Enter') {
        handleSubmit(); // Call the submit handler on Enter
    }
}

// Handle submission
function handleSubmit() {
    if (gameOver) {
        location.reload(); // Refresh the page to start a new game
        return;
    }

    const currentInputs = Array.from(document.querySelectorAll(`[data-row="${currentRow}"]`));
    const guess = currentInputs.map(input => input.value.toUpperCase()).join('');

    if (guess.length !== 5 || !/^[A-Z]{5}$/.test(guess)) {
        document.getElementById('message').textContent = 'Please enter a valid 5-letter word.';
        return;
    }

    if (guess === solution) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
        disableAllInputs();
        endGame();
        return;
    }

    currentRow++;
    if (currentRow === 6) {
        document.getElementById('message').textContent = `Game over! The word was ${solution}. Click Play again to play again.`;
        disableAllInputs();
        endGame();
    } else {
        currentInputs.forEach(input => input.disabled = true);
        document.querySelector(`[data-row="${currentRow}"][data-col="0"]`).focus();
        document.getElementById('message').textContent = '';
    }
}

// End the game
function endGame() {
    gameOver = true;
    const submitButton = document.getElementById('submit');
    submitButton.textContent = 'Play Again'; // Update button text
}

// Disable all inputs
function disableAllInputs() {
    document.querySelectorAll('input').forEach(input => input.disabled = true);
}

// Add event listener for the "Submit" button
document.getElementById('submit').addEventListener('click', handleSubmit);