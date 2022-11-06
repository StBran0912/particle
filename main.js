import * as lb2d from './lib2d.js';
import * as phys from './lib2d-phys.js';


/** Interface ParticleExtended
 * @typedef {object} ParticleExtended
 * @property {number} lifespan
 * @property {() => boolean} isDead
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
      super (x,y,w,h);
      this.lifespan = 0;
      this.velocity = lb2d.VectorRandom2D();
      this.velocity.mult(2);
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
      this.lifespan -= 0.4;
    }

    isDead() {
      if (this.lifespan < -50) {
        return true;
      } else {
        return false;
      }
    }
  }
  


// Öffentliche Variablen definieren
let /**@type {ShapeParticle[]}*/ shapes;

// Funtionen innerhalb main.js
function createShapes() {
  shapes.push(new Particle(lb2d.mouseX+30, lb2d.mouseY, 7, 7));
}


// Initialisierung 
function start() {    
    shapes = [];
    lb2d.init(800, 500);
    lb2d.strokeWidth(1.5);
    lb2d.startAnimation(draw);

}

// draw() wird von der funktion start() aufgerufen als Endlos-Schleife.
// Hier wird die Animation berechnet und gezeichnet 
function draw() {
    lb2d.background();
    createShapes();
    phys.checkCollision(shapes);
    phys.applyGravity(shapes);
    phys.update(shapes);

    // Looping through backwards to delete
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].isDead()) {
        //remove the particle
        shapes.splice(i, 1);
      }
    }

}

// Programmstart
start();