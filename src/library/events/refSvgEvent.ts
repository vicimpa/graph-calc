import { EListener, SEM } from "./types";

import { RefObject } from "react";
import { effect } from "@preact/signals-react";

export const refSvgEvent = <T extends SVGElement, K extends keyof SEM>(
  ref: RefObject<T>,
  key: K | K[],
  listener: EListener<SEM[K]>
) => {
  if (Array.isArray(key)) {
    const unsub = key.map(e => refSvgEvent(ref, e, listener));
    return () => { unsub.forEach(u => u?.()); };
  }

  return effect(() => {
    const { current: elem } = ref;
    if (elem) {
      elem.addEventListener(key, listener);
      return () => { elem.removeEventListener(key, listener); };
    }
  });
};