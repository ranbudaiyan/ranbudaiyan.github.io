//global variables
var speedOfPaddle1 = 0; 
var speedOfPaddle2 = 0; 
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;


//move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) { //w
		speedOfPaddle1 = -10; 

	}//if

	if (e.keyCode == 83 || e.which == 83) { //s
		speedOfPaddle1 = 10; 

	}//if

	if (e.keyCode == 38|| e.which == 38) { //up
		speedOfPaddle2 = -10; 

	}//if

	if (e.keyCode == 40|| e.which == 40) { //up
		speedOfPaddle2 = 10; 

	}//if

	show();

}); 

//stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = 0; 

	}//if

	if (e.keyCode == 83 || e.which == 83) { //s
		speedOfPaddle1 = 0; 

	}//if

	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0; 

	}//if

	if (e.keyCode == 40|| e.which == 40) { //up
		speedOfPaddle2 = 0; 

	}//if

	show(); 

});


// update locations of paddles and ball
function show() {
 	let paddleHeight = document.getElementById("paddle1").offsetHeight;
	let gameboardHeight = document.getElementById("gameboard").offsetHeight; 

	//left paddle
	positionOfPaddle1 += speedOfPaddle1; 
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 


	//stop left paddle from leaving top of gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0; 
	}//if

	//stop left paddle from leaving the bottom of the game board
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight; 
	}

	//right paddle
	positionOfPaddle2 += speedOfPaddle2; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 

	//stop right paddle from leaving top of gameboard
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0; 
	}//if

	//stop right paddle from leaving the bottom of the game board
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight; 
	}


	
}//show






