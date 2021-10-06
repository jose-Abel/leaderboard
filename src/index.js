import './style.css';

const gameID = 'Qh5qvu9aTOutMmVnTpfJ';
const URL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`;

const ulElement = document.getElementById('recent-scores-ul');
const refreshButton = document.getElementById('refresh-button');
const nameInput = document.getElementById('form-name');
const scoreInput = document.getElementById('form-score');
const submitButton = document.getElementById('submit-button');

const transformData = (data) => {
  ulElement.innerHTML = '';

  data.forEach((result) => {
    const { user, score } = result;

    const liElement = document.createElement('li');
    const spanNameElement = document.createElement('span');
    const spanScoreElement = document.createElement('span');

    liElement.classList.add('recent-scores-li');
    spanNameElement.classList.add('name');
    spanScoreElement.classList.add('score');

    spanNameElement.innerHTML = `${user}: `;
    spanScoreElement.innerHTML = score;

    liElement.appendChild(spanNameElement);
    liElement.appendChild(spanScoreElement);
    ulElement.appendChild(liElement);
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