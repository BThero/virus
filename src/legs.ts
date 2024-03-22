import p5 from "p5";
import { Bone } from "./bone";

export function drawLegs(p: p5, anchors: p5.Vector[]) {
  const boneLength = 80;

  for (const [index, anchor] of anchors.entries()) {
    const angle = (index / 6) * p.TWO_PI;
    const secondJoint = new Bone(boneLength, 0, 0, boneLength);
    const firstJoint = new Bone(
      anchor.x,
      anchor.y,
      angle,
      boneLength,
      secondJoint
    );

    const tarX = p.mouseX - p.width / 2 + anchor.x * 40;
    const tarY = p.mouseY - p.height / 2 + anchor.y * 40;

    for (let i = 0; i < 3; i++) {
      secondJoint.updateIK([tarX, tarY]);
    }

    for (let i = 0; i < 2; i++) {
      firstJoint.updateIK([tarX, tarY]);
    }

    firstJoint.draw(p);
  }
}
