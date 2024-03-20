import "./style.css";
import p5 from "p5";

const head = {
  width: 50,
  height: 25,
  heightMid: 100,
  scale: 0.8,
  vec: { x: 5, y: 2 },
};

function drawHead(p: p5) {
  p.push();

  const { width, height, heightMid, scale } = head;
  p.translate(0, -heightMid / 2 - height);

  const vec = p.createVector(head.vec.x, head.vec.y).normalize();

  p.beginShape(p.TRIANGLES);

  let tmp = height + vec.copy().mult((1 - scale) * width).y;

  // Top part

  p.vertex(0, 0);
  p.vertex(-width, height);
  p.vertex(-width * scale, tmp);

  p.vertex(0, 0);
  p.vertex(-width * scale, tmp);
  p.vertex(width * scale, tmp);

  p.vertex(0, 0);
  p.vertex(width, height);
  p.vertex(width * scale, tmp);

  // Middle part

  // console.log(vec.copy().mult(width).y);
  const tmp2 = height + heightMid + vec.copy().mult(width / 2).y;

  p.vertex(-width, height);
  p.vertex(-width, height + heightMid);
  p.vertex(-width * scale, tmp);

  p.vertex(-width, height + heightMid);
  p.vertex(-width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(-width * scale, tmp);
  p.vertex(width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(width, height + heightMid);
  p.vertex(width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(width, height);
  p.vertex(width, height + heightMid);
  p.vertex(width * scale, tmp);

  // Bottom part

  p.vertex(-width, height + heightMid);
  p.vertex(0, tmp2);
  p.vertex(0, tmp2 + height / 2);

  p.vertex(width, height + heightMid);
  p.vertex(0, tmp2);
  p.vertex(0, tmp2 + height / 2);

  p.endShape();

  p.pop();
}

function drawBody(p: p5) {
  const vec = p.createVector(head.vec.x, head.vec.y).normalize();
  const tmp2 = head.height + head.heightMid + vec.copy().mult(head.width / 2).y;

  const headLowLeft = [-head.width, head.height + head.heightMid];
  const headLowRight = [head.width, head.height + head.heightMid];
  const headLowMid = [0, tmp2 + head.height / 2];
  const directionVector = p
    .createVector(headLowMid[0], headLowMid[1])
    .sub(p.createVector(headLowLeft[0], headLowLeft[1]))
    .normalize();

  p.push();
  p.fill("yellow");

  p.beginShape();
  p.translate(0, -head.heightMid / 2 - head.height);
  p.translate(0, headLowMid[1]);

  const scale = 0.2;
  const neckHeight = 10;
  const stretch = 5;
  const midHeight = 80;

  let point = p.createVector(
    head.width * scale,
    -(directionVector.y * head.width * scale) / Math.abs(directionVector.x)
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

  const diskExpansion = 20;
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
}

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
    // p.ellipse(0, 0, 50);
    drawHead(p);
    drawBody(p);
  };
};

new p5(sketch);
