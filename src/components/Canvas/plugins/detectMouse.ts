import { Canvas } from "../Canvas";
import { Vec2 } from "@/library/vec2";
import { refEvent } from "@/library/events";

export default (c: Canvas) => (
  refEvent(c.can, 'mousemove', (e) => {
    c.mouse.value = Vec2.fromOffsetXY(e);
  })
);