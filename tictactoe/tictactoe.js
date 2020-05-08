let currentPlayer = "X"; 
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0; 


//take player turn 
function playerTakeTurn(e) {
	
	if (e.innerHTML =="") {
	e.innerHTML = currentPlayer; 
	checkGameStatus(); 
	} else { 
		console.log("This box is already taken."); 
		return; 
	}//else


	//game is over
	if (gameStatus != "") {
		console.log("game is over, " + gameStatus)
	}
}//playerTakeTurn


//after each turn, check for a winner, a tie, or continue playing
function checkGameStatus() {
	numTurns++; //count turn

	//check for a Win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!"; 
		console.log("Game Status: " + gameStatus);
	}//if


	//check for a tie
	if (numTurns == 9) {
		gameStatus = "Tie Game!";
		console.log("Game Status: " + gameStatus); 
	}//if


	//coninue, switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X"); 

}//checkGameStatus


//checks for a win
function checkWin() {
	
	let cb = []; //current board
	cb[0] = ""; //not going to use
	cb[1] = document.getElementById("one").innerHTML; 
	cb[2] = document.getElementById("two").innerHTML; 
	cb[3] = document.getElementById("three").innerHTML; 
	cb[4] = document.getElementById("four").innerHTML; 
	cb[5] = document.getElementById("five").innerHTML; 
	cb[6] = document.getElementById("six").innerHTML; 
	cb[7] = document.getElementById("seven").innerHTML; 
	cb[8] = document.getElementById("eight").innerHTML; 
	cb[9] = document.getElementById("nine").innerHTML; 

	//top row
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true; 
	}

	//middle row
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true; 
	}
	
	
	///bottom row
	if ((cb[7] == "X" || cb[7] == "O") && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}
	
	/*
	//column 1
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true; 
	}

	//column 2
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true; 
	}

	//column 3
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true; 
	}

	//diagonal left to right
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true; 
	}

	//diagonal right to left
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true; 
	}

*/ 
}//checkWin













