import p5 from "p5";
import { drawHead } from "./head";
import { drawBody } from "./body";
import { drawLegs } from "./legs";

export const drawVirus = (
  p: p5,
  start: p5.Vector,
  scale: number,
  isInteractive: boolean = false
) => {
  p.push();
  p.translate(start.x, start.y);
  p.scale(scale);
  p.noFill();
  p.stroke("yellow");
  p.strokeWeight(1);

  const headBottom = drawHead(p, p.createVector(0, 0));
  const bodyBottom = drawBody(p, headBottom);
  drawLegs(p, bodyBottom, isInteractive);

  p.pop();
};
