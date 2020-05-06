// changes the visibility of a certain divID
function changeVisibility (divID) {
	var element = document.getElementById(divID); 

// if element exits, this toggles it's class name between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden'; 

	}//if
} //changeVisibility

// displays lightbox with the bigImage in it
function displayLightBox (imageFile, alt) {

	var image =  new Image(); 
	var BigImage = document.getElementById("bigImage"); 

	image.src = "images/" + imageFile; 
	image.alt = alt; 


	image.onload = function () { 
		var width = image.width; 
		document.getElementById("boundaryBigImage").style.width = width + "px"; 
	};

	bigImage.src = image.src; 
	bigImage.alt = image.alt; 


	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage'); 

} //displayLightBox
