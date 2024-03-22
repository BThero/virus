import "./style.css";
import p5 from "p5";

import { drawHead, config as headConfig } from "./head";
import { drawBody } from "./body";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screen.width, screen.height);
  };

  p.draw = () => {
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
      p.line(anchor.x, anchor.y, anchor.x, anchor.y + 100);
    }
  };
};

new p5(sketch);
