import "./style.css";
import p5 from "p5";

import { drawVirus } from "./virus";
import { Particle } from "./particle";
import { Fluctuation } from "./fluctuation";
import { skewedRandom } from "./utils";
import { Easings, When, mapWithEasing } from "./easing";

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
  let isPosterMode: boolean = false;
  let lastOffset: p5.Vector;
  let posterOpacity = 0;

  let hakenImage: p5.Image;
  let renderer: p5.Renderer;

  function createParticle() {
    const pos = p.createVector(p.random(p.width), p.random(p.height));
    const scale = p.random(0.01, 0.1);
    return new Particle(pos, scale);
  }

  p.preload = () => {
    hakenImage = p.loadImage(
      "src/assets/haken-logo-white.png",
      () => {
        console.log("success");
      },
      (event) => {
        console.error("failure", event);
      }
    );
  };

  p.setup = () => {
    renderer = p.createCanvas(screen.width, screen.height);
    p.background(0);

    for (let i = 0; i < 1000; i++) {
      particles.push(createParticle());
    }

    virusRotation = createFluctuatingValue(new Fluctuation(0, 1, 10), 0, 0.001);
    virusLegs = createFluctuatingValue(new Fluctuation(0, 1, 10), 200, 2);
    p.frameRate(24);

    lastOffset = p.createVector(0, 0);
  };

  p.draw = () => {
    p.background(0);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(virusRotation.get());
    p.translate(-p.width / 2, -p.height / 2);
    drawVirus(
      p,
      p.createVector(0.5 * p.width, 0.5 * p.height - 100),
      1,
      p.createVector(p.width / 2, virusLegs.get() + p.height / 2)
    );
    p.pop();

    const offset = isPosterMode
      ? lastOffset
      : p.createVector(
          p.map(p.mouseX, 0, p.width, -30, 30),
          p.map(p.mouseY, 0, p.height, -30, 30)
        );

    for (const particle of particles) {
      particle.draw(p, offset);
      !isPosterMode && particle.move();
    }

    !isPosterMode && virusRotation.move();
    !isPosterMode && virusLegs.move();

    if (posterOpacity > 0) {
      const color = p.color(
        255,
        255,
        0,
        mapWithEasing(posterOpacity, 0, 1, 0, 255, Easings.QUADRATIC, When.IN)
      );

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.noFill();
      p.stroke(color);
      p.strokeWeight(10);
      p.rect(-400, -400, 800, 800);

      p.tint(color);
      p.image(hakenImage, -350, -375);

      const canvas = document.querySelector("canvas");
      canvas!.style.letterSpacing = "15px";

      p.fill(color);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(40);
      p.text("VIRUS", 0, -150);

      p.pop();
    }

    if (isPosterMode) {
      posterOpacity = Math.min(1, posterOpacity + 0.1);
    } else {
      posterOpacity = Math.max(0, posterOpacity - 0.1);
    }

    lastOffset = offset;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    particles = [];

    for (let i = 0; i < 1000; i++) {
      particles.push(createParticle());
    }
  };

  p.mouseClicked = () => {
    isPosterMode = !isPosterMode;
  };
};

new p5(sketch);
