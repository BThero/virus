import p5 from "p5";

export const config = {
  width: 50,
  heightTop: 25,
  heightMid: 100,
  scale: 0.8,
  vec: { x: 5, y: 2 },
};

export function drawHead(p: p5, start: p5.Vector): p5.Vector {
  p.push();

  const { width, heightTop, heightMid, scale } = config;
  p.translate(start.x, start.y);

  const vec = p.createVector(config.vec.x, config.vec.y).normalize();

  p.beginShape(p.TRIANGLES);

  const tmp = heightTop + vec.copy().mult((1 - scale) * width).y;

  // Top part

  p.vertex(0, 0);
  p.vertex(-width, heightTop);
  p.vertex(-width * scale, tmp);

  p.vertex(0, 0);
  p.vertex(-width * scale, tmp);
  p.vertex(width * scale, tmp);

  p.vertex(0, 0);
  p.vertex(width, heightTop);
  p.vertex(width * scale, tmp);

  // Middle part

  // console.log(vec.copy().mult(width).y);
  const tmp2 = heightTop + heightMid + vec.copy().mult(width / 2).y;

  p.vertex(-width, heightTop);
  p.vertex(-width, heightTop + heightMid);
  p.vertex(-width * scale, tmp);

  p.vertex(-width, heightTop + heightMid);
  p.vertex(-width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(-width * scale, tmp);
  p.vertex(width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(width, heightTop + heightMid);
  p.vertex(width * scale, tmp);
  p.vertex(0, tmp2);

  p.vertex(width, heightTop);
  p.vertex(width, heightTop + heightMid);
  p.vertex(width * scale, tmp);

  // Bottom part

  p.vertex(-width, heightTop + heightMid);
  p.vertex(0, tmp2);
  p.vertex(0, tmp2 + heightTop / 2);

  p.vertex(width, heightTop + heightMid);
  p.vertex(0, tmp2);
  p.vertex(0, tmp2 + heightTop / 2);

  p.endShape();

  p.pop();

  return p.createVector(start.x, start.y + tmp2 + config.heightTop / 2);
}
