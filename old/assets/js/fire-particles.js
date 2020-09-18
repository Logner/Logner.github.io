let particles = [];

function setup(){
    createCanvas (windowWidth, windowHeight);
}

class Particle{
    constructor() {
        
        this.x = random(0, windowWidth);
        this.y = windowHeight-65;
        
        this.vx = random(-5, 5);
        this.vy = random(-5,-10);
        
        this.ax = 0;
        this.ay = random(40, 30);
        
        this.alpha = 255;
        this.time = 0;
        
        this.r = 255;
        this.g = 255;
    }
    
    update(){
        
        // Kinematic equations + randomness
        
        this.x += this.vx*this.time + 0.5*(this.ax-random(-1,1))*this.time*this.time;
        this.y += this.vy*this.time + 0.5*(this.ay)*this.time*this.time;
        
        this.g -= 0.5;
        this.alpha -= 0.5;
        this.time+=0.001;
    }
    
    finished () {
        
        //removal condition (must be bool, if true particle will be removed)
        
        return this.alpha < 0;
    }
    
    show() {
        
        //shape
        noStroke();
        fill(this.r, this.g, 0, this.alpha);
        ellipse(this.x, this.y, 16);
    }
}

function windowResized(){
    createCanvas (windowWidth, windowHeight);
}

function draw(){
    background(0);
    textSize(16);

    //particle generation
    for (let i = 0; i < 20; i++) {
        p = new Particle();    
        
    }
    particles.push(p);
    // particle rendering
    for (let i = particles.length-1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) 
        {
            //remove the particle 
            particles.splice(i, 1);
        } 
    }
}


