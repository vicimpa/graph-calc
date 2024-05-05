import { Canvas } from "../Canvas";
import { Vec2 } from "@/library/vec2";
import { composeEffect } from "@/library/signals";
import { resize } from "@/utils/resize";

export default (ctx: Canvas) => (
  composeEffect([ctx.can], (can) => {
    if (!can)
      return;

    return resize(can, () => {
      ctx.size.value = Vec2.fromOffsetSize(can);
    });
  })
);