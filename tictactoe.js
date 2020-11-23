let playField = (function Gameboard () {
	'use strict';
	let board = [null, null, null, 
				 null, null, null,
				 null, null, null];
	
	function setTile(x, mark) {
		board[x] = mark;
	}

	function clearBoard() {
		board = [null, null, null,
				 null, null, null,
				 null, null, null];
	}


	return {
		setTile,
		clearBoard
	}
})();

function playerFactory() {
	
}