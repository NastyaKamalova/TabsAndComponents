let field = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
]

const winCombinations = [
		[{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0}],
		[{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1}],
		[{x: 0, y: 2},{x: 1, y: 2},{x: 2, y: 2}],

		[{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
		[{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
		[{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],

		[{x: 0, y: 0},{x: 1, y: 1},{x: 2, y: 2}],
		[{x: 2, y: 0},{x: 1, y: 1},{x: 0, y: 2}]
	];

let activePlayer = 'x'

const game = document.querySelector('.game'),
	  winnerDisplay = document.querySelector('.winner'),
	  buttons = document.querySelectorAll('.btn');

game.addEventListener('click', gameHandler);

function gameHandler(event) {
	let isButton = event.target.classList.contains('btn');
	if (isButton) {
		let button = event.target,
			x = button.dataset.x,
			y = button.dataset.y;
			if (field[x][y] === null) {
				button.textContent = activePlayer;
				field[x][y] = activePlayer;
			}

	togglePlayer();
	isEndGame();
	}
}

function togglePlayer() {
	activePlayer === 'x'
	? activePlayer = 'o'
	: activePlayer = 'x';
}

function showWinner(input, winner) {
	if (winner === 'x') {
		input.value = 'Крестики победили!';
	} else if (winner === 'o') {
		input.value = 'Нолики победили!';
	} else if (!winner) {
		input.value = 'Ничья!';
	}
	winnerDisplay.classList.remove('d-none');
}

function clear(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			array[i][j] = null;
		}
	}

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].textContent = '';
	}
}


function isFieldFilled(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			if (array[i][j] === null) return false;
		}
	}
	return true;
}

function isEndGame() {
	let winner;
	winCombinations.forEach((winCombinations) => {
		let match1 = winCombinations[0],
			match2 = winCombinations[1],
			match3 = winCombinations[2];

		const isMatchX =
			field[match1.x][match1.y] === 'x'
			&& field[match2.x][match2.y] === 'x'
			&& field[match3.x][match3.y] === 'x';

		const isMatchY =
			field[match1.x][match1.y] === 'o'
			&& field[match2.x][match2.y] === 'o'
			&& field[match3.x][match3.y] === 'o';

			if (isFieldFilled(field) && !isMatchX && !isMatchY) {
				showWinner(winnerDisplay);
				clear(field);	
			}

		if (isMatchX || isMatchY) {
			if (isMatchX) winner = 'x'
			else if (isMatchY) winner = 'o';
			showWinner(winnerDisplay,winner);
			clear(field,winner);
		}
	})

	return winner;
}

