function setup() {
    createCanvas(windowWidth, windowHeight);
    // load external data source and callback
    loadTable('groceries.tsv', 'tsv', 'header', showData);
    textAlign(CENTER);
}

function showData(data) {
    var count = data.getRowCount();
    var rowHeight = height/count;
    
    for (var i=0; i<count; i++) {
        var amount = data.getString(i, 0);
        var unit = data.getString(i, 1);
        var item = data.getString(i, 2);
        var source = data.getString(i, 3)
        
        if (source === 'market')
            fill(0, 255, 0);
        else {
            fill(128);
        }
            
        text(amount + ' ' + unit + ' ' + item + ' - ' + source, width/2, rowHeight * (i + 1));
    }
}