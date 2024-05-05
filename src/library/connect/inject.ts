import { protostore } from "../protostore";

export const injectStore = protostore(() => (
  new Map<string | symbol | number, () => any>()
));

export const inject = <T extends object, K extends keyof T>(
  injectFunction: () => T[K]
) => {

  return (target: T, key: K) => {
    const store = injectStore(target);
    store.set(key, injectFunction);
  };
};
