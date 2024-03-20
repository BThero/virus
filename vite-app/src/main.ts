import "./style.css";
import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};

new p5(sketch);
