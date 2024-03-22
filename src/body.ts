import p5 from "p5";
import { config as headConfig } from "./head";

const config = {
  scale: 0.2,
  neckHeight: 10,
  stretch: 5,
  midHeight: 80,
  diskExpansion: 20,
};

export function drawBody(p: p5, start: p5.Vector): p5.Vector {
  const { scale, neckHeight, stretch, midHeight, diskExpansion } = config;

  const vec = p.createVector(headConfig.vec.x, headConfig.vec.y).normalize();
  const directionVector = p
    .createVector(
      0,
      vec.copy().mult(headConfig.width / 2).y + headConfig.heightTop / 2
    )
    .sub(p.createVector(-headConfig.width, 0))
    .normalize();

  p.push();
  p.fill("yellow");

  p.beginShape();
  p.translate(start.x, start.y);

  let point = p.createVector(
    headConfig.width * scale,
    -(directionVector.y * headConfig.width * scale) /
      Math.abs(directionVector.x)
  );

  const points = [];
  points.push(point.copy());
  point.y += neckHeight;
  points.push(point.copy());
  point.x += stretch;
  point.y += stretch;
  points.push(point.copy());
  point.y += midHeight;
  points.push(point.copy());

  for (const point of points) {
    p.vertex(point.x, point.y);
  }
  for (const point of points.reverse()) {
    p.vertex(-point.x, point.y);
  }
  p.vertex(0, 0);

  p.endShape(p.CLOSE);

  p.ellipseMode(p.CENTER);
  p.ellipse(0, point.y, point.x * 2, 20);

  point.x += diskExpansion;

  p.beginShape();
  p.noFill();
  p.stroke("yellow");
  p.strokeWeight(5);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * p.TWO_PI;
    const newPoint = p.createVector(0, point.y);
    newPoint.x += 30 * Math.cos(angle);
    newPoint.y += Math.sin(angle) * (Math.sin(angle) > 0 ? 15 : 10);
    p.vertex(newPoint.x, newPoint.y);
  }

  p.endShape(p.CLOSE);

  p.pop();

  return p.createVector(start.x, start.y + point.y);
}
