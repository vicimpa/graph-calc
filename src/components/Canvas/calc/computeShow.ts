import { Canvas } from "../Canvas";
import { computed } from "@preact/signals-react";

export default (c: Canvas) => (
  computed(() => c.size.value.cdiv(c.s.value))
);