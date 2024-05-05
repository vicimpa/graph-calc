export type Assign<T extends object, S extends object[]> = S[0] extends object
  ? S[1] extends object
  ? Assign<T & S[0], S extends [object, ...infer P] ? P : never>
  : T & S[0]
  : T;

export const assign = <T extends object, S extends object[]>(
  target: T,
  ...args: S
): Assign<T, S> => {
  for (const arg of args) {
    Object.assign(target, arg);
  }

  return target;
};