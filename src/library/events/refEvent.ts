import { EListener, HEM } from "./types";

import { RefObject } from "react";
import { effect } from "@preact/signals-react";

export const refEvent = <T extends HTMLElement, K extends keyof HEM>(
  ref: RefObject<T>,
  key: K | K[],
  listener: EListener<HEM[K]>
) => {
  if (Array.isArray(key)) {
    const unsub = key.map(e => refEvent(ref, e, listener));
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