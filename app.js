//Initialize all screens and their relevant elements.
const mainContainer = document.getElementById('main-container');
const mainMenu = document.getElementById('main-menu');
const startButton = document.querySelector('.start-game');
startButton.addEventListener('click', startGame);
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
questionScreen.appendChild(questionText);
const answerButtonContainer = document.createElement('div');
//buttonContainer.addEventListener('click', checkAnswer);
for (i = 0; i < 4; i++) {
	let newButton = document.createElement('button');
	newButton.classList.add('answer-button');
	answerButtonContainer.appendChild(newButton);
}
questionScreen.appendChild(answerButtonContainer);
endScreen.appendChild(endScreenText);
endScreen.appendChild(menuButton);
endScreen.appendChild(replayButton);

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
		getButtonAnswers(gameState.questions[index]);
		mainContainer.innerHTML = '';
		mainContainer.appendChild(questionScreen);
		gameState.currentQuestion++;
	} else {
		endGame();
	}
}

function getButtonAnswers(question) {
	const answers = [];
	answers.push({
		text: question.correct_answer,
		correct: true,
	});
	question.incorrect_answers.forEach((answer) => {
		answers.push({
			text: answer,
			correct: false,
		});
	});
	setAnswerButtonText(answers);
}

function setAnswerButtonText(answers) {
	if (answers.length < 3) {
		for (let i = 0; i < answerButtonContainer.children.length; i++) {
			if (i > 1) {
				answerButtonContainer.children[i].style.display = 'none';
			} else {
				answerButtonContainer.children[i].innerHTML = answers[i].text;
			}
		}
	} else {
		for (let i = 0; i < answerButtonContainer.children.length; i++) {
			answerButtonContainer.children[i].style.display = 'block';
			answerButtonContainer.children[i].innerHTML = answers[i].text;
		}
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
	mainContainer.appendChild(mainMenu);
}

//test, delete/modify later
questionText.addEventListener('click', (e) => {
	e.preventDefault();
	if (gameState.questions) {
		update(gameState.currentQuestion);
	}
});
