var table;
var bldgCounts = [];
var maxFloors, minFloors, maxCount, minCount;
var margin = 250;

// we will preload the data set. 
// That will display "Loading..." on the screen so we see something's happening
function preload(){
	table = loadTable('data/PLUTODD16v1-Manhattan-min.csv', 'csv', 'header');
}

// In this program everything happens in setup
function setup() {
	createCanvas(windowWidth, windowHeight);
  loadData(); 
  displayData();
  drawLabels();
}

function loadData() {
  	var numFloors = table.getColumn("NumFloors");
  	maxFloors = 0;
  	minFloors = 10000;

  	// what are the min and max values of the amount of floors?
  	for(var i=0; i<numFloors.length; i++){
  		var floorCount = int(numFloors[i]);
  		if(floorCount >maxFloors){
  			maxFloors = floorCount;
      }
  		if(floorCount < minFloors){
  			minFloors = floorCount;
        }
  	}

  console.log("Max amount of floors in all bldgs: " + maxFloors);
  console.log("Min amount of floors in all bldgs: " + minFloors);

	// let's create an array for all possible floor counts
 	for(var i=0; i<maxFloors+1; i++){
  		append(bldgCounts, 0);
  	}
  	console.log("we now have an array with the length of " +  bldgCounts.length);

  	// let's go through all floor values again
    // and count how many of each building type there are
    for(var i=0; i<numFloors.length; i++){
  		var floorCount = int(numFloors[i]);
 		   bldgCounts[floorCount]++;
  	}

    maxCount = 0;
    minCount = 100000;

    for(var i=0; i<bldgCounts.length;i++){
        if(bldgCounts[i]>maxCount){
          maxCount = bldgCounts[i];
        }
        if(bldgCounts[i]<minCount){
          minCount = bldgCounts[i];
        }
    }
  console.log("largest number of buildings with the same amount of floors: " + maxCount);
  console.log("smallest number of buildings with the same amount of floors: " + minCount);

    // let's just output the whole array to the console and have a look at it
  	console.log(bldgCounts);
}

function displayData(){

  fill(255,0,0);
  noStroke();
  // go through building count array
  // map the x value to floor height
  // map the y value to number of buildings
  for(var i=1; i<bldgCounts.length; i++){
      if(bldgCounts[i]>0){
        var x = map(i,0, bldgCounts.length, margin, width-margin);
        var y = map(bldgCounts[i], minCount, maxCount,height-margin,margin);
        ellipse(x,y,5,5);
        var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
      }
  }
}

function drawLabels(){

  // 1. Let's draw the x axis
  stroke(0);
  // just the line
  line(margin,height-margin,width-margin,height-margin);
  noStroke();
  textAlign(CENTER);
  // draw the sections and add text for each section
  for(var i=0; i<bldgCounts.length; i+=5){
    var y = height-margin+30;
    x = map(i,0, bldgCounts.length,margin, width-margin);
    noStroke();
    fill(0);
    text(i, x, y);
    stroke(0);
    line(x,y-12,x, y-30);
  }
  // label the whole axis
  textAlign(RIGHT);
  noStroke();
  textStyle(BOLD);
  text("Number of Floors", width-margin,height-margin+70);

  // 2. Let's draw the y Axis
  stroke(0);
  line(margin,height-margin ,margin,margin);
  noStroke();
  textAlign(RIGHT);
  textStyle(NORMAL);
  for(var i=0; i<maxCount; i+=1000){
    var x = margin-20;
    y = map(i,0, maxCount,height-margin, margin);
    noStroke();
    fill(0);
    text(i, x, y+5);
    stroke(0);
    line(x+5,y,x+20,y);
  }
  textStyle(BOLD);
  noStroke();
  text("Number of Buildings", margin-60,margin);

  // 3. Let's add the overall title
  textStyle(BOLD);
  noStroke();
  textAlign(LEFT);
  textSize(20);
  text("Distribution of buildings per floor count", margin,margin-30);
  textSize(10);
  textStyle(NORMAL);
  text("Manhattan, per PLUTO data set", margin,margin-15);
}
