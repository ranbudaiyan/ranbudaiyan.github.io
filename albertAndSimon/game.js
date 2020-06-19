const levels =  [	
	//level 0
	["rock", "rock", "rock", "", "",  
 	"", "", "", "", "",
 	"", "r", "", "", "t",
 	"", "rider", "", "", "", 
 	"", "", "tree", "tree", "tree" ], 

	["tree", "tree", "tree", "tree", "tree",  
 	"rock", "rock", "", "", "",
 	"tree", "tree", "", "rock", "rock",
 	"horseriderright", "", "", "tree", "rock", 
 	"", "tree", "", "tree", "tree" ], 

 	["rock", "", "", "", "enemyleft",  
 	"", "", "", "", "enemyleft",
 	"horseriderright", "", "", "", "enemyleft",
 	"", "", "", "enemyleft", "", 
 	"", "", "tree", "tree", "tree" ],

 	//level 1
	["flag", "rock", "", "", "",  
 	"fenceside", "rock", "", "", "rider",
 	"", "tree", "animate", "animate", "animate",
 	"", "water", "", "", "", 
 	"", "fencetop", "", "horseup", "" ], 

 	//level 2
 	["tree", "tree", "flag", "tree", "tree",
 	"animate", "animate", "animate", "animate", "animate",
 	"water", "bridge", "water", "water", "water", 
 	"", "", "", "fencetop", "", 
 	"rider", "rock", "", "", "horseup"],

 	//level 3
 	["flag", "", "fencetop", "", "", 
 	 "tree", "rock", "animate", "animate", "animate",
 	 "tree", "", "", "", "",
 	 "", "", "rock", "tree", "", 
 	 "tree", "", "rider", "fencetop", "horseup"],
 	 
 	//level 4
 	["horseright", "", "tree", "tree", "rider",
 	"rock", "", "rock", "", "",
 	"animate", "animate", "animate", "animate", "animate", 
 	"rock", "tree", "rock", "fenceside", "tree", 
 	"flag", "fencetop", "", "", ""],

	//level 5
 	["rider", "tree", "horsedown", "rock", "flag", 
 	 "", "rock", "", "tree", "fenceside",
 	 "", "rock", "animate", "animate", "animate",
 	 "", "water", "", "tree", "", 
 	 "", "", "", "", ""]
 	 ]; //End of levels

const gridBoxes = document.querySelectorAll("#gameBoard div"); 
const noPassObstacles = ["rock", "tree", "water"]; 

var cut2; // is saved to the timeout for cutscene2
var clearHorses; //is saved to the timeout for exitHorses

var currentLevel = 0; //starting level
var riderOn = false; //is the rider on
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;
var pause = false; //determines if pause is in effect
var cutSceneDone = false; 
var time = 5700; // time until cutscene starts
var gameStart = false; 
var cut1; // set timeout for cutsceene 1
var b; // setTimeout for 
var enemySpeed = 750; // enemy speed of animation

//start game and cutscenes
window.addEventListener("load", function() {
document.getElementById("settings").style.display = "none";

loadLevel(); 

setTimeout (function() {
document.getElementById("start").style.display = "none";

currentLevel++; 
loadLevel(); 
}, 5500);


cut1 = setTimeout(cutScene1, time);

cut2 = setTimeout(cutscene2, time + 7000);

setTimeout(function() {
	clearTimeout(cut2); 
	clearTimeout(cut1); 
	clearInterval(clearHorses);
},  time + 19000);

setTimeout(function() {
	practice();
}, time + 19200); 

}); 

var directionHorse; 



//move horse
document.addEventListener("keydown", function (e) {
	if(e.keyCode == 32 && riderOn == false && cutSceneDone == true) {
		shoot(gridBoxes, directionHorse, currentLocationOfHorse);
		return; 
	} //if

	if (bulletMotion = false) {
		clearInterval(bullet);
	}//if

	 if (cutSceneDone == true && lost == false) {
	switch (e.keyCode) {
		case 37: //left arrow
			if (currentLocationOfHorse % widthOfBoard !== 0) {
				tryToMove("left");
				directionHorse = "left"; 
			} //if 
			break;
		case 38: // up arrow
			if (currentLocationOfHorse - widthOfBoard >= 0) {
				tryToMove("up");
				directionHorse = "up"; 
			} //if
			break; 
		case 39: // right arrow
			if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
				tryToMove("right"); 
				directionHorse = "right"; 
			} //if
			break;
		case 40: // down arrow
			if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
				tryToMove("down");
				directionHorse = "down"; 
			} //if
			break;
	} //switch
} //add.eventlistener

}); //key event listener


