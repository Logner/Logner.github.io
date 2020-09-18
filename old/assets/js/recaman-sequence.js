let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;
let tgl = 1;

let arcs = [];
var canvas;

class Arc {
    constructor(start, end, dir){
        this.start = start;
        this.end = end;
        this.dir = dir;
    }
    
    show() {    
    let diameter = this.end - this.start;
    let midpt = (this.end + this.start)/2;
    stroke(255);
    strokeWeight(0.5);
    noFill();
    if (this.dir == 0) {
            arc(midpt, 0, diameter, diameter, PI, 0);
    } else {
            arc(midpt, 0, diameter, diameter, 0, PI)
    }    
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
    frameSlider.position(windowWidth-140, 50);
    resetbutton.position(windowWidth-70, 5);
    togglebutton.position(windowWidth-70, 30);
    text("Speed", windowWidth - 190, 60);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    
    numbers[index] = true;
    sequence.push(index);
    textSize(15);
    
    // Frame rate adjustment
    frameSlider = createSlider(5, 60, 15, 5);
    frameSlider.position(windowWidth-140, 50);
    
    //Reset Button
    resetbutton = createButton('Reset');
    resetbutton.position(windowWidth-70, 5);
    resetbutton.mousePressed(reset);
    
    //Overlay Button
    togglebutton = createButton('Overlay');
    togglebutton.position(windowWidth-70, 30);
    togglebutton.mousePressed(toggle);
}

function step(){
    let next = index - count;
    if (next < 0 || numbers[next]){
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);
    
    let a = new Arc(index, next, count%2)
    arcs.push(a);

    index = next;
    count++;
}

function reset(){
    numbers = [true];
    count = 1;
    sequence = [];
    index = 0;
    arcs = [];  
}

function toggle(){
    if (tgl == 0){canvas.style('z-index', '-1'); tgl = 1;}
    else{canvas.style('z-index', '0'); tgl = 0;}
}

function draw() {
    background (0);
    fill(255);
    text("Speed", windowWidth - 190, 60);
    text("Current count: " + String(count), 0, 15);
    text("Current number in Recaman Sequence: " + String(index), 0, 30);   
    text("Largest number so far: " + String(numbers.length-1), 0, 45);
    translate(0, height/2);
    scale (windowWidth/numbers.length);
    step();
    
    var frate = frameSlider.value()
    frameRate(frate);
    
    for (let a of arcs) {
        a.show();
    }
}