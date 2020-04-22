alert("hello"); 
var pics = [
	"images/kitty_bed.jpg",
	"images/kitty_basket.jpg", 
	"images/kitty_laptop.jpg",
	"images/kitty_door.jpg",
	"images/kitty_sink.jpg",
	"images/kitty_wall.jpg"
];


var btn = document.querySelector("button");
var img = document.querySelector("img");
var counter = 1; 

btn.addEventListener("click", function(){
	if (counter === 6) {
		counter = 0; 
	}
	img.src = pics[counter]
	counter = counter + 1; 
});
