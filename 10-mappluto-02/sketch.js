var table;
var bldgCounts = [];
var maxFloors, minFloors, maxCount, minCount;

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
        var x = map(i,0, bldgCounts.length, 0, width);
        var y = map(bldgCounts[i], minCount, maxCount,height,0);
        ellipse(x,y,5,5);
        var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
      }
  }
}