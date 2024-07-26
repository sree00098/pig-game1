'use strict';

// Selecting elements
const reset = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');
const btnHold = document.querySelector('.btn--hold');

// Initialize game state
let score = [0, 0];
let currScor = 0;
let activePlayer = 0;
let playing = true;

// Initialize game UI
function init() {
  score0.textContent = 0;
  score1.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
}

// Switch player function
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScor = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Roll dice event listener
rollDice.addEventListener('click', () => {
  if (playing) {
    const randomRoll = Math.floor(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${randomRoll}.png`;
    if (randomRoll !== 1) {
      currScor += randomRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScor;
    } else {
      switchPlayer();
    }
  }
});

// Hold button event listener
btnHold.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currScor;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Reset button event listener
reset.addEventListener('click', () => {
  init();
  score = [0, 0];
  currScor = 0;
  activePlayer = 0;
  playing = true;
});

init();
