import "./style.css";
import p5 from "p5";

import { drawVirus } from "./virus";

const sketch = (p: p5) => {
  let smallViruses: {
    pos: p5.Vector;
    scale: number;
  }[] = [];

  function createSmallVirus(fromTop: boolean = false) {
    return {
      pos: p.createVector(
        p.random(p.width),
        fromTop ? 0 : p.random(p.height * 0.75)
      ),
      scale: p.random(0.01, 0.1),
    };
  }

  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
    p.background(0);

    for (let i = 0; i < 200; i++) {
      smallViruses.push(createSmallVirus());
    }

    p.frameRate(24);
  };

  p.draw = () => {
    p.background(0);
    drawViruses();

    for (let i = 0; i < smallViruses.length; i++) {
      smallViruses[i].pos.y += 2;

      if (smallViruses[i].pos.y > 0.9 * p.height) {
        smallViruses[i] = createSmallVirus(true);
      }
    }
  };

  function drawViruses() {
    drawVirus(p, p.createVector(0.5 * p.width, 0.4 * p.height), 1, true);

    for (const virus of smallViruses) {
      drawVirus(p, virus.pos, virus.scale);
    }
  }
};

new p5(sketch);
