// This example is by Daniel Sauter
var c = [];

// this gets run first
function setup() {
  loadTable('LaborInNonAgricultSector.tsv', 'tsv', 'header', showData);  
}

// once the table is called showData runs
function showData(data) {
  var min = 1000000;
  var max = 0;
  
  var count = data.getRowCount();
  console.log("number of rows :" + count);
  for (var row = 0; row < count; row++) {
    for (var col = 3; col < 26; col++) {
      var val = float(data.getString(row, col));
      console.log(val);
      if (min > val)
        min = val;
      if (max < val)
        max = val;
    }
  }
  console.log('min: ' + min + ' max: ' + max);
  
  var width = 400;
  var height = 300;

  // Create one canvas for each row
  for (var row = 0; row < count; row++) {
      
      // canvas function
      c[row] = function(p) {
        // this setup functions is for each individual canvas
        p.setup = function() {
          p.createCanvas(width, height);
          p.rect(0, 0, width-1, height-1);
          p.text(data.getString(row, 0), 10, 20);
          p.beginShape();
          for (var col = 3; col < 26; col++) {
            var val = float(data.getString(row, col));
            p.vertex(map(col, 3, 25, 0, width), map(val, min, max, height, 0));
            p.ellipse(map(col, 3, 25, 0, width), map(val, min, max, height, 0), 5, 5)
          }
          p.endShape();
        }
      };
      
    // start canvas
    var canvas1 = new p5(c[row]);
  }
}

