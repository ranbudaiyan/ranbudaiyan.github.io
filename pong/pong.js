//global variables
var speedOfPaddle1 = 0; 
var speedOfPaddle2 = 0; 
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var paddleHeightLeft = document.getElementById("paddle1").offsetHeight;
var paddleHeightRight = document.getElementById("paddle2").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;


var leftPaddleHit = true;

var score1 = 0;
var score2 = 0;

var positionOfPowerupTop; 
var positionOfPowerupLeft; 

var isSlowVisible = false; 
var isBouncyVisible = false; 
var isBigVisible = false; 
var isPowerVisible = false;

var startTimer = false;
var used = false;

const gameboardHeight = document.getElementById("gameboard").offsetHeight;
const gameboardWidth = document.getElementById("gameboard").offsetWidth; 

const ballHeight = document.getElementById("ball").offsetHeight; 

const startTopPositionOfBall = document.getElementById("ball").offsetTop; 
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0; 

var bounce = new sound ("bounce2.wav");
var buzzer = new sound ("buzzer.mp3");
var topBottomBounce = new sound ("topbottombounce.wav");

//used to control game start/stop
var controlPlay; 

/*
//start ball motion
window.addEventListener('load', function()  {
	startBall(); 
}); 
*/ 

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

});

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}//sound


//starts the movement of the ball
function startBall () {
	let direction = 1; 
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	//50% change of starting in either direction (right of left)
	if (Math.random() < 0.5){
		direction = 1;
	} else {
		direction = -1;
	}//else


	topSpeedOfBall = Math.random() * 2 + 3; //3-4
	leftSpeedOfBall = direction * (Math.random() * 2 + 3); 

	originalTopSpeedOfBall = topSpeedOfBall;
	originalLeftSpeedOfBall = leftSpeedOfBall;

}//startBall


// update locations of paddles and ball
function show() {

	if (used == false && bouncyHit == true) {
		topSpeedOfBall *= 2.3;
		used = true;
		leftSpeedOfBall *= 1.2;
	} //if

	if (used == false && slowHit == true) {
		topSpeedOfBall /= 2;
		used = true;
		leftSpeedOfBall /= 2;
	} //if
	
 	//update positions of elements
	positionOfPaddle1 += speedOfPaddle1; 
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall; 
	leftPositionOfBall += leftSpeedOfBall; 

	if (bigHit == true && leftPaddleHit == true) {
		paddleHeightLeft = 350;
	} else {
		paddleHeightLeft = document.getElementById("paddle1").offsetHeight;
	} //if

	if (bigHit == true && leftPaddleHit == false) {
		paddleHeightRight = 350;
	} else {
		paddleHeightRight = document.getElementById("paddle2").offsetHeight;
	} //if

	//stop left paddle from leaving top of gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0; 
	}//if

	//stop right paddle from leaving top of gameboard
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0; 
	}//if

	//stop left paddle from leaving the bottom of the game board
	if (positionOfPaddle1 >= gameboardHeight - paddleHeightLeft) {
		positionOfPaddle1 = gameboardHeight - paddleHeightLeft; 
	}

	//stop right paddle from leaving the bottom of the game board
	if (positionOfPaddle2 >= gameboardHeight - paddleHeightRight) {
		positionOfPaddle2 = gameboardHeight - paddleHeightRight; 
	}//if


	//if ball hits top, or bottom of gameboard, change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1; 
		topBottomBounce.play();

	} //if

	// ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {

		//If ball hits paddle change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeightLeft) {
			bounce.play();
			leftSpeedOfBall *= -1; 
			leftPaddleHit = true;
			showPowerups();			
		} else {
			buzzer.play();
			startBall();
			score2++;
			document.getElementById("score2").innerHTML = score2; 
			if (bigHit == true || bouncyHit == true || slowHit == true) {
				reset();
				hidePowerups();
			}//if
		}//else 
	} //if

	// ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {

		// If ball hits paddle change direction 
		if (topPositionOfBall > positionOfPaddle2 && 
			topPositionOfBall < positionOfPaddle2 + paddleHeightRight) {
			leftSpeedOfBall *= -1; 
			bounce.play(); 
			leftPaddleHit = false;
		} else {
			buzzer.play();
			startBall(); 
			score1++; 
			document.getElementById("score1").innerHTML = score1;

			if (bigHit == true || bouncyHit == true || slowHit == true) {
				reset();
				hidePowerups();
			} //if
		}//else 
	} //if
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 
	document.getElementById("ball").style.top = topPositionOfBall + "px"; 
	document.getElementById("ball").style.left = leftPositionOfBall + "px";


	//draws in the powers
	if (isSlowVisible == true) {
		document.getElementById("slowBallPower").style.top = y + "px";
		document.getElementById("slowBallPower").style.left = x + "px";
		document.getElementById("slowBallPower").style.display = 'block'; 

	} else if (isBigVisible == true) {
		document.getElementById("bigPaddlePower").style.top = y + "px";
		document.getElementById("bigPaddlePower").style.left = x + "px";
		document.getElementById("bigPaddlePower").style.display = 'block'; 
		
	} else if (isBouncyVisible == true) {
		document.getElementById("bouncyBallPower").style.top = y + "px";
		document.getElementById("bouncyBallPower").style.left = x + "px";
		document.getElementById("bouncyBallPower").style.display = 'block'; 
	} //if

	usePowerups(); 

	//ends the game if a player has 5 points
	if (score1 == 5 || score2 == 5) {
		stopGame();
	} //if
	
}//show


