import { Signal } from "@preact/signals-react";

export class SignalSet<T> extends Signal<Set<T>> implements Set<T> {
  constructor(values?: readonly T[] | null) {
    super(new Set(values));
  }

  get value() {
    return super.value;
  }

  get size(): number {
    return super.peek().size;
  }

  get values() {
    return super.peek().values;
  }

  get keys() {
    return super.peek().keys;
  }

  get entries() {
    return super.peek().entries;
  }

  get [Symbol.iterator]() {
    return super.peek()[Symbol.iterator];
  }

  get [Symbol.toStringTag]() {
    return super.peek()[Symbol.toStringTag];
  }

  has(value: T): boolean {
    return super.peek().has(value);
  }

  add(value: T): this {
    var size = this.size;
    super.peek().add(value);

    if (size !== this.size)
      super.value = new Set(super.peek());

    return this;
  }

  delete(value: T): boolean {
    if (!super.peek().delete(value))
      return false;

    super.value = new Set(super.peek());
    return true;
  }

  clear(): void {
    var size = this.size;
    super.peek().clear();

    if (size !== this.size)
      super.value = new Set(super.peek());
  }

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    super.peek().forEach(callbackfn, thisArg);
  }
}