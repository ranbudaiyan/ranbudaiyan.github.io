const levels =  [	
	//level 0
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

	["flag", "rock", "", "", "",  
 	"fenceside", "rock", "", "", "rider",
 	"", "tree", "animate", "animate", "animate",
 	"", "water", "", "", "", 
 	"", "fencetop", "", "horseup", "" ], 

 	//level 1
 	["tree", "tree", "flag", "tree", "tree",
 	"animate", "animate", "animate", "animate", "animate",
 	"water", "bridge", "water", "water", "water", 
 	"", "", "", "fencetop", "", 
 	"rider", "rock", "", "", "horseup"],

 	//level 2
 	["flag", "water", "", "", "", 
 	 "fenceside", "water", "", "", "rider",
 	 "animate", "bridge animate", "animate", "animate", "animate",
 	 "", "water", "", "", "", 
 	 "", "water", "horseup", "", ""]

 	 ]; //End of levels

const gridBoxes = document.querySelectorAll("#gameBoard div"); 
const noPassObstacles = ["rock", "tree", "water"]; 

var cut2; 
var clearHorses;

var currentLevel = 0; //starting level
var riderOn = false; //is the rider on
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;
var pause = false; //determines if pause is in effect
var cutSceneDone = false; 
//start game
window.addEventListener("load", function() {
loadLevel(); 
cutScene1();

cut2 = setTimeout(cutscene2, 4600);

setTimeout(function() {
	clearTimeout(cut2); 
	clearInterval(clearHorses);
}, 18000);

setTimeout(function() {
	loadLevel();
}, 20000); 

}); 

var directionHorse; 

//move horse
document.addEventListener("keydown", function (e) {
	 if (cutSceneDone == true) {
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
			}
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
}

}); //key event listener

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 32) {
		shoot(gridBoxes, directionHorse, currentLocationOfHorse);
	}

}); 

function shoot(boxes, direction, start) {

	let counter = 1; 

console.log(start);

	if (direction = "left") {

			
				setInterval (function() {
					boxes[start-1].className = 'bulletrside1'; 
					if (counter < 2) {
						counter++;
					}

					if (counter==2) {
						counter = 1;
					}

					start--; 
				}, 75); //setInterval
				
	} //if




}


//console.log(gridBoxes[6].className); 

function cutScene1() {

	setTimeout(function() {
		gridBoxes[16].className = 'horseriderright';
		gridBoxes[15].className = ""; 
	}, 800);

	setTimeout(function() {
		gridBoxes[17].className = 'horseriderright';
		gridBoxes[16].className = ""; 
	}, 1200);  

	setTimeout(function() {
		gridBoxes[12].className = 'horseriderup';
		gridBoxes[17].className = ""; 
	}, 1900); 

	setTimeout(function() {
		gridBoxes[7].className = 'horseriderup';
		gridBoxes[12].className = ""; 
	}, 2500); 

	setTimeout(function() {
		gridBoxes[8].className = 'horseriderright';
		gridBoxes[7].className = ""; 
	}, 3000); 

	setTimeout(function() {
		gridBoxes[9].className = 'horseriderright';
		gridBoxes[8].className = ""; 
	}, 3600); 

	setTimeout(function() {
		gridBoxes[9].className = ""; 
		
	}, 4000); 
	currentLevel++;
	
	setTimeout(function() {
		document.getElementById("cutscene1").style.display = 'block';
		document.getElementById("cutscene1").style.backgroundColor = 'rgba(0,0,0,0.8)';			
		loadLevel(); 
	}, 4100); 

} //cutScene1 

var clearDust; 
var x = 4; 
var y = 9;
var z= 14;
var dust = 1;
var timer = 0; 
function cutscene2() {
	document.getElementById("cutscene1").style.display = 'none';
	document.getElementById("cutscene2").style.display = 'block';

	setTimeout(function() {
		setInterval(function() {
		document.getElementById("cutscene2").style.display = 'none';

		if ( x > 1) {
			gridBoxes[x].className = 'enemyleft';
			gridBoxes[x+1].className = ""; 
			x--;
			} 
		
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
			} 
		}, 500); 


	}, 2350); 


	
	 setTimeout(function () {
	clearDust =	setInterval(function() {
		gridBoxes[10].className = 'dust' + dust;	
		

		if (dust < 3 && timer < 28) {
			dust++; 
		timer++; 
		}

		if (dust == 3) {
			dust = 1;
		}

		
		}, 90); 
	}, 4900); 

	clearHorses = setTimeout(function() {
		exitHorse(); 
	}, 7000);

	setTimeout(function() {
		clearInterval(clearDust);
		gridBoxes[10].className = "horseright"; 
	}, 10000);

	currentLevel++; 


} //cutScene2


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
			} 

			if (x<14) {
			gridBoxes[x+1].className = 'enemyrider';
			gridBoxes[x].className = ""; 
			x++;
			} 

			if (y<14) {
			gridBoxes[y+1].className = 'enemyright';
			gridBoxes[y].className = ""; 
			y++;
			} 
			
			if (z<19) {
			gridBoxes[z+1].className = 'enemyright';
			gridBoxes[z].className = ""; 
			z++;
			} 
							
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
		document.getElementById("lose").style.display = "block";
		return;
		//end game function
	} //if

	// if a flag is hit, move up a level	
	levelUp(nextClass);

} //try to move

//move up a level
function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn) {
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function () {
			document.getElementById("levelup").style.display = "none";
			if (currentLevel < 3) {
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
} //win

var animateBoxes;

//load level 0 - maxlevel
function loadLevel() {

	setTimeout (function() {
		cutSceneDone = true;

	}, 4500);

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


var directionEnemy;
var indexEnemy; 

// animate enemy left to right
// boxes - array of grid boxes that includes animation
//index - current location of animation
// direction - current direction of animation
function animateEnemy (boxes, index, direction) {

	//exit function if no animation
	if (boxes.length <= 0) {return; }

	//update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
		directionEnemy = "right"; 
	} else {
		boxes[index].classList.add("enemyleft");
		directionEnemy = "left";
	}

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
			indexEnemy = index;
		}//else

	// moving left
	} else {
		//turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
			indexEnemy = index;
		}//else

	} //if

	//if (pause == false) {
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750); 
	
	//}
} //animateEnemy

function toggleSettingsPage() {
	document.getElementById("settingsPage").style.display = 'block'; 
}

function pauseGame() {
	pause = true;
}//pauseGame


function resumeGame() {
	pause = false;
	animateEnemy(animateBoxes, indexEnemy, directionEnemy);
} //resumeGame



