var bullet; 
var bulletMotion = false;
function shoot(boxes, direction, start) {

	let nextC; // the class the bullet is travelling into
	let startOrig = start; //original value of start

	console.log("IN shoot: " + direction + " " + start); 

	if (direction == "left") {
			
				bullet = setInterval (function() {
 				
				if (start > 1) {
 				nextC = gridBoxes[start-1].className; 
 				}

 				if (start == locationEnemy) {
 					stunEnemy();
 					boxes[start].classList.remove('bulletrside2');
 					return;
 				}//if	

 				if (nextC == 'rider') {
 					lose(); 
 				}

 				if (noPassObstacles.includes(nextC) || nextC == 'fencetop' || nextC == 'fenceside'|| nextC == 'water' || nextC=="rider" || nextC=='flag' || nextC =='bridge') {
 					if (start == startOrig) { return;}
 					boxes[start].classList.remove('bulletrside2');
 					bulletMotion = false;
 					return;
 				} //if
					if (start% widthOfBoard !== 0) {
					boxes[start-1].className = 'bulletrside2'; 
					start--; 
					bulletMotion = true;
				} else {
					boxes[start].classList.remove("bulletrside2");
					return;
					bulletMotion = false;
				} //if
					for (i = 0; i < boxes.length; i++) {
						if(i != start) {
							boxes[i].classList.remove("bulletrside2");
						}//if

					}//for

				}, 75); //setInterval
	} //if

	if (direction == "right") {
			
				bullet = setInterval (function() {
 				
				if (start < 23) {
 				nextC = gridBoxes[start+1].className; 	
 				} //if

 				if (start == locationEnemy) {
 					stunEnemy();
 					boxes[start].classList.remove("bulletlside2");

 					return;
 				}//if

 				if (noPassObstacles.includes(nextC) || nextC == 'fencetop' || nextC == 'fenceside'|| nextC == 'water' || nextC=="rider" || nextC=='flag' || nextC =='bridge') {
 					if (start == startOrig) { return;}
 					boxes[start].classList.remove("bulletlside2");
 					bulletMotion = false; 
 					return;
 				} //if

 				if (nextC == 'rider') {
 					lose(); 
 				}
					if (start % widthOfBoard < widthOfBoard - 1) {
					boxes[start+1].className = 'bulletlside2'; 
					start++; 
					bulletMotion = true;
				} else {
					boxes[start].classList.remove("bulletlside2");
					bulletMotion = false;
					return;
				} //if
					for (i = 0; i < boxes.length; i++) {
						if(i != start) {
							boxes[i].classList.remove("bulletlside2");
						}//if

					}//for

				}, 75); //setInterval	
	} //if


	if (direction == "up") {
			
				bullet = setInterval (function() {
 				
				if (start > 5) {
 				nextC = gridBoxes[start-5].className; 	
 				} //if

 				if (start == locationEnemy && stun==false) {
 					stunEnemy();
 					boxes[start].classList.remove("bulletuup2");
 					return;
 				}//if

 				if (noPassObstacles.includes(nextC) || nextC == 'fencetop' || nextC == 'fenceside' || nextC == 'water' || nextC=='flag' || nextC =='bridge') {
 					if (start == startOrig) { return;}
 					boxes[start].classList.remove("bulletuup2");
 					//bulletMotion = false; 
 					return;
 				} //if

 				if (nextC == 'rider') {
 					lose(); 
 				}
					if (start - widthOfBoard >= 0) {
					boxes[start-5].className = 'bulletuup2'; 
					start = start-5; 
					bulletMotion = true;
				} else {
					boxes[start].classList.remove("bulletuup2");
					bulletMotion = false;
					return;
				} //if

					for (i = 0; i < boxes.length; i++) {
						if(i != start) {
							boxes[i].classList.remove("bulletuup2");
						}//if

					}//for

				}, 75); //setInterval		
	} //if


	if (direction == "down") {
			
				bullet = setInterval (function() {
 				
				if (start < 19) {
 				nextC = gridBoxes[start+5].className; 	
 				} //if

 				if (start == locationEnemy) {
 					stunEnemy();
 					boxes[start].classList.remove("bulletdup2");
 					return;
 				}//if

 				if (noPassObstacles.includes(nextC) || nextC == 'fencetop' || nextC == 'fenceside'|| nextC == 'water' || nextC=="rider" || nextC=='flag') {
 					if (start == startOrig) { return;}
 					boxes[start].classList.remove("bulletdup2");
 					bulletMotion = false; 
 					return;
 				} //if

 				if (nextC == 'rider') {
 					lose(); 
 				}
					if (start + widthOfBoard < widthOfBoard * widthOfBoard) {
					boxes[start+5].className = 'bulletdup2'; 
					start = start+5; 
					bulletMotion = true;
				} else {
					boxes[start].classList.remove("bulletdup2");
					bulletMotion = false;
					return;
				} //if

					for (i = 0; i < boxes.length; i++) {
						if(i != start) {
							boxes[i].classList.remove("bulletdup2");
						}//if

					}//for

				}, 75); //setInterval		
	} //if

}// shoot


