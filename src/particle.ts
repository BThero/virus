import p5 from "p5";
import { randomInt, skewedRandom } from "./utils";

class Fluctuation {
  factor: number;
  direction: number;
  limit: number;

  constructor(factor: number, direction: number, limit: number) {
    this.factor = factor;
    this.direction = direction;
    this.limit = limit;
  }

  move() {
    this.factor += Math.random() * this.direction;

    if (this.factor >= this.limit) {
      this.direction = -1;
      this.factor = this.limit;
    }

    if (this.factor <= -this.limit) {
      this.direction = 1;
      this.factor = -this.limit;
    }
  }
}

export class Particle {
  pos: p5.Vector;
  scale: number;
  fluctuationX: Fluctuation;
  fluctuationY: Fluctuation;

  constructor(pos: p5.Vector, scale: number) {
    this.pos = pos;
    this.scale = scale;

    this.fluctuationX = new Fluctuation(
      0,
      randomInt(0, 1, true) == 1 ? 1 : -1,
      randomInt(5, 20)
    );
    this.fluctuationY = new Fluctuation(
      0,
      randomInt(0, 1, true) == 1 ? 1 : -1,
      randomInt(5, 20)
    );
  }

  draw(p: p5, offset: p5.Vector) {
    p.push();
    p.noStroke();
    p.fill("yellow");
    p.translate(this.pos.x, this.pos.y);
    p.translate(offset.x, offset.y);
    p.ellipseMode(p.CENTER);
    p.circle(0, 0, this.scale * 20);
    p.pop();
  }

  move() {
    this.pos.x += skewedRandom(-1, 1, this.fluctuationX.factor);
    this.pos.y += skewedRandom(-1, 1, this.fluctuationY.factor);
    this.fluctuationX.move();
    this.fluctuationY.move();
  }
}
