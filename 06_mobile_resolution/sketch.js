
function setup() {
  // see pixeldensity in reference
  pixelDensity(3.0);
  /*
  this is the logical resolution for iphone 6 without the browser chrome at the top
  adjust it for your phone accordingly
  */
  createCanvas(375,667); 
 	background(50);
  fill(255,255,241);
  strokeWeight(5);

}

function draw() {

  fill(250);
  textSize(40);
  noStroke();
  text("Hello World",10,50);
  ellipse(width/2,height/2,200,200);


}