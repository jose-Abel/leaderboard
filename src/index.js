import './style.css';

const gameID = 'plCBmErkBwJG8kN6iM4F';
const URL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`;

const refreshButton = document.getElementById('refresh-button');
const nameInput = document.getElementById('form-name');
const scoreInput = document.getElementById('form-score');
const submitButton = document.getElementById('submit-button');
const table = document.querySelector('.table');
const tdBody = document.querySelector('.table-body');
const thName = document.querySelector('.thName');
const thScore = document.querySelector('.thScore');

const transformData = (data) => {
  tdBody.innerHTML = '';

  if (data.length) {
    table.classList.remove('hide');
    thName.classList.remove('hide');
    thScore.classList.remove('hide');
  }

  data.forEach((result) => {
    const { user, score } = result;

    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdScore = document.createElement('td');

    tdName.scope = 'row';
    tdScore.scope = 'row';

    tdName.innerHTML = user;
    tdScore.innerHTML = score;

    tdBody.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdScore);
  });
};

const handleGetGames = async () => {
  try {
    const response = await fetch(URL);

    const data = await response.json();

    const { result } = data;

    transformData(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

const handlePostScores = async () => {
  if (nameInput.value && scoreInput.value) {
    try {
      await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          user: nameInput.value,
          score: scoreInput.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      nameInput.value = '';
      scoreInput.value = '';
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

refreshButton.addEventListener('click', handleGetGames);

submitButton.addEventListener('click', handlePostScores);

document.addEventListener('DOMContentLoaded', () => {
  handleGetGames();
});