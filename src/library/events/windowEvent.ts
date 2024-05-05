import { EListener, WEM } from "./types";

export const windowEvent = <K extends keyof WEM>(
  key: K | K[],
  listener: EListener<WEM[K]>
) => {
  if (Array.isArray(key)) {
    const unsub = key.map(e => windowEvent(e, listener));
    return () => { unsub.forEach(u => u()); };
  }

  return (
    addEventListener(key, listener),
    () => { removeEventListener(key, listener); }
  );
};