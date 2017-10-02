function setup(){
	createCanvas(windowWidth, windowHeight);
	noStroke();
}

function draw(){
	background(255);

	var x = 50;
	var y = 50;

	var w = 300;
	var h = 500;

	fill(200);
	rect(x,y, w, h);

	fill(0);
	ellipse(mouseX, mouseY, 20, 20);
	ellipse(
		map(mouseX,0, width,x,w+x),
		map(mouseY,0, height,y,h+y),
		20,
		20
	)
}


