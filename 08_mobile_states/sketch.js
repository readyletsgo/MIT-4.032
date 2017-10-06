var canvas;
var state =0;




function setup() {
  // see pixeldensity in reference
  pixelDensity(3.0);
  /*
  this is the logical resolution for iphone 6 without the browser chrome at the top
  adjust it for your phone accordingly
  */
  canvas = createCanvas(375,667); 
 	background(50);
  fill(255,255,241);
  strokeWeight(5);
  rectMode(CENTER);
}

function draw() {
  background(50);
  fill(250);
  textSize(40);
  noStroke();
  if(state==0){
    fill(250);
    text("Hello State 0",10,50);  
    ellipse(width/2,height/2,200,200);
  }else if(state==1)
  {

    fill(255,0,0);
    text("Hello State 1",10,50);  
    rect(width/2,height/2,200,200);

  }
}

function touchEnded() {
  if (state == 0) {
    state = 1;
  } else {
    state = 0;
  }
}

