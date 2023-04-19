import './style.css';

// Store your API key and game ID in variables
const API_KEY = 'Y5ifEX4zYPesLTPaTsGb8';
let gameID;

// Function to fetch scores for your game from the API and update the table
const refreshScores = async () => {
  const response = await fetch(`https://api.leaderboard.com/games/${gameID}/scores?key=${API_KEY}`);
  const data = await response.json();
  const tableBody = document.querySelector('.recentScores tbody');
  tableBody.innerHTML = '';
  data.scores.forEach(score => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${score.name}</td>
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
  const response = await fetch(`https://api.leaderboard.com/games/${gameID}/scores?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  });
  if (response.ok) {
    nameInput.value = '';
    scoreInput.value = '';
    refreshScores();
  }
};

// Function to create a new game using the API
const createGame = async () => {
  const response = await fetch(`https://api.leaderboard.com/games?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'YOUR_GAME_NAME' })
  });
  const data = await response.json();
  gameID = data.id;
  refreshScores();
};

// Call createGame function to create a new game when the page loads
window.onload = createGame;

// Attach event listeners to the Refresh and Submit buttons
const refreshButton = document.querySelector('.recentScores button');
refreshButton.addEventListener('click', refreshScores);

const submitButton = document.querySelector('.addScore input[type="submit"]');
submitButton.addEventListener('click', addScore);
