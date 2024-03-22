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

    for (const [index, anchor] of bodyBottom.entries()) {
      const angle = (index / 6) * p.TWO_PI;
      let secondJoint = new Bone(50, 0, 0, 50);
      let firstJoint = new Bone(anchor.x, anchor.y, angle, 50, secondJoint);

      const tarX = p.mouseX - p.width / 2 + anchor.x * 20;
      const tarY = p.mouseY - p.height / 2 + anchor.y * 20;

      for (let i = 0; i < 3; i++) {
        secondJoint.updateIK([tarX, tarY]);
      }

      for (let i = 0; i < 2; i++) {
        firstJoint.updateIK([tarX, tarY]);
      }

      firstJoint.draw(p);
    }

    p.pop();
  };
};

new p5(sketch);
