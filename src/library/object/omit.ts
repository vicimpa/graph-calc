import { assign } from "./assign";

export const omit = <T extends object, K extends keyof T>(
  target: T,
  ...keys: K[]
) => {
  const out = assign({}, target);

  for (const key of keys)
    Object.defineProperty(out, key, {});

  return out as Omit<T, K>;
};