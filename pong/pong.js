//global variables
var speedOfPaddle1 = 0; 
var speedOfPaddle2 = 0; 
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
var newPaddleHeight = 300;

var leftPaddleHit = true;

var score1 = 0;
var score2 = 0;

var positionOfPowerupTop; 
var positionOfPowerupLeft; 
var powerupHeight = 200; 

var isSlowVisible = false; 
var isBouncyVisible = false; 
var isBigVisible = false; 
var isPowerVisible = false;

var startTimer = false;

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

}//startBall


// update locations of paddles and ball
function show() {
 	
 	//update positions of elements
	positionOfPaddle1 += speedOfPaddle1; 
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall; 
	leftPositionOfBall += leftSpeedOfBall; 

	//stop left paddle from leaving top of gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0; 
	}//if

	//stop right paddle from leaving top of gameboard
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0; 
	}//if

	//stop left paddle from leaving the bottom of the game board
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight; 
	}

	//stop right paddle from leaving the bottom of the game board
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight; 
	}


	//if ball hits top, or bottom of gameboard, change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1; 

	} //if

	// ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {

		//If ball hits paddle change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1; 
			leftPaddleHit = true;
			showPowerups();			
		} else {
			buzzer.play();
			startBall();
			score2++;
			document.getElementById("score2").innerHTML = score2; 
		}//else 

	} //if

	// ball on right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {

		// If ball hits paddle change direction 
		if (topPositionOfBall > positionOfPaddle2 && 
			topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			leftSpeedOfBall *= -1; 
			bounce.play(); 
			leftPaddleHit = false;
		} else {
			buzzer.play();
			startBall(); 
			score1++; 
			document.getElementById("score1").innerHTML = score1;
		}//else 

	} //if
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 
	document.getElementById("ball").style.top = topPositionOfBall + "px"; 
	document.getElementById("ball").style.left = leftPositionOfBall + "px";


	if (isSlowVisible == true) {
		document.getElementById("slowBallPower").style.top = y + "px";
		document.getElementById("slowBallPower").style.left = x + "px";
		document.getElementById("slowBallPower").className = 'unhidden'; 

	} else if (isBigVisible == true) {
		document.getElementById("bigPaddlePower").style.top = y + "px";
		document.getElementById("bigPaddlePower").style.left = x + "px";
		document.getElementById("bigPaddlePower").className = 'unhidden'; 
		
	} else if (isBouncyVisible == true) {
		document.getElementById("bouncyBallPower").style.top = y + "px";
		document.getElementById("bouncyBallPower").style.left = x + "px";
		document.getElementById("bouncyBallPower").className = 'unhidden'; 

	}

	usePowerups(); 

	console.log(paddleHeight + 200); 
	
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

	probabilityOfPower = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3
	
	x = Math.floor(Math.random() * (gameboardWidth-300)) + 300;
	y = Math.floor(Math.random() * (gameboardHeight-300)) + 300;
	
	positionOfPowerupTop = y; 
	positionOfPowerupLeft = x; 

	if (isPowerVisible == false && probabilityOfPower == 1) {	
		isSlowVisible = true; 
		isPowerVisible = true;
		return isSlowVisible;

	} else if (isPowerVisible == false && probabilityOfPower == 2) {
		isBouncyVisible = true; 
		isPowerVisible = true;
		return isBouncyVisible;

	} else if (isPowerVisible == false && probabilityOfPower == 3) {
		isBigVisible = true; 
		isPowerVisible = true;
		return isBigVisible; 

 	} //if

} //showPowerups


//hides the powerups 
function hidePowerups() {

	document.getElementById("slowBallPower").style.display = 'none';
	isSlowVisible == false; 
	
	document.getElementById("bigPaddlePower").style.display = 'none';
	isBigVisible == false;

	document.getElementById("bouncyBallPower").style.display = 'none';
	isBouncyVisible == false;

	beenUsed = false;
	isPowerVisible = false; 
	startTimer = false; 

} //hidePowerups

function reset() {

	document.getElementById("ball").style.backgroundColor = "red";

	if (isSlowVisible == true) {
		topSpeedOfBall = topSpeedOfBall*2;
		leftSpeedOfBall = leftSpeedOfBall*2;
	}

	if (isBouncyVisible == true) {
		topSpeedOfBall = topSpeedOfBall1/1.17;
		leftSpeedOfBall = leftSpeedOfBall/1.1; 
	}

	if (isBigVisible == true) {
		document.getElementById("paddle1").style.height = 150 + "px";
		paddleHeight = 150; 

	} //if

} //reset


var beenUsed = false; 	

//uses the function of eaach powerup if it is hit
function usePowerups() {
	
	//the powerup that slows the ball down
	if (isSlowVisible == true) {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {		
				hit = true; 
				document.getElementById("ball").style.backgroundColor = "blue"; 

				

				if (beenUsed == false) {
					topSpeedOfBall = topSpeedOfBall/2;
					leftSpeedOfBall = leftSpeedOfBall/2; 
					beenUsed = true; 
				}//if

				hidePowerups(); 
	
		} //if
	} //if

var resetTimer = false;
var hit = false;
	//makes the ball extra bouncy
	if (isBouncyVisible == true) {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {		
				hit = true;
				document.getElementById("ball").style.backgroundColor = "#ff47dd"; 


			if (beenUsed == false) {
				topSpeedOfBall = topSpeedOfBall*1.17;
				leftSpeedOfBall = leftSpeedOfBall*1.1; 

				beenUsed = true; 
			} //if

			hidePowerups(); 

		} //if
 
		
	} //if

	if (isBigVisible == true) {

		if (leftPositionOfBall > positionOfPowerupLeft && leftPositionOfBall < positionOfPowerupLeft + 200 
			&& topPositionOfBall > positionOfPowerupTop && topPositionOfBall < positionOfPowerupTop + 200) {		
				hit = true;
			if (beenUsed == false) {
				paddleHeight = newPaddleHeight;
				document.getElementById("paddle1").style.height = paddleHeight + "px"; 

				beenUsed = true; 
			} //if
			hidePowerups(); 
	
		} //if
	} //if	

	if (startTimer == false && isPowerVisible == true) {
		setTimeout(hidePowerups, 10000);
		startTimer = true;
	}

	if (resetTimer == false && hit == true) {
		setTimeout(reset, 10000);
		resetTimer = true;
		hit = false; 
	}
	
}//usePowerups






