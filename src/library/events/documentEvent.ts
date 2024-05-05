import { DEM, EListener } from "./types";

export const documentEvent = <K extends keyof DEM>(
  key: K | K[],
  listener: EListener<DEM[K]>
) => {
  if (Array.isArray(key)) {
    const unsub = key.map(e => documentEvent(e, listener));
    return () => { unsub.forEach(u => u()); };
  }

  return (
    document.addEventListener(key, listener),
    () => { document.removeEventListener(key, listener); }
  );
};