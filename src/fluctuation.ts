export class Fluctuation {
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
