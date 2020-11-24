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

	function newGame() {
		playerTurn = "x";
		gameActive = true;
		gameBoard.clearBoard();
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
		for (let i = 0; i < 2; i++) {
			if (gameBoard.getTile(i, 0) == gameBoard.getTile(i, 1) == gameBoard.getTile(i, 2)) {
				if (gameBoard.getTile(i, 0) != null) {
					gameActive = false;
					return gameBoard.getTile(i, 0);
				}
			}
		}
		// check rows
		for (let i = 0; i < 2; i++) {
			if (gameBoard.getTile(0, i) == gameBoard.getTile(1, i) == gameBoard.getTile(2, i)) {
				if (gameBoard.getTile(0, i) != null) {
					gameActive = false;
					return gameBoard.getTile(0, i);
				}
			}
		}
		// check diagonals
		if ((gameBoard.getTile(0, 0) == (gameBoard.getTile(1, 1) == gameBoard.getTile(2, 2))) ||
			(gameBoard.getTile(2, 0) == (gameBoard.getTile(1, 1) == gameBoard.getTile(0, 2)))) {
			if (gameBoard.getTile(1, 1) == null) return null;
			gameActive = false;
			return gameBoard.getTile(1, 1) ;
		}
		// No winner yet
		return null;
	}

	function showWinner() {
		alert(`${checkForWinner().toUpperCase()} wins!`);
	}

	return {
		newGame,
		placeMark,
		checkForWinner
	}


})(gameBoard);

function playGame () {
	gameController.placeMark(0, 0);
	gameController.placeMark(1, 1);
	gameController.placeMark(1, 0);
	gameController.placeMark(0, 1);
	gameController.placeMark(2, 0);
}

function playerFactory() {

}