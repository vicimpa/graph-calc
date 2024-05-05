export const pick = <T extends object, K extends keyof T>(
  target: T,
  ...keys: K[]
) => {
  return keys.reduce((acc, key) => {
    acc[key] = target[key];
    return acc;
  }, {} as Pick<T, K>);
};