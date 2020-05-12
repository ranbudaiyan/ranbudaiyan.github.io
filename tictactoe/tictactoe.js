let currentPlayer = "X"; 
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0; 
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


// reset board and all variables
function newGame() {

	//reset board
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = ""; 
	} //for

	numTurns = 0; 
	gameStatus = "";
	currentPlayer = "X"; 
	changeVisibility("controls"); 
} //newGame


//randomly chooses a free box for computer
function computerTakeTurn() {
	let idName = "";
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
	

		if (goForWin() != -1) {
			idName = idNames[goForWin()-1];
			document.getElementById(idName).innerHTML = currentPlayer;
			return;

		}
		
		if (terminalState() != -1) {
			idName = idNames[(terminalState())-1];
			document.getElementById(idName).innerHTML = currentPlayer;
			return;

		}//if
	

			do { 
		
			let rand = parseInt(Math.random()*9) + 1; //number between 1 and 9
			idName = idNames[rand-1]; 
	
			//check if chosen box is empty
			if (document.getElementById(idName).innerHTML == "") {
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			}

			} while(true); 

			return;

	//}//else 


} //computerTakeTurn

//check if there are two x in a row
function terminalState() {
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

	for (var i = 0; i < 9; i++) {
		if ((i%3==0) && cb[i] == "X" && cb[i-1] == "X" && cb[i-2] == "") {
		return(i-2);
		}

	}

	//diagonal right to left
	if (cb[3] == "X" && cb[5] == "X" && cb[7] == "") {
		return(7);
	}


	if (cb[5] == "X" && cb[7] == "X" && cb[3] == "") {
		return(3);
	}

	if (cb[3] == "X" && cb[7] == "X" && cb[5] == "") {
		return(5);
	}

	//diagonal left to right
	if (cb[1] == "X" && cb[5] == "X" && cb[9] == "") {
		return(9);
	}


	if (cb[5] == "X" && cb[9] == "X" && cb[1] == "") {
		return(1);
	}

	if (cb[1] == "X" && cb[9] == "X" && cb[5] == "") {
		return(5);
	}


	for (var i = 0; i < 9; i++) {
		if ((i==9 || i == 8 || i == 7) && cb[i] == "X" && cb[i-3] == "X" && cb[i-6] == "") {
		return(i-6);
		}

	}


	for (var i = 0; i < 9; i ++) {
		if (cb[i] == "X" && cb[i+1] == "X" && cb[i+2] == "") {
			return (i+2);
			break;
		}

	}

	for (var i = 0; i < 9; i++) {
		if (cb[i] == "X" && cb[i+2] == "X" && cb[i+1] == "") {
			return (i+1);
			break;
		}

	}

	for (var i = 0; i < 9; i++) {
		if (cb[i] == "X" && cb[i+3] == "X" && cb[i+6] == "") {
			return (i+6);
			break;
		}

	}


	for (var i = 0; i < 9; i++){
		if (cb[i] == "X" && cb[i+6] == "X" && cb[i+3] == "") {
			return (i+3);
			break;
		}

	}

	

	return -1;


}//terminal state

function goForWin() {

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


	for (var i = 0; i < 9; i++) {
		if ((i%3==0) && cb[i] == "O" && cb[i-1] == "O" && cb[i-2] == "") {
		return(i-2);
		}

	}

	//diagonal right to left
	if (cb[3] == "O" && cb[5] == "O" && cb[7] == "") {
		return(7);
	}

	if (cb[5] == "O" && cb[7] == "O" && cb[3] == "") {
		return(3);
	}

	if (cb[3] == "O" && cb[7] == "O" && cb[5] == "") {
		return(5);
	}

	//diagonal left to right
	if (cb[1] == "O" && cb[5] == "O" && cb[9] == "") {
		return(9);
	}


	if (cb[5] == "O" && cb[9] == "O" && cb[1] == "") {
		return(1);
	}

	if (cb[1] == "O" && cb[9] == "O" && cb[5] == "") {
		return(5);
	}

	for (var i = 0; i < 9; i++) {
		if ((i==9 || i == 8 || i == 7) && cb[i] == "O" && cb[i-3] == "O" && cb[i-6] == "") {
		return(i-6);
		}

	}


	for (var i = 0; i < 9; i ++) {
		if (cb[i] == "O" && cb[i+1] == "O" && cb[i+2] == "") {
			return (i+2);
			break;
		}

	}//for

	for (var i = 0; i < 9; i++) {
		if (cb[i] == "O" && cb[i+2] == "O" && cb[i+1] == "") {
			return (i+1);
			break;
		}

	}

	for (var i = 0; i < 9; i++) {
		if (cb[i] == "O" && cb[i+3] == "O" && cb[i+6] == "") {
			return (i+6);
			break;
		}

	}


	for (var i = 0; i < 9; i++){
		if (cb[i] == "O" && cb[i+6] == "O" && cb[i+3] == "") {
			return (i+3);
			break;
		}

	}

	return -1; 

}//goForWin

//take player turn 
function playerTakeTurn(e) {
	
	if (e.innerHTML ==  "") {
	e.innerHTML = currentPlayer; 
	checkGameStatus();

	//if game not over, computer goes
	if (gameStatus == "") {
		setTimeout(function() { 
			computerTakeTurn();
			checkGameStatus(); 
			}, 500
		);

	} //if


	} else { 
		showLightBox("This box is already selected.", "Please try another.");
		return; 
	}//else

}//playerTakeTurn


//after each turn, check for a winner, a tie, or continue playing
function checkGameStatus() {
	numTurns++; //count turn

	//check for a Win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!"; 
	}//if


	//check for a tie
	if (numTurns == 9) {
		gameStatus = "Tie Game!";
	}//if


	//coninue, switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X"); 


	//game is over
	if (gameStatus != "") {
		setTimeout(function() {showLightBox(gameStatus, "Game Over."); }, 500); 
	} //if

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
 
}//checkWin


// changes the visibility of a certain divID
function changeVisibility (divID) {
	var element = document.getElementById(divID); 

	// if element exits, this toggles it's class name between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden'; 
	}//if
} //changeVisibility


//dispplay message in lightbox
function showLightBox(message, message2) {

	//set messages
	document.getElementById("message").innerHTML = message; 
	document.getElementById("message2").innerHTML = message2; 

	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");  

}//showLightBox



//close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");  

	//if game is over, show controls
	if (gameStatus != "") {
		changeVisibility("controls"); 

	}

}//continueGame









