import "./style.css";
import p5 from "p5";

import { drawVirus } from "./virus";
import { Particle } from "./particle";
import { Fluctuation } from "./fluctuation";
import { skewedRandom } from "./utils";

const createFluctuatingValue = (
  fluctation: Fluctuation,
  value: number,
  scale: number
) => {
  return {
    get: () => value,
    move: () => {
      value += skewedRandom(-1, 1, fluctation.factor) * scale;
      fluctation.move();
    },
  };
};

type FluctuatingValue = ReturnType<typeof createFluctuatingValue>;

const sketch = (p: p5) => {
  let particles: Particle[] = [];
  let virusRotation: FluctuatingValue;
  let virusLegs: FluctuatingValue;

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

    virusRotation = createFluctuatingValue(new Fluctuation(0, 1, 10), 0, 0.001);
    virusLegs = createFluctuatingValue(new Fluctuation(0, 1, 10), 200, 2);
    p.frameRate(24);
  };

  p.draw = () => {
    p.background(0);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(virusRotation.get());
    p.translate(-p.width / 2, -p.height / 2);
    drawVirus(
      p,
      p.createVector(0.5 * p.width, 0.5 * p.height - 200),
      1,
      p.createVector(p.width / 2, virusLegs.get() + p.height / 2)
    );
    p.pop();

    const offset = p.createVector(
      p.map(p.mouseX, 0, p.width, -30, 30),
      p.map(p.mouseY, 0, p.height, -30, 30)
    );

    for (const particle of particles) {
      particle.draw(p, offset);
      particle.move();
    }

    virusRotation.move();
    virusLegs.move();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    particles = [];

    for (let i = 0; i < 1000; i++) {
      particles.push(createParticle());
    }
  };
};

new p5(sketch);
