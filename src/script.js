/* eslint-disable no-const-assign */
import './style.css';

// Store your API key and game ID in variables
// eslint-disable-next-line no-unused-vars
const API_KEY = 'h5tQF0UfCC2SNpraUeyL';
const GAME_ID = 'h5tQF0UfCC2SNpraUeyL';

// Function to fetch scores for your game from the API and update the table
const refreshScores = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`);
  const data = await response.json();
  const tableBody = document.querySelector('.recentScores tbody');
  tableBody.innerHTML = '';
  data.result.forEach((score) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${score.user}</td>
      <td>${score.score}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Function to add a new score for your game using data from the form
const addScore = async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });
  if (response.ok) {
    nameInput.value = '';
    scoreInput.value = '';
    refreshScores();
  }
};

// Function to create a new game using the API
const createGame = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'YOUR_GAME_NAME' }),
  });
  const data = await response.json();
  // eslint-disable-next-line prefer-destructuring
  GAME_ID = data.result.split('games/')[1].split('/')[0];
  refreshScores();
};

// Call createGame function to create a new game when the page loads
window.onload = createGame;

// Attach event listeners to the Refresh and Submit buttons
const refreshButton = document.querySelector('.recentScores button');
refreshButton.addEventListener('click', refreshScores);

const submitButton = document.querySelector('.addScore input[type="submit"]');
submitButton.addEventListener('click', addScore);
