export type Dispose = (() => void) | void;

export const dispose = (...args: Dispose[]) => {
  return () => {
    args.forEach(d => d?.());
  };
};