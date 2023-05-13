'use strict';
// Global constants
const RESULT_MESSAGE = document.querySelector('.result-message');
const USER_SCORE = document.querySelector('.user-span-score');
const USER_ICON = document.querySelector('.user-chosen-value i');
const COMP_SCORE = document.querySelector('.comp-span-score');
const COMP_ICON = document.querySelector('.comp-chosen-value i');
const RESET_BUTTON = document.getElementById('reset-button');
const INFO_MESSAGE = document.querySelector('.info-message');
const BUTTONS = document.querySelectorAll('.buttons button');

const playerBoard = document.getElementById('user-value');
const compBoard = document.getElementById('comp-value');

// Icons
const ROCK_ICON = 'fa-solid fa-hand-back-fist fa-2xl';
const PAPER_ICON = 'fa-solid fa-hand fa-2xl';
const SCISSORS_ICON = 'fa-solid fa-hand-scissors fa-2xl';

// State of the game
let gameIsRunning = true;

let userScore = 0;
let compScore = 0;

const draw = () => {
  INFO_MESSAGE.innerHTML = "It's DRAW!";
  INFO_MESSAGE.style.color = 'grey';
  compBoard.style.backgroundColor = 'grey';
  playerBoard.style.backgroundColor = 'grey';
};

const lose = () => {
  compScore++;
  COMP_SCORE.textContent = compScore;
  INFO_MESSAGE.textContent = 'YOU LOST THE ROUND!';
  INFO_MESSAGE.style.color = 'red';
  if (compScore) {
    compBoard.style.backgroundColor = 'green';
    playerBoard.style.backgroundColor = 'red';
  }
};

const win = () => {
  userScore++;
  USER_SCORE.textContent = userScore;
  INFO_MESSAGE.textContent = 'YOU WIN THE ROUND!';
  INFO_MESSAGE.style.color = 'green';
  if (userScore) {
    playerBoard.style.backgroundColor = 'green';
    compBoard.style.backgroundColor = 'red';
  }
};

// Generated random values for computer
const computerPlay = () => {
  const randomValue = Math.round(Math.random() * 2);
  if (randomValue === 0) {
    return (COMP_ICON.className = ROCK_ICON);
  } else if (randomValue === 1) {
    return (COMP_ICON.className = PAPER_ICON);
  } else {
    return (COMP_ICON.className = SCISSORS_ICON);
  }
};

// Handle user click for getting user value
const userPlay = () => {
  BUTTONS.forEach((button) => {
    button.addEventListener('click', (btn) => {
      if (gameIsRunning) {
        USER_ICON.className = btn.target.className;
        computerPlay();
        playRound(USER_ICON);
      }
    });
  });
};

// Resetting the game
const resetGame = () => {
  gameIsRunning = true;
  userScore = 0;
  compScore = 0;
  USER_SCORE.textContent = userScore;
  COMP_SCORE.textContent = compScore;
  RESULT_MESSAGE.textContent = 'Result Message';
  RESULT_MESSAGE.style.color = 'black';
  INFO_MESSAGE.textContent = 'ROCK PAPER SCISSORS';
  INFO_MESSAGE.style.color = 'black';
  playerBoard.style.backgroundColor = '#2b2b2b';
  compBoard.style.backgroundColor = '#2b2b2b';
};

// Resetting the game via reset button
RESET_BUTTON.addEventListener('click', resetGame);

// Play a round
const playRound = (userValue) => {
  if (
    (userValue.className === ROCK_ICON && COMP_ICON.className === PAPER_ICON) ||
    (userValue.className === PAPER_ICON &&
      COMP_ICON.className === SCISSORS_ICON) ||
    (userValue.className === SCISSORS_ICON && COMP_ICON.className === ROCK_ICON)
  ) {
    lose();
    gameWinner();
  }
  if (
    (userValue.className === ROCK_ICON &&
      COMP_ICON.className === SCISSORS_ICON) ||
    (userValue.className === PAPER_ICON && COMP_ICON.className === ROCK_ICON) ||
    (userValue.className === SCISSORS_ICON &&
      COMP_ICON.className === PAPER_ICON)
  ) {
    win();
    gameWinner();
  }
  userValue.className === COMP_ICON.className && draw();
};

// Determin the game winner
const gameWinner = () => {
  // Compare the scores and determin winner of the game
  const message =
    userScore > compScore ? 'YOU WIN THE GAME!' : 'YOU LOST THE GAME!';
  const styleColor = userScore > compScore ? 'green' : 'red';

  // The winner who reaches 5 points
  if (compScore >= 5 || userScore >= 5) {
    gameIsRunning = false;
    RESULT_MESSAGE.textContent = message;
    RESULT_MESSAGE.style.color = styleColor;
    INFO_MESSAGE.textContent = message;
    INFO_MESSAGE.style.color = styleColor;
  }
};

const game = () => {
  userPlay();
};
game();
