// Updated map() function for p5.js that supports all kinds of easing! Be sure to import this file in your index.html file for this to work

// Via Manohar Vanga with a slight mod by me
// https://sighack.com/post/easing-functions-in-processing
// https://github.com/sighack/easing-functions

// map2() function supports the following easing types

export const Easings = {
  LINEAR: 0,
  QUADRATIC: 1,
  CUBIC: 2,
  QUARTIC: 3,
  QUINTIC: 4,
  SINUSOIDAL: 5,
  EXPONENTIAL: 6,
  CIRCULAR: 7,
  SQRT: 8,
};

// when the easing is applied (start, end, or both)
export const When = {
  IN: 0,
  OUT: 1,
  BOTH: 2,
};

// a map() replacement that allows for specifying easing curves
// with arbitrary exponents
export function mapWithEasing(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  type: number,
  when: number
) {
  let b = start2;
  let c = stop2 - start2;
  let t = value - start1;
  let d = stop1 - start1;
  let p = 0.5;

  switch (type) {
    case Easings.LINEAR:
      return (c * t) / d + b;

    case Easings.SQRT:
      if (when === When.IN) {
        t /= d;
        return c * Math.pow(t, p) + b;
      } else if (when === When.OUT) {
        t /= d;
        return c * (1 - Math.pow(1 - t, p)) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * Math.pow(t, p) + b;
        return (c / 2) * (2 - Math.pow(2 - t, p)) + b;
      }
      break;

    case Easings.QUADRATIC:
      if (when === When.IN) {
        t /= d;
        return c * t * t + b;
      } else if (when === When.OUT) {
        t /= d;
        return -c * t * (t - 2) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }
      break;

    case Easings.CUBIC:
      if (when === When.IN) {
        t /= d;
        return c * t * t * t + b;
      } else if (when === When.OUT) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      }
      break;

    case Easings.QUARTIC:
      if (when === When.IN) {
        t /= d;
        return c * t * t * t * t + b;
      } else if (when === When.OUT) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t + b;
        t -= 2;
        return (-c / 2) * (t * t * t * t - 2) + b;
      }
      break;

    case Easings.QUINTIC:
      if (when === When.IN) {
        t /= d;
        return c * t * t * t * t * t + b;
      } else if (when === When.OUT) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t * t * t + 2) + b;
      }
      break;

    case Easings.SINUSOIDAL:
      if (when === When.IN) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
      } else if (when === When.OUT) {
        return c * Math.sin((t / d) * (Math.PI / 2)) + b;
      } else if (when === When.BOTH) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
      }
      break;

    case Easings.EXPONENTIAL:
      if (when === When.IN) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
      } else if (when === When.OUT) {
        return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
      }
      break;

    case Easings.CIRCULAR:
      if (when === When.IN) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
      } else if (when === When.OUT) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
      } else if (when === When.BOTH) {
        t /= d / 2;
        if (t < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return (c / 2) * (Math.sqrt(1 - t * t) + 1) + b;
      }
      break;
  }

  return 0;
}
