import "./style.css";
import p5 from "p5";

import { drawVirus } from "./virus";
import { Particle } from "./particle";
import { Fluctuation } from "./fluctuation";
import { skewedRandom } from "./utils";

const sketch = (p: p5) => {
  let particles: Particle[] = [];
  let virusFluctuation: Fluctuation;
  let virusRotation = 0;

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

    virusFluctuation = new Fluctuation(0, 1, 10);
    p.frameRate(24);
  };

  p.draw = () => {
    p.background(0);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(virusRotation);
    virusRotation += skewedRandom(-0.001, 0.001, virusFluctuation.factor);
    virusFluctuation.move();
    p.translate(-p.width / 2, -p.height / 2);
    drawVirus(p, p.createVector(0.5 * p.width, 0.4 * p.height), 1, true);
    p.pop();

    const offset = p.createVector(
      p.map(p.mouseX, 0, p.width, -30, 30),
      p.map(p.mouseY, 0, p.height, -30, 30)
    );

    for (const particle of particles) {
      particle.draw(p, offset);
      particle.move();
    }
  };
};

new p5(sketch);
