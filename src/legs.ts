import p5 from "p5";
import { Bone } from "./bone";

export function drawLegs(p: p5, anchors: p5.Vector[], ground?: p5.Vector) {
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

    if (ground) {
      const tarX = ground.x - p.width / 2 + anchor.x;
      const tarY = ground.y - p.height / 2 + anchor.y;

      for (let i = 0; i < 3; i++) {
        secondJoint.updateIK([tarX, tarY]);
      }

      for (let i = 0; i < 3; i++) {
        firstJoint.updateIK([tarX, tarY]);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        firstJoint.updateIK([anchor.x, anchor.y + 200]);
      }
    }

    firstJoint.draw(p);
  }
}
