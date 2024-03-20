import "./style.css";
import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screen.width, screen.height, p.WEBGL);
    p.normalMaterial();
  };

  p.draw = () => {
    p.background(0);
    p.orbitControl();

    p.fill(255);
    p.push();
    p.translate(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
    p.sphere(80);
    p.pop();
  };
};

new p5(sketch);
