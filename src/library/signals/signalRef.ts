import { Signal } from "@preact/signals-react";

export class SignalRef<T> extends Signal<T | null> {
  get current() {
    return this.value;
  }

  set current(v) {
    this.value = v;
  }

  // For fix to react
  hasOwnProperty(name: string) {
    if (name === 'current')
      return true;

    return super.hasOwnProperty(name);
  }
}

export const signalRef = <T>(): SignalRef<T> => {
  return new SignalRef<T>(null);
};