var stun = false; //if horse is stunned or not

function stunEnemy() {
	stun = true;
	return; 
} //stunEnemy



function cutScene1() {

	setTimeout(function() {
		gridBoxes[16].className = 'horseriderright';
		gridBoxes[15].className = ""; 
	}, 800);

	setTimeout(function() {
		gridBoxes[17].className = 'horseriderright';
		gridBoxes[16].className = ""; 
	}, 1400);  

	setTimeout(function() {
		gridBoxes[12].className = 'horseriderup';
		gridBoxes[17].className = ""; 
	}, 2000); 

	setTimeout(function() {
		gridBoxes[7].className = 'horseriderup';
		gridBoxes[12].className = ""; 
	}, 2600); 

	setTimeout(function() {
		gridBoxes[8].className = 'horseriderright';
		gridBoxes[7].className = ""; 
	}, 3200); 

	setTimeout(function() {
		gridBoxes[9].className = 'horseriderright';
		gridBoxes[8].className = ""; 
	}, 3800); 

	setTimeout(function() {
		gridBoxes[9].className = ""; 
	}, 4400); 
	
	setTimeout(function() {
		document.getElementById("cutscene1").style.display = 'block';		
		loadLevel(); 
	}, 4800); 

	currentLevel++;
} //cutScene1 


function cutscene2() {
	var clearDust; 
	var x = 4; 
	var y = 9;
	var z = 14;
	var dust = 1;
	var timer = 0; 

	document.getElementById("cutscene1").style.display = 'none';
	document.getElementById("cutscene2").style.display = 'block';

	setTimeout(function() {
		setInterval(function() {
			document.getElementById("cutscene2").style.display = 'none';

			if ( x > 1) {
				gridBoxes[x].className = 'enemyleft';
				gridBoxes[x+1].className = ""; 
				x--;
			} //if 

		}, 500); 
	}, 2000); 

	setTimeout(function() {
		gridBoxes[9].className = 'enemyleft';
	}, 2300);

	setTimeout(function() {
		gridBoxes[8].className = 'enemyleft';
		gridBoxes[9].className = ""; 
	}, 2800);  

	setTimeout(function() {
		gridBoxes[13].className = 'enemydown';
		gridBoxes[8].className = ""; 
	}, 4100); 

	setTimeout(function() {
		gridBoxes[12].className = 'enemyleft';
		gridBoxes[13].className = ""; 
	}, 4600); 

	setTimeout(function() {
		setInterval(function() {
			if ( z > 9) {
				gridBoxes[z].className = 'enemyleft';
				gridBoxes[z+1].className = ""; 
				z--;
			} //if
		}, 500); 
	}, 2350); 


	setTimeout(function () {
	clearDust =	setInterval(function() {
		gridBoxes[10].className = 'dust' + dust;	
		
		if (dust < 3 && timer < 28) {
			dust++; 
			timer++; 
		} //if

		if (dust == 3) {
			dust = 1;
		} //if

		}, 90); 
	}, 4900); 

	clearHorses = setTimeout(function() {
		exitHorse(); 
	}, 7000);

	setTimeout(function() {
		clearInterval(clearDust);
		gridBoxes[10].className = "horseright"; 
	}, 10000);

} //cutScene2


