import * as lb2d from './lib2d.js';
import * as phys from './lib2d-phys.js';


/** Interface ParticleExtended
 * @typedef {object} ParticleExtended
 * @property {number} lifespan
 */

/** Interface ShapeParticle
 * @typedef {phys.Shape & ParticleExtended} ShapeParticle
 */

class Particle extends phys.Box{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    constructor(x,y,w,h) {
      super (x,y,w,h)
      this.lifespan = 0;
    }
  
    display() {
      let g = lb2d.color_g + this.lifespan < lb2d.color_r ? lb2d.color_r : lb2d.color_g + this.lifespan
      let b = lb2d.color_b + this.lifespan < lb2d.color_r ? lb2d.color_r : lb2d.color_b + this.lifespan  
      lb2d.push();
      lb2d.strokeColor(lb2d.color_r, g, b);
      super.display();
      lb2d.pop();
    }

    update() {
      super.update();
      this.lifespan -= 0.5;
    }
  }
  


// Öffentliche Variablen definieren
let /**@type {ShapeParticle[]}*/ shapes;
let /**@type {function}*/ checkKicking;


// Funtionen innerhalb main.js
function createShapes() {
  if (lb2d.isMouseUp()) {
    shapes.push(new Particle(lb2d.mouseX+30, lb2d.mouseY, 20, 20));
  }
}


// Initialisierung 
function start() {    
    shapes = [];
    checkKicking = phys.createKicking();
    
    shapes.push(new Particle(20, 450, 700, 40));
    shapes[0].mass = Infinity; shapes[0].inertia = Infinity;
    shapes[0].rotate(0.2);
    lb2d.init(800, 500);
    lb2d.strokeWidth(1.5);
    lb2d.startAnimation(draw);

}

// draw() wird von der funktion start() aufgerufen als Endlos-Schleife.
// Hier wird die Animation berechnet und gezeichnet 
function draw() {
    lb2d.background();
    createShapes();
    //checkKicking(shapes);
    phys.checkCollision(shapes);
    phys.applyGravity(shapes);
    //phys.applyFriction(shapes);
    //phys.applyDragforce(shapes);
    phys.update(shapes);
}

// Programmstart
start();