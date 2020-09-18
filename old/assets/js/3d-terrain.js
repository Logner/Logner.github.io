let scl = 20;
var cols, rows, terrain;
let flying = 0;

function create2DArray(numRows, numColumns) {
	let terrain = new Array(numRows); 
 
	for(let i = 0; i < numColumns; i++) {
		terrain[i] = new Array(numColumns); 
	}
 
	return terrain;
}

function setup(){
    w = windowWidth;
    h = windowHeight;
    
    createCanvas(w, h, WEBGL);
    
    cols = int(w/scl);
    rows = int(h/scl);  
    
    terrain = create2DArray(rows, cols);
}

function draw() {
    flying -= 0.1;
    
    yoff = flying;
        for (y = 0; y < rows; y++){
            xoff = 0;
                for (x = 0; x < cols; x++){
                    terrain[x][y] = map(noise(xoff,yoff), 0, 1, -50, 50);
                    xoff+=0.2;
                }
            yoff+=0.2;
        }
    
    background(0);
    stroke(255);
    noFill();
    
    translate (width/2, height/2);
    rotateX(1.36);

    translate(-w, -h);
    for (y = 0; y < rows-1; y++){
        beginShape(TRIANGLE_STRIP);
        for (x = 0; x < cols; x++){
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
        }
        endShape();
    }
}

function windowResized(){
    setup();
    terrain = create2DArray(rows, cols);
}