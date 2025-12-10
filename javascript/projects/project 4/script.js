
let randomNumber = Math.floor(Math.random() * 100) + 1;

const submitButton = document.querySelector('#subt');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remainingDisplay = document.querySelector('.lastresult');
const output = document.querySelector('.lorh');
const resultParas = document.querySelector('.resultparas');

let previousGuesses = [];
let attempts = 1;
let gameActive = true;

const newGameButton = document.createElement('p');


if (gameActive) {
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const guess = parseInt(userInput.value.trim());
        validateGuess(guess);
    });
}
    // make tour start available if button exists
    const tourStartBtn = document.getElementById('startTour');
    if (tourStartBtn) {
        tourStartBtn.addEventListener('click', function(e){ e.preventDefault(); if (window.startTour) window.startTour(); });
    }

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert(`Invalid input! Please enter a number between 1 and 100.`);
        return;
    }

    previousGuesses.push(guess);
    displayGuess(guess);

    if (guess === randomNumber) {
        displayMessage('Congratulations! Your guess is correct.');
        // give 3D scene a success pulse when available
        if (window.sceneAPI && typeof window.sceneAPI.pulseSuccess === 'function') window.sceneAPI.pulseSuccess();
        // confetti burst (if loaded)
        if (typeof confetti === 'function') {
            confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
        }
        endGame();
    } else {
        const hint = guess > randomNumber ? 'Too high! Try a lower number.' : 'Too low! Try a higher number.';
        if (attempts >= 10) {
            displayMessage(`Game Over! ${hint}<br>The random number was ${randomNumber}.`);
            if (window.sceneAPI && typeof window.sceneAPI.pulseFail === 'function') window.sceneAPI.pulseFail();
            endGame();
        } else {
            displayMessage(`${hint}<br>Attempts remaining: ${10 - attempts}`);
            attempts++;
            // update 3D scene with attempts remaining
            if (window.sceneAPI && typeof window.sceneAPI.setAttempts === 'function') window.sceneAPI.setAttempts(10 - (attempts-1));
        }
    }
}

function displayGuess(guess) {
    guessSlot.innerHTML += `${guess}; `;
}


function displayMessage(message) {
    output.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
    userInput.disabled = true;
    submitButton.disabled = true;
    newGameButton.classList.add('button');
    newGameButton.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    resultParas.appendChild(newGameButton);
    gameActive = false;
    // small pulse on overlay to celebrate or show closure
    const panel = document.querySelector('.game-container');
    if (panel) {
        panel.classList.add('pulse');
        setTimeout(()=> panel.classList.remove('pulse'), 700);
    }
}

newGameButton.addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    attempts = 1;
    guessSlot.innerHTML = '';
    remainingDisplay.innerHTML = '10';
    output.innerHTML = '';
    userInput.disabled = false;
    submitButton.disabled = false;
    gameActive = true;
    resultParas.removeChild(newGameButton);
    if (window.sceneAPI && typeof window.sceneAPI.setAttempts === 'function') window.sceneAPI.setAttempts(10);
});
