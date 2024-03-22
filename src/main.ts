import "./style.css";
import p5 from "p5";

import { drawHead, config as headConfig } from "./head";
import { drawBody } from "./body";
import { Bone } from "./bone";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
  };

  p.draw = () => {
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.background("black");
    p.noFill();
    p.stroke("yellow");
    p.strokeWeight(1);

    const headBottom = drawHead(
      p,
      p.createVector(0, -headConfig.heightMid / 2 - headConfig.heightTop)
    );
    const bodyBottom = drawBody(p, headBottom);

    for (const anchor of bodyBottom) {
      let chain = new Bone(
        anchor.x,
        anchor.y,
        p.HALF_PI,
        50,
        new Bone(50, 0, 0, 50)
      );

      for (let i = 0; i < 10; i++) {
        chain.updateIK([p.mouseX - p.width / 2, p.mouseY - p.height / 2]);
      }
      chain.draw(p);
    }

    p.pop();
  };
};

new p5(sketch);
