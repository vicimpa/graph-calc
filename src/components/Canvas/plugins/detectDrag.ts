import { Canvas } from "../Canvas";
import { Vec2 } from "@/library/vec2";
import { makeDrag } from "@/utils/makeDrag";
import { refEvent } from "@/library/events";

export default (c: Canvas) => {
  const drag = makeDrag(() => {
    const start = new Vec2(c.x, c.y);
    return ({ delta }) => {
      delta
        .times(-1)
        .plus(start)
        .toSignals(c.x, c.y);
    };
  });

  return refEvent(c.can, 'mousedown', drag);
};