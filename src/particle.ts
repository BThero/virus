import p5 from "p5";
import { randomInt, skewedRandom } from "./utils";
import { Fluctuation } from "./fluctuation";

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
