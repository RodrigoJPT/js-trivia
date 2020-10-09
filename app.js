const mainContainer = document.getElementById('main-container');
const startButton = document.querySelector('.start-game');
const gameState = {};

startButton.addEventListener('click', startGame);

function startGame(e) {
	e.preventDefault();
	mainContainer.innerHTML = '';
	getSessionQuestions().then((questions) => {
		gameState.questions = questions;
	});
}

async function getSessionQuestions() {
	const questions = [];
	await fetch('https://opentdb.com/api.php?amount=10&category=14')
		.then((res) => res.json())
		.then((resJson) => {
			resJson.results.forEach((question) => {
				questions.push(question);
			});
		})
		.catch((error) => alert(error));
	return questions;
}
