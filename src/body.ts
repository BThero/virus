import p5 from "p5";
import { config as headConfig } from "./head";

const config = {
  scale: 0.2,
  neckHeight: 10,
  stretch: 5,
  midHeight: 80,
  diskExpansion: 20,
  diskWidth: 30,
  diskHeight: 20,
};

export function drawBody(p: p5, start: p5.Vector): p5.Vector[] {
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
  p.fill("yellow");
  p.noStroke();
  p.ellipse(0, point.y, point.x * 2, diskExpansion);

  point.x += diskExpansion;

  p.beginShape();
  p.noFill();
  p.stroke("yellow");
  p.strokeWeight(5);

  const bottomVertices: p5.Vector[] = [];

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * p.TWO_PI;
    const newPoint = p.createVector(0, point.y);

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    newPoint.x += config.diskWidth * cos;
    newPoint.y += sin * config.diskHeight * (sin > 0 ? 1 : 0.8);
    bottomVertices.push(newPoint.copy().add(start));
    p.vertex(newPoint.x, newPoint.y);
  }

  p.endShape(p.CLOSE);

  p.pop();

  return bottomVertices;
}
