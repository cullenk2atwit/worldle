// List of possible solution words
const words = ["CRANE", "APPLE", "BRAVE", "GRAPE", "PLANT", "SCALE", "STONE"];
// Randomly select a word from the list as the solution
const solution = words[Math.floor(Math.random() * words.length)];

let currentRow = 0;

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
    const currentInputs = Array.from(document.querySelectorAll(`[data-row="${currentRow}"]`));
    const guess = currentInputs.map(input => input.value.toUpperCase()).join('');

    if (guess.length !== 5 || !/^[A-Z]{5}$/.test(guess)) {
        document.getElementById('message').textContent = 'Please enter a valid 5-letter word.';
        return;
    }

    if (guess === solution) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
        disableAllInputs();
        return;
    }

    currentRow++;
    if (currentRow === 6) {
        document.getElementById('message').textContent = `Game over! The word was ${solution}.`;
        disableAllInputs();
    } else {
        currentInputs.forEach(input => input.disabled = true);
        document.querySelector(`[data-row="${currentRow}"][data-col="0"]`).focus();
        document.getElementById('message').textContent = '';
    }
}

// Disable all inputs
function disableAllInputs() {
    document.querySelectorAll('input').forEach(input => input.disabled = true);
}

// Add event listener for the "Submit" button
document.getElementById('submit').addEventListener('click', handleSubmit);
