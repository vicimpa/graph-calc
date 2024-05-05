import { Signal, signal } from "@preact/signals-react";

export const signalCorrect = <T>(initial: T, correct?: (v: T) => T) => {
  return {
    __proto__: signal(initial),
    get value() {
      return this.__proto__.value;
    },
    set value(value) {
      this.__proto__.value = correct?.(value) ?? value;
    }
  } as any as Signal<T>;
};