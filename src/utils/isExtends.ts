import { proto } from "@/library/object";

export const isExtends = <A extends object, B extends object>(
  a: new (...args: any[]) => A, b: new (...args: any[]) => B
): A extends B ? true : false => {
  return proto(a.prototype).includes(b.prototype) as any;
};