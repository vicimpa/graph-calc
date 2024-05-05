import { Canvas } from "../Canvas";
import { computed } from "@preact/signals-react";

export default (ctx: Canvas) => (
  computed(() => {
    const can = ctx.can.value;
    if (!can)
      return null;
    return can.getContext('2d');
  })
);