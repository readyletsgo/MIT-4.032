


function setup() {
 	createCanvas(800,600); 

 	background(200);
  	fill(255,255,241);
  	strokeWeight(5);

	
	var yPos = 50;
	var yDistance = 120;

	// yPos is 50
  	rect(100,yPos, 200,100);
  	yPos = yPos + yDistance;
  	// now, yPos is 200

  	rect(100,yPos, 200,100);
  	
  	yPos = yPos + yDistance;
  	// now, yPos is 350
  	rect(100,yPos, 200,100);

}

function draw() {
   	

}