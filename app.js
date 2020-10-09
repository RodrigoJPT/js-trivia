const mainContainer = document.getElementById('main-container');
const startButton = document.querySelector('.start-game');
const gameState = {};
gameState.titleScreen = mainContainer.children;

startButton.addEventListener('click', startGame);

function startGame(e) {
	e.preventDefault();
	mainContainer.innerHTML = '';
	getSessionQuestions().then((questions) => {
		gameState.questions = questions;
		gameState.currentQuestion = 0;
		update(gameState.currentQuestion);
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

function update(index) {
	if (index < gameState.questions.length) {
		const questionText = document.createElement('p');
		questionText.innerHTML = gameState.questions[index].question;
		mainContainer.innerHTML = '';
		console.log(questionText);
		mainContainer.appendChild(questionText);
		gameState.currentQuestion++;
	}
}

//test, delete/modify later
mainContainer.addEventListener('click', (e) => {
	e.preventDefault();
	if (gameState.questions) {
		update(gameState.currentQuestion);
	}
});
