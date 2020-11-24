let gameBoard = (function Gameboard () {
	let board = [[null, null, null],
				 [null, null, null],
				 [null, null, null]];
	
	function setTile(x, y, mark) {
		board[x][y] = mark;
		document.querySelector(`[data-column="${x}"][data-row="${y}"]`).textContent = mark;
	}

	function getTile(x, y) {
		return board[x][y];
	}

	function clearBoard() {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) setTile(i, j, null);
		}
	}

	function getBoard() {
		return board;
	}

	return {
		setTile,
		clearBoard,
		getBoard,
		getTile
	}
})();

let gameController = (function GameController () {
	let playerTurn = "x";
	let gameActive = true;
	gameBoard.clearBoard();

	// Setup event listeners
	let tiles = Array.from(document.querySelectorAll("div .game-tile"));
	for (let i = 0; i < tiles.length; i++) {
		tiles[i].addEventListener('click', tileInput);
	}
	document.getElementById('game-button-new').addEventListener('click', newGame);

	function newGame() {
		playerTurn = "x";
		gameActive = true;
		gameBoard.clearBoard();
		document.querySelector("#status").textContent = "Playing...";
	}

	function placeMark(x, y) {
		if(!gameActive || gameBoard.getTile(x, y) != null) return;

		if (playerTurn == "x") {
			gameBoard.setTile(x, y, "x");
			playerTurn = "o"
		}
		else {
			gameBoard.setTile(x, y, "o");
			playerTurn = "x"
		}
		if (checkForWinner() != null) {
			showWinner();
		}
	}

	function checkForWinner() {
		// Check columns
		for (let i = 0; i <= 2; i++) {
			if (gameBoard.getTile(i, 0) == gameBoard.getTile(i, 1) && 
				gameBoard.getTile(i, 0) == gameBoard.getTile(i, 2) &&
				gameBoard.getTile(i, 0) != null) {
				
				gameActive = false;
				return gameBoard.getTile(i, 0);
			}
		}
		// check rows
		for (let i = 0; i <= 2; i++) {
			if (gameBoard.getTile(0, i) == gameBoard.getTile(1, i) &&
				gameBoard.getTile(0, i) == gameBoard.getTile(2, i) &&
				gameBoard.getTile(0, i) != null) {

				gameActive = false;
				return gameBoard.getTile(0, i);
			}
		}
		// check diagonals
		if ((gameBoard.getTile(0, 0) == gameBoard.getTile(1, 1) &&
			 gameBoard.getTile(0, 0) == gameBoard.getTile(2, 2)) ||
			(gameBoard.getTile(2, 0) == gameBoard.getTile(1, 1) &&
			 gameBoard.getTile(2, 0) == gameBoard.getTile(0, 2))) {
			if (gameBoard.getTile(1, 1) == null) return null;
			gameActive = false;
			return gameBoard.getTile(1, 1) ;
		}

		// Check if the board is full
		let isFull = true;
		for (let i = 0; i <= 2; i++) {
			for (let j = 0; j <= 2; j++) {
				if (gameBoard.getTile(i, j) == null) {
					isFull = false;
				}
			}
		}

		return (isFull) ? "nobody" : null;
	}

	function showWinner() {
		document.querySelector("#status").textContent = `${checkForWinner().toUpperCase()} wins!`;
		//alert(`${checkForWinner().toUpperCase()} wins!`);
	}

	function tileInput(event) {
		let eTarget = event.currentTarget;
		placeMark(eTarget.getAttribute('data-column'), eTarget.getAttribute('data-row'));
	}

	return {
		newGame,
		placeMark,
		checkForWinner
	}


})(gameBoard);