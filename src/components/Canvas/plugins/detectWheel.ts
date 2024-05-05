import { Canvas } from "../Canvas";
import { Vec2 } from "@/library/vec2";
import { minMax } from "@/library/math";
import { refEvent } from "@/library/events";

export default (c: Canvas) => (
  refEvent(c.can, 'wheel', (e) => {
    e.preventDefault();

    c.toScale(
      minMax(c.s.peek() - e.deltaY * c.s.peek() * 0.001, .01, 100),
      Vec2.fromOffsetXY(e)
    );
  })
);