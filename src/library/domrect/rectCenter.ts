import { Vec2 } from "../vec2";

export const rectCenter = (rect: DOMRect | HTMLElement): Vec2 => {
  if (rect instanceof HTMLElement)
    return rectCenter(rect.getBoundingClientRect());

  return Vec2.fromSize(rect).div(2).plus(rect);
};