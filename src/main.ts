import "./style.css";
import p5 from "p5";

import { drawHead, config as headConfig } from "./head";
import { drawBody } from "./body";
import { drawLegs } from "./legs";

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
    drawLegs(p, bodyBottom);

    p.pop();
  };
};

new p5(sketch);