function practice() {
	document.getElementById("practice").style.display = 'block';
	
	document.getElementById("startGame").style.display = 'block'; 
	

	currentLevel++; 

	document.getElementById("startGame").onclick = function() {
	document.getElementById("startGame").style.display = "none";
	document.getElementById("practice").style.display = 'none';
	
	loadLevel(); 
	document.getElementById("settings").style.display = 'block';

	}; //practise
} //practice

function exitHorse () {
var w = 1;
var x = 10; 
var y = 12; 
var z = 17; 

	setTimeout(function() {
		clearHorses = setInterval(function() {

			if (w==4) {gridBoxes[w].className = "";}	
			if (x==14) {gridBoxes[x].className = "";}
			if (y==14) {gridBoxes[y].className = "";}	
			if (z==19) {gridBoxes[z].className = "";}		
			
			if (w<4) {
			gridBoxes[w+1].className = 'enemyright';
			gridBoxes[w].className = ""; 
			w++;
			} //if

			if (x<14) {
			gridBoxes[x+1].className = 'enemyrider';
			gridBoxes[x].className = ""; 
			x++;
			} //if

			if (y<14) {
			gridBoxes[y+1].className = 'enemyright';
			gridBoxes[y].className = ""; 
			y++;
			} //if
			
			if (z<19) {
			gridBoxes[z+1].className = 'enemyright';
			gridBoxes[z].className = ""; 
			z++;
			} //if
							
		}, 500); 

	}, 500); 

}//exit horse


//try to move horse
function tryToMove(direction) {
	
	//location before move
	let oldLocation = currentLocationOfHorse;

	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className; 

	let nextLocation = 0; // location we wish to move to
	let nextClass = ""; // class of location we wish to move to

	let nextLocation2 = 0; 
	let nextClass2 = "";

	let newClass = ""; // new class to switch to if move successful

	switch (direction) {
		case "left":
			nextLocation = currentLocationOfHorse - 1; 
			break; 
		case "right":
			nextLocation = currentLocationOfHorse + 1; 
			break; 
		case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard; 
			break; 
		case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;  
			break; 

	} //switch 

	nextClass = gridBoxes[nextLocation].className; 

	// if the obstacle is not passable, don't move 
	if(noPassObstacles.includes(nextClass)) { return; }

	//if it's a fence and there is no rider, don't move
	if(!riderOn && nextClass.includes("fence")) { return; }

	// if there is a fence, move two spaces with animation
	if(nextClass.includes("fence")) {

		if(riderOn) {
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;

			//set values according to direction
			if (direction == "left") {
				nextClass = "horsejumpleft";
				nextClass2 = "horseriderleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right") {
				nextClass = "horsejumpright";
				nextClass2 = "horseriderright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up") {
				nextClass = "horsejumpup";
				nextClass2 = "horseriderup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if (direction == "down") {
				nextClass = "horsejumpdown";
				nextClass2 = "horseriderdown";
				nextLocation2 = nextLocation + widthOfBoard;
			} //if

			//show horse jumping over fence
			gridBoxes[nextLocation].className = nextClass;

			setTimeout(function() {

				//set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;

				//update current location of horse to be 2 spaces past where it jumps
				currentLocationOfHorse = nextLocation2;

				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;

				//show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;

				// if next box is a flag, go up a level
				levelUp(nextClass); 

			}, 350);

			return;

		}//if horse has rider
		
	}//if class has fence

	// if there is a rider in the next space, add rider
	if(nextClass == "rider") {
		riderOn = true;
	} //if

	// if there is a bridge in the old location keep it
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	} //else

	// build name of new class
	newClass = (riderOn) ? "horserider" : "horse"; 
	newClass += direction;

	// if there is a bridge in the new location, keep it
	if(gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	} //if

	// move the horse one space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	// if the new space is an enemy, end game
	if (nextClass.includes("enemy")) {
		lose(); 
		return;
		//end game function
	} //if

	// if a flag is hit, move up a level	
	levelUp(nextClass);

} //try to move
var lost = false;

function lose() {
	lost = true;
	document.getElementById("lose").style.display = "block";
	pauseGame(); 
	document.getElementById("playAgain").onclick = function() { 
		currentLevel = 3;
		enemySpeed = 750;
		clearInterval(bullet);
		cutSceneDone == true;

		document.getElementById("lose").style.display = "none";
		loadLevel(); 
		return;
	}; 

	return;
} //lose


