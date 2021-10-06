import './style.css';

const refreshButton = document.getElementById('refresh-button');

const ulElement = document.querySelector('.recent-scores-ul');

const transformData = (data) => {
    const {result} = data;
    const [user, score] = result;

    const liElement = document.createElement('li');
    const spanNameElement = document.createElement('span');
    const spanScoreElement = document.createElement('span');

    liElement.classList.add('recent-scores-li');
    spanNameElement.classList.add('name');
    spanScoreElement.classList.add('score');

    spanNameElement.innerHTML = `${user}: `
    spanScoreElement.innerHTML = score;

    liElement.appendChild(spanNameElement);
    liElement.appendChild(spanScoreElement);
    ulElement.appendChild(liElement);
}

const handleGetGames = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/A1daCs599tPxi2IG5de0/scores');

    const data = await response.json();

    transformData(data);
}

refreshButton.addEventListener('click', handleGetGames);
