// Theme Select
const gameRoom = document.querySelector('.game-room');
const redBtn = document.getElementById('red');
const greenBtn = document.getElementById('green');
const blueBtn = document.getElementById('blue');

redBtn.addEventListener('click', () => {
  gameRoom.style.backgroundColor = 'red';
})

greenBtn.addEventListener('click', () => {
  gameRoom.style.backgroundColor = 'green';
})

blueBtn.addEventListener('click', () => {
  gameRoom.style.backgroundColor = 'blue';
})

// Guess Game logic
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');

const counter = document.querySelector('.counter');

let guessCount = 1;
counter.textContent = guessCount;
let resetButton;
guessField.focus();


function checkGuess() {
  let userGuess = Number(guessField.value);

  if(userGuess === 1) {
    guesses.textContent = 'previous guesses: ';
  }
  guesses.textContent = userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congrats you won!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if(guessCount === 10) {
    lastResult.textContent = 'out of guesses...';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong';
    lastResult.style.backgroundColor = 'red';

    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'last guess was low';
    } else {
      lowOrHi.textContent = 'last guess was high';
    }
  }

  guessCount++;
  counter.textContent = guessCount;
  guessField.value= '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Play another game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');

  for(let i=0; i<resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}