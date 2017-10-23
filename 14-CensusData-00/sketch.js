
// this table will contain the numbers and actual data
var table;

var margin = 150;
// this is an array that will contain all the data in form of javascript objects
var states = [];

var maxValueTotal =0;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/ACS_15_5YR_S2401_with_ann_Clean.csv", "csv");
}

function setup() {  
  var canvas = createCanvas(900,600);  
  canvas.position(20,20);
  parseData();
  findMaxValueTotal();
  createGraph("Alabama");
}

function parseData(){
   //this is the key at the top, we will need it later
   var keyRow = table.getRow(0);
   var metaRow = table.getRow(1);

    // cycle through each item in that column, ignoring the first two items which are the headers
    for(var i=2;i<table.getRowCount(); i++){    

      //get each row for each id, hence the data for one state at a time
      var stateRow = table.getRow(i);

      // create an empty object for each state
      // we will attach all the information to this object
      var state = {};
      state.id = stateRow.getString(0);
      state.id2 = stateRow.getString(1);
      state.name = stateRow.getString(2);

      // this array will hold all occupation data
      state.occupations = [];
      
      for(var j=3; j<table.getColumnCount(); j++){
        // create an empty object that holds the occupation data for one category
        var item = {};
        item.label = metaRow.getString(j);
        item.key = keyRow.getString(j);
        item.value = stateRow.getNum(j);
        
        // attach the item object to the "occupation" array
        append(state.occupations, item);
      }
      // attach the state object to the "states" array
      append(states, state);
   }
}



function createGraph(name){
  
  var state = findStateByName(name);
  console.log(state);
  
  // first let's find the highest value for this state
  var maxValue =0;

  for(var i=1; i<state.occupations.length; i++){
    if(state.occupations[i].value>maxValue)
      maxValue = state.occupations[i].value;
  }

  console.log("maxValue: " + maxValue);

  // now draw the bars and the labels
  background(245);
  noStroke();
  textAlign(LEFT);
  textSize(16);

  text("Occupation distribution for " + state.name, margin,margin-20);  

  textSize(8);

  for(var i=1; i<state.occupations.length; i++){
    // draw the bars
    fill(120);
    var x = map(i,1, state.occupations.length-1, margin+10, width-margin);
    var y = map(state.occupations[i].value,0, maxValue, height-margin, margin);
    var h = map(state.occupations[i].value,0, maxValue, 0, height-(margin*2));
    rect(x,y,10, h);

     // add the labels
    fill(0);
    push();
    translate(x+5,height-margin+10);
    rotate(PI/5.0);
    text(state.occupations[i].label,0,0 );
    pop();

  }
  // add labels to the y axis
  stroke(0);
  line(margin, margin, margin, height-margin);
  noStroke();
  textAlign(RIGHT);
  textStyle(NORMAL);
  var increment = maxValue/5;
  increment = Math.round(increment/500)*500;
  for(var i=0; i<maxValue; i+=increment){
    var xLabel = margin-10;
    var yLabel = map(i,0, maxValue,height-margin, margin);
    noStroke();
    fill(0);
    text(i, xLabel, yLabel+5);
    stroke(0);
    line(xLabel+5,yLabel,xLabel+10,yLabel);
  }
}


function findMaxValueTotal(){
  for(var i=0; i<states.length;i++){
    for(var j=1;j<states[i].occupations.length; j++){
      if(states[i].occupations[j].value>maxValueTotal){
        maxValueTotal = states[i].occupations[j].value;
      }
    }
  }
}

// helper function to find a state by name
function findStateByName(name){
  var state;
  for(var i=0; i<states.length; i++){
    if(states[i].name == name){
      state = states[i];
      return state;
    }
  }
}

