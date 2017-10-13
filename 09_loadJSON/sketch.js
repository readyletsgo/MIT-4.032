function setup() {
    createCanvas(windowWidth, windowHeight);
    // load external data source and callback
    loadJSON('colors.json', showData);
    textAlign(CENTER);
}

function showData(data) {
    fill(data.yellow);
    text(data.yellow, width/2, height/2);
}