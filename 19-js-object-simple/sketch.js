// array that will contain all the boxes 
var boxes = [];
var activeBoxNumber = "None";

function setup() {
  createCanvas(600, 400);

  // create all the different instances of the boxes
  for (var i = 0; i < 10; i++) {
    // create a box with number "i", at a random x and y location
    boxes[i] = new Box(random(width), random(height), i);
  }
  // output the first bubble object instance
  console.log(boxes[0]);
}

// drawing
function draw() {
  background(0);
  //reset the active bubble number
  activeBoxNumber = "None";

  // go through all boxes
   for (var i = 0; i < boxes.length; i++) {
    // run each bubble's update and display functions
    boxes[i].update();
    boxes[i].display();
    // check if the current bubble is "active" and save that number
    if(boxes[i].active==true){
      activeBoxNumber = i; 
    }
  } 
  // Display active bubble number
  fill(255);
  text("Active Box Number: " + activeBoxNumber, 20,20);
}



// an abstract class that defines an object
function Box(x, y, number) {

  // These variables are unique to each box
  this.x = x;
  this.y = y;
  this.number = number;
  this.col = color(255,100);
  this.colorRollOff = color(100,100,100);
  this.colorRollOver = color(255,0,0);
  var size = random(20,50);
  this.width = size;
  this.height = size;
  this.active = false;

  // update function
  this.update = function() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    
    // check if mouse is over the box
    if(mouseX>this.x && mouseX< this.x+this.width 
      && mouseY > this.y && mouseY< this.y+this.height ){
      // if yes, make this box active and change the color to red
      this.col = this.colorRollOver;
      this.active = true; 
      // if no make it inactive and change the color 
    }else{
      this.col = this.colorRollOff;
      this.active = false;
    }
  };

  // display the box with the updated values
  this.display = function() {
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.width, this.height);
    fill(0);  
    text(this.number, this.x+this.width/2, this.y+this.height/2);
  };
}
