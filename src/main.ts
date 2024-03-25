import "./style.css";
import p5 from "p5";

import { drawVirus } from "./virus";
import { Particle } from "./particle";

const sketch = (p: p5) => {
  let particles: Particle[] = [];

  function createParticle() {
    const pos = p.createVector(p.random(p.width), p.random(p.height));
    const scale = p.random(0.01, 0.1);
    return new Particle(pos, scale);
  }

  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
    p.background(0);

    for (let i = 0; i < 1000; i++) {
      particles.push(createParticle());
    }

    p.frameRate(24);
  };

  p.draw = () => {
    p.background(0);
    drawVirus(p, p.createVector(0.5 * p.width, 0.4 * p.height), 1, true);

    for (const particle of particles) {
      particle.draw(p);
      particle.move();
    }
  };
};

new p5(sketch);
