
// this table will contain the numbers and actual data
var table;
var keyRow, metaRow;


// this is an array that will contain all the data in form of javascript objects
var states = [];

//this is a simple div which will contain info about a state
var textFieldState, textFieldStateTitle, textFieldPopulationTitle,textFieldPopulation;




function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/ACS_15_5YR_S2401_with_ann_Clean.csv", "csv");
}

function setup() {  
   noCanvas();
   parseData();
   createDropDown();
   createInfoPanel();
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

// create a dropdown menu that contains all the states
// when clicking one of the states in the dropdown menu, the function "setInfoField()" gets executed
function createDropDown(){


  // go through the "states" array we created earlier
  for(var i=0; i<states.length;i++){
    
    // create an <a> html element for each state name
    var text = createA("#", states[i].name);
    
    // attach the a element to the "dropdown-content" element
    text.parent("#dropdown-content");

    // attach a mouse event to the element to execute a function when it is clicked
    text.mouseClicked(
        function(){
          //get the state name from the html element
          var stateName = this.html();
          
          //execute the "setInfoField function and pass the stateName as a variable"
          setInfoPanel(stateName);
        }
      )
  }
}

// create an info panel to display information about each state
function createInfoPanel(){

  // title for state
  textFieldStateTitle = createDiv("<b>State</b>");
  textFieldStateTitle.position(200,20); 

  textFieldState = createDiv("Info about the state");
  textFieldState.position(200,40); 

  // title for population
  textFieldPopulationeTitle = createDiv("<b>Population</b>");
  textFieldPopulationeTitle.position(200,100); 

  textFieldPopulation = createDiv("Population number here");
  textFieldPopulation.position(200,120); 
}


// update the info field
function setInfoPanel(stateName){

  // write the name
  textFieldState.html(stateName);
  
  // get the population data
  var population = getDataByStateName(stateName, "HC01_EST_VC01");
  
  // get the population data
  textFieldPopulation.html(population);
}


// small helper function to retrieve a data variable if you know the state name
function getDataByStateName(stateName, variable){
  for(var i=0;i<states.length;i++){
    if(states[i].name==stateName){
      return states[i][variable];
      
    }
  }
}


