import p5 from "p5";

type Vec2 = [number, number];

function rotatePoint(point: Vec2, angle: number): Vec2 {
  const [x, y] = point;
  return [
    x * Math.cos(angle) - y * Math.sin(angle),
    x * Math.sin(angle) + y * Math.cos(angle),
  ];
}

function translatePoint(point: Vec2, h: number, v: number): Vec2 {
  const [x, y] = point;
  return [x + h, y + v];
}

function angle(point: Vec2): number {
  const [x, y] = point;
  return Math.atan2(y, x);
}

export class Bone {
  x: number;
  y: number;
  angle: number;
  length: number;
  child?: Bone | null;

  constructor(
    x: number,
    y: number,
    angle: number,
    length: number,
    child?: Bone | null
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.child = child;
  }

  draw(p: p5) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.angle);
    p.strokeWeight(5);

    p.stroke("yellow");
    p.line(0, 0, this.length, 0);
    this.child && this.child.draw(p);
    p.pop();
  }

  // takes in: a target point in the parent coordinate space
  // returns:  the endpoint of the chain, in that same parent
  //           coordinate space
  updateIK(target: Vec2): Vec2 {
    // convert from parent to local coordinates
    const localTarget = rotatePoint(
      translatePoint(target, -this.x, -this.y),
      -this.angle
    );

    let endPoint: Vec2;
    if (this.child) {
      endPoint = this.child.updateIK(localTarget);
    } else {
      // base case:  the end point is the end of the current bone
      endPoint = [this.length, 0];
    }

    // point towards the endpoint
    const shiftAngle = angle(localTarget) - angle(endPoint);
    this.angle += shiftAngle;

    // convert back to parent coordinate space
    return translatePoint(rotatePoint(endPoint, this.angle), this.x, this.y);
  }
}
