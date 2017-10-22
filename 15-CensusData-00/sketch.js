
// this table will contain the numbers and actual data
var table;
var keyRow, metaRow;

var keyTotalPopulation = "HC01_EST_VC01";

var margin = 100;
// this is an array that will contain all the data in form of javascript objects
var states = [];

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/ACS_15_5YR_S2401_with_ann_Clean.csv", "csv");
}

function setup() {  
  var canvas = createCanvas(900,600);  
  canvas.position(20,20);
  parseData();
  createGraph();
}


function parseData(){
   //this is the key at the top, we will want it later
   keyRow = table.getRow(0);
   metaRow = table.getRow(1);


    // cycle through each item in that column, ignoring the first two items which are the headers
    for(var i=2;i<table.getRowCount(); i++){    

      //get each row for each id, hence the data for one state at a time
      var stateRow = table.getRow(i);

      // create an empty object for each state
      // we will attach all the information to this object
      var state = {};

      // cycle through all variables and attach all the variables to it
      for(var j=0; j<table.getColumnCount(); j++){
        state[keyRow.getString(j)] = stateRow.getString(j);
      }
      append(states, state);
   }
}




function createGraph(){
  background(220);
  
  // only take one state

  // var stateNow = states[0];
  // text(stateNow.name, 30,30);
  // var xPos = 20;
  // var yPos = 20;

  var rowNow = table.getRow(2);
  var name = rowNow.getString(2);
  text(name, margin,margin);

  var maxValue = rowNow.getNum(3);

  
  var add = 0;

  var maxValue =0; 
  // first let's find the highest value
  for(var i=4;i<table.getColumnCount(); i++){
    if(rowNow.getNum(i)>maxValue)
      maxValue =rowNow.getNum(i)
  }
    console.log("maxValue is: "+ maxValue);

    noStroke();
    textSize(8);

  for(var i=4;i<table.getColumnCount(); i++){
    // console.log(rowNow.getNum(i));    
    fill(140);

    add+=rowNow.getNum(i);
    var x = map(i,4, table.getColumnCount()-1, margin, width-margin);
    var y = map(rowNow.getNum(i),0, maxValue, height-margin, margin);
    var h = map(rowNow.getNum(i),0, maxValue, 0, height-(margin*2));
    rect(x,y,10, h);

    fill(0);
    push();
    translate(x,height-margin+10);
    rotate(PI/5.0);
    // rect(-26, -26, 52, 52);
    text(keyRow.getString(i),0,0 );
    pop();
  }
}
