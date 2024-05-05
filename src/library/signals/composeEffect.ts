import { effect, Signal } from "@preact/signals-react";

import { Dispose } from "@/utils/dispose";

export type Unsignal<T> = T extends Signal<infer U> ? U : never;
export type UnsignalArray<T> = {
  -readonly [P in keyof T]: Unsignal<T[P]>
};

export const composeEffect = <const A extends Signal<any>[]>(
  signals: A,
  func: (...args: UnsignalArray<A>) => Dispose
) => effect(() => (
  func(...signals.map(e => e.value) as UnsignalArray<A>)
));