const mainContainer = document.getElementById('main-container');
const startButton = document.querySelector('.start-game');

startButton.addEventListener('click', startGame);

function startGame(e) {
	e.preventDefault();
	mainContainer.innerHTML = '';
	getSessionQuestions().then((res) => {
		console.log('should be second');
	});
}

async function getSessionQuestions() {
	await fetch('https://opentdb.com/api.php?amount=10&category=14')
		.then((res) => res.json())
		.then((resJson) => {
			console.log(resJson, 'should be first');
			return resJson;
		});
}