//resumes game play
function resumeGame() { 
	if(!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//resumeGame


//pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false; 
}//pauseGame


//start game play
function startGame() {
	//reset scores, ball, and paddle locations
	score1 = 0;
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall();

	if(!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//startGame


//stop and resets the game
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false; 

	//show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue.";

	if (score2 > score1) {
		message1 = "Player 2 wins with " + score2 + " points!";
		message2 = "Player 1 had " + score1 + " points.";
	} else if (score1 > score2) {
		message1 = "Player 1 wins with " + score1 + " points!";
		message2 = "Player 2 had " + score2 + " points.";
	} //else

	showLightBox(message1, message2);

	hidePowerups();
	reset();
} //stopGame

/**** Lightbox Code ****/ 


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

}//continueGame

/***** End of Lightbox Code *****/ 
	
	//x coordinate of random powerup
	var x; 
	//y coordinate of random powerup
	var y; 

	var probabilityOfPower = 0;
 

//randomly positions and shows the powerups on the gameboard
function showPowerups() {

	timerForPowerInUse = false; 

	probabilityOfPower = Math.floor(Math.random() * 4) + 1;  // returns a random integer from 1 to 3
	
	x = Math.floor(Math.random() * 1500) + 250;
	y = Math.floor(Math.random() * 500) + 250;
	
	positionOfPowerupTop = y; 
	positionOfPowerupLeft = x; 

	if (isPowerVisible == false && probabilityOfPower == 1) {	
		isSlowVisible = true; 
		isPowerVisible = true;
	} //if

	if (isPowerVisible == false && probabilityOfPower == 2) {
		isBouncyVisible = true; 
		isPowerVisible = true;
	} //if

	if (isPowerVisible == false && probabilityOfPower == 3) {
		isBigVisible = true; 
		isPowerVisible = true;
 	} //if

} //showPowerups

//hides the powerups 
function hidePowerups() {

	document.getElementById("slowBallPower").style.display = 'none';
	
	document.getElementById("bigPaddlePower").style.display = 'none';

	document.getElementById("bouncyBallPower").style.display = 'none';
	
	startTimer = false; 

	isBigVisible = false; 
	isBouncyVisible = false;
	isSlowVisible = false;
	
} //hidePowerups


//resets all the powerup varables
function reset() {

	document.getElementById("ball").style.backgroundColor = "red";

	isBigVisible = false; 
	isPowerVisible = false;
	isBouncyVisible = false;
	isSlowVisible = false;

	if (slowHit == true || bouncyHit == true) {
		
 		if (topSpeedOfBall > 0) {
		topSpeedOfBall = Math.random() * 2 + 3; //3-4
		}//if

		if (topSpeedOfBall < 0) {
			topSpeedOfBall = Math.random() * -2 + -3; //3-4	
		}//if

		if (leftSpeedOfBall > 0) {
			leftSpeedOfBall = (Math.random() * 2 + 3); 
		}//if

		if (leftSpeedOfBall < 0) {
			leftSpeedOfBall = (Math.random() * -2 + -3); 
		}//if

	} //if

	document.getElementById("paddle1").style.height = 150 + "px"; 
	document.getElementById("paddle2").style.height = 150 + "px"; 

	slowHit = false;
	bigHit = false;
	bouncyHit = false;

} //reset


var timerForPowerInUse = false; 
var bigHit = false; 
var bouncyHit = false;
var slowHit = false;

var clear;
var clearReset; 


//uses the function of eaach powerup if it is hit
function usePowerups() {
	
	//the powerup that slows the ball down
	if (isSlowVisible == true && document.getElementById("slowBallPower").style.display == 'block') {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {		
				document.getElementById("ball").style.backgroundColor = "blue"; 

				slowHit = true;
				hidePowerups(); 

		} //if
	} //if

	//makes the ball extra bouncy
	if (isBouncyVisible == true && document.getElementById("bouncyBallPower").style.display == 'block') {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {		
				document.getElementById("ball").style.backgroundColor = "#ff47dd"; 

				bouncyHit = true;

				hidePowerups(); 
		} //if
	} //if

	if (isBigVisible == true && document.getElementById("bigPaddlePower").style.display == 'block') {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {	

				bigHit = true;

				if (leftPaddleHit == true) {
				document.getElementById("paddle1").style.height = 350 + "px"; 		
				}

				if (leftPaddleHit == false) {
					document.getElementById("paddle2").style.height = 350 + "px";
				}
			
				hidePowerups(); 
		} //if			
	} //if	

	// if powerups do not get hit 
	if (startTimer == false && isPowerVisible == true) {
		startTimer = true; 
		clear =	setTimeout(hidePowerups, 12000);
		clearReset = setTimeout(reset, 12000); 
	} //if

	if (slowHit == true || bigHit == true || bouncyHit == true) {
		clearTimeout(clear); 
		clearTimeout(clearReset); 
	}//if

	if (timerForPowerInUse == false && slowHit == true || bigHit == true || bouncyHit == true) {
		setTimeout(reset, 14000);
		timerForPowerInUse = true;
	}//if

}//usePowerups




