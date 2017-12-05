// This example is by http://www.joemckaystudio.com/multisketches/
// save this file as sketch.js
// Sketch One
var settings = {counter:0};

var s = function( p ) { // p could be any variable name
  var x = 100; 
  var y = 100;
  p.setup = function() {
    p.createCanvas(400, 200);
    // console.log(test);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);
    p.text(settings.counter, 20,20);
  };
};
var myp5 = new p5(s, 'c1');

// Sketch Two
var t = function( p ) { 
  var x = 100.0; 
  var y = 100; 
  var speed = 2.5; 
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed; 
    if(x > p.width){
      x = 0; 
      settings.counter++;
    }
    p.ellipse(x,y,50,50);
  };
};
var myp5 = new p5(t, 'c2');