//move up a level
function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn) {
		stun = false; 
		enemySpeed = enemySpeed - 60;
		if (currentLevel!= 7) {
		document.getElementById("levelup").style.display = "block";
		}

		clearTimeout(currentAnimation);
		clearInterval(bullet);
		setTimeout(function () {
			document.getElementById("levelup").style.display = "none";
			pause == false;
			if (currentLevel < 7) {
				currentLevel++;
			} else {
				win();
				return; 
			}
			loadLevel();
		}, 1000);
	} //if

} //levelUp

function win() {
	document.getElementById("win").style.display = "block";

	document.getElementById("again").onclick = function() { 
		currentLevel = 3;
		enemySpeed = 750;
		clearInterval(bullet); 
		document.getElementById("win").style.display = "none";
		loadLevel(); 
		return;
	}; 

} //win

var animateBoxes;


//load level 0 - maxlevel
function loadLevel() {

	pause = false;
	stun = false;
	lost = false; 

	clearTimeout(currentAnimation); 
	clearInterval(bullet); 
	setTimeout (function() {
		cutSceneDone = true;

	}, 20000);

	let levelMap = levels[currentLevel]; 

	riderOn = false; 

	// load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i]; 
		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
	} //fo

	animateBoxes = document.querySelectorAll(".animate"); 

	animateEnemy(animateBoxes, 0, "right"); 

} //loadLevel


//values storing facts about the enemy horse for the stop/resume controls
var directionEnemy;
var indexEnemy; 
var locationEnemy; 


// animate enemy left to right
// boxes - array of grid boxes that includes animation
//index - current location of animation
// direction - current direction of animation
function animateEnemy (boxes, index, direction) {

	indexEnemy = index;
	directionEnemy = direction; 

	if (pause == true) {return;} 

	//exit function if no animation
	if (boxes.length <= 0) {return; }

	if (stun == true) {
		if (direction == "right") {
			boxes[index].className = "enemyrightstun";
			directionEnemy = "right"; 
			return;
	} else {
		boxes[index].className = "enemyleftstun";
		directionEnemy = "left";
		return;
		} //if
	} //if

	if(boxes[index].className.includes('horse')) {
			lose();
		} //if

	//update images
	if (direction == "right") {
		boxes[index].className = "enemyright";
	} else {
		
		boxes[index].className = "enemyleft";
	} //if

	

	// remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if(i != index) {
		boxes[i].classList.remove("enemyleft");
		boxes[i].classList.remove("enemyright");
		}//if
	}//for

	//moving right
	if (direction == "right") {
		//turn around if hit right side
		if (index == boxes.length - 1) {
			index--;
			direction = "left"; 
		} else {
			index++;
		}//else

	// moving left
	} else {
		//turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		
		} else {
			index--;
		}//else

	} //if

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);

		console.log(pause); 
		for (var i = 0; i < gridBoxes.length; i++) {
			if (gridBoxes[i].className == 'enemyleft' ||gridBoxes[i].className == 'enemyright' ) {
				locationEnemy = i; 
				break; 
			} //if
		} //for

	}, enemySpeed); 
 
	
} //animateEnemy



function toggleSettingsPage() {
	document.getElementById("settingsPage").style.display = 'block'; 
	close(); 

	
			document.getElementById("resume").onclick = function() { 
			if (resume == false) {
			resumeGame(); 
			}
			resume = true;
			pause = false; 
			document.getElementById("settingsPage").style.display = 'none';
			pause = false; 
			return;
	};

	document.getElementById("pause").onclick = function() { 
		pauseGame(); 
		resume = false;
		document.getElementById("settingsPage").style.display = 'none'; 
		return;
	};
	return;
}//toggleSettingsPage


function pauseGame() {
	pause = true;
	resume = false;
	return; 
}//pauseGame


function close() {
	document.getElementById("x").onclick = function() {
		document.getElementById("settingsPage").style.display = 'none'; 
	}; 
} //close

var resume = false;
function resumeGame() {
	resume = true;
	pause = false;
	//if (directionEnemy == 'right' && indexEnemy!= indexOrig) {
	//	indexEnemy = indexEnemy +1;
	//} if (directionEnemy == 'left' && indexEnemy!= indexOrig) {
	////	indexEnemy = indexEnemy - 1;
	//}

	animateEnemy(animateBoxes, indexEnemy, directionEnemy);
} //resumeGame



















