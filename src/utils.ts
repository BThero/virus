// [min, max)
export function randomInt(
  min: number,
  max: number,
  inclusive?: boolean
): number {
  return (
    min + Math.floor(Math.random() * (max - min + 1 + (inclusive ? 1 : 0)))
  );
}

export function skewedRandom(min: number, max: number, w: number): number {
  let res = Math.random(); // [0, 1)

  if (w < 0) {
    for (let i = 0; i < -w; i++) {
      res = Math.min(res, Math.random());
    }
  } else {
    for (let i = 0; i < w; i++) {
      res = Math.max(res, Math.random());
    }
  }

  return min + res * (max - min);
}
