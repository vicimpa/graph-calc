export type FV<T, A extends any[] = []> = (
  (...args: A) => T
) | T;

export const fv = <T, A extends any[]>(val: FV<T, A>, ...args: A) => (
  val instanceof Function ? val(...args) : val
);