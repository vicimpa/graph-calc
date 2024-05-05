import { Vec2 } from "@/library/vec2";

export const getOffset = (from: HTMLElement, to: HTMLElement) => {
  const out = new Vec2();

  if (!to.contains(from))
    return out;
  if (!to.offsetParent || !from.offsetParent)
    return out;

  out.minus(to.offsetLeft, to.offsetTop);
  do {
    out.plus(from.offsetLeft, from.offsetTop);
    from = from.offsetParent as HTMLElement;
  } while (to.contains(from));

  return out;
};