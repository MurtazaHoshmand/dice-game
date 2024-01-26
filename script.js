'use strict';

// selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player = document.querySelector('.player');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// change player
const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (playing) {
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      // change player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //   1 exists (change players)
    else {
      // change players
      changePlayer();
    }
  }
});

// hold

btnHold.addEventListener('click', function () {
  if (playing) {
    // add the score to total
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // check if player reach 100
    if (score[activePlayer] >= 100) {
      // finish the game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // change player
      changePlayer();
    }
  }
});

// new game

document.querySelector('.btn--new').addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  // remove black background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // reset the content
  player0El.textContent = 0;
  player1El.textContent = 0;
  // active player 0
  document
  .querySelector(`.player--0`)
  .classList.add('player--active');
  
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
});
