
function setup() {
	createCanvas(windowWidth, windowHeight);

	// load the tsv data set which is in a table
	loadTable('data/LaborInNonAgricultSector.tsv', 'tsv', 'header', showData);
  }

function showData(data) {
	var rows = data.getRowCount();
	var cols = data.getColumnCount();
	var row, col, val, min, max;
	
	min = 1000000;
  	max = 0;

  	// let's see what kind of values we get from this data set
  	// var val2 = data.get(10, 3);
  	// console.log(typeof val2);

  	// let's set mininum and maximum values for the data
  	// go through each row
	for(row=0; row<rows; row++){
		// within each row, go through each column
		for(col=3; col<cols; col++){
				val = float(data.getString(row, col));
				// check the min/max values
				if(max<val)
					max = val;
			      if (min > val)
			        min = val;	
		}
	}
	// output the min and max values
	console.log("Min: " + min);
	console.log("Max: " + max);

	// now we'll actually draw
	for(row =0; row<rows; row++){
		var randomColor = getRandomColor();
		stroke(randomColor);
		beginShape();
		for(col=3; col<cols; col++){
			val = float(data.getString(row, col));
			noFill();
			// draw the line mapped to the canvas size
			vertex(				
				map(col,3,25, 0, width),
				map(val,min,max, height, 0)
			);
			// draw the filled ellipse mapped to the canvas size
			fill(randomColor);
			noStroke();
			ellipse( 
				map(col,3,25, 0, width) ,
				map(val,min,max, height, 0),
				5,
				5
			);
			// add text with the actual value mapped to canvas size
			text(val, map(col,3,25, 0, width) + 10 ,map(val,min,max, height, 0) + 10);
			noFill();
			stroke(randomColor);

		}
		endShape();
	}
}



// helper function to get a random hex color. 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



