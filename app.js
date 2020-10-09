//Initialize all screens and their relevant elements.
const mainContainer = document.getElementById('main-container');
const mainMenu = document.querySelector('#main-menu').cloneNode(true);
const startButton = document.querySelector('.start-game');
const gameState = {};
const endScreen = document.createElement('div');
const endScreenText = document.createElement('p');
const menuButton = document.createElement('button');
menuButton.innerText = 'Main Menu';
menuButton.addEventListener('click', showMainMenu);
const replayButton = document.createElement('button');
replayButton.innerText = 'Play Again';
replayButton.addEventListener('click', startGame);
const questionScreen = document.createElement('div');
const questionText = document.createElement('p');
endScreen.appendChild(endScreenText);
endScreen.appendChild(menuButton);
endScreen.appendChild(replayButton);
questionScreen.appendChild(questionText);

startButton.addEventListener('click', startGame);

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

function startGame(e) {
	e.preventDefault();
	console.log('clicked');
	mainContainer.innerHTML = '';
	getSessionQuestions().then((questions) => {
		gameState.questions = questions;
		gameState.currentQuestion = 0;
		update(gameState.currentQuestion);
	});
}

function update(index) {
	if (index < gameState.questions.length) {
		questionText.innerHTML = gameState.questions[index].question;
		mainContainer.innerHTML = '';
		mainContainer.appendChild(questionScreen);
		gameState.currentQuestion++;
	} else {
		endGame();
	}
}

function endGame(correct = 6, score = null) {
	endScreenText.innerText = `You answered ${correct} out of ${gameState.questions.length} questions correctly!`;
	mainContainer.innerHTML = '';
	mainContainer.appendChild(endScreen);
}

function showMainMenu(e) {
	e.preventDefault();
	mainContainer.innerHTML = '';
	mainMenu.children[1].addEventListener('click', startGame);
	mainContainer.appendChild(mainMenu);
}

//test, delete/modify later
questionText.addEventListener('click', (e) => {
	e.preventDefault();
	if (gameState.questions) {
		update(gameState.currentQuestion);
	}
});
