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
    constructor(x, y, w, h) {
      super (x, y, w, h);
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
      this.lifespan -= 0.5;
    }

    isDead() {
      if (this.lifespan < -120) {
        return true;
      } else {
        return false;
      }
    }
  }

function createShapes() {
  particles.push(new Particle(lb2d.mouseX+30, lb2d.mouseY, 10, 10));
}

// Öffentliche Variablen definieren
let /**@type {ShapeParticle[]}*/ particles;
let /**@type {phys.Shape[]} */ walls;

// Initialisierung 
function start() {    
    particles = [];
    walls = [new phys.Wall(10, 300, 400, 10), new phys.Wall(400, 400, 200, 10) ];
    walls[0].rotate(0.4);
    walls[1].rotate(-0.4);
    lb2d.init(800, 500);
    lb2d.strokeWidth(1.5);
    lb2d.startAnimation(draw);
}

// draw() wird von der funktion start() aufgerufen als Endlos-Schleife.
// Hier wird die Animation berechnet und gezeichnet 
function draw() {
    lb2d.background();
    // Looping through backwards to delete Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].isDead()) {
        //remove the particle
        particles.splice(i, 1);
      }
    }
    createShapes();
    phys.checkCollision(particles);
    phys.checkWalls(particles, walls);
    phys.applyGravity(particles);
    phys.update(particles);
    phys.update(walls);

}

// Programmstart
start();