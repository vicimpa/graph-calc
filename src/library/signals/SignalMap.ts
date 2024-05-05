import { Signal } from "@preact/signals-react";

export class SignalMap<K, V> extends Signal<Map<K, V>> implements Map<K, V> {
  get value() {
    return super.value;
  }

  get keys() {
    return super.peek().keys;
  }

  get size(): number {
    return super.peek().size;
  }

  get values() {
    return super.peek().values;
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

  get(key: K): V | undefined {
    return super.peek().get(key);
  }

  set(key: K, value: V): this {
    if (this.get(key) === value)
      return this;

    super.peek().set(key, value);
    super.value = new Map(super.peek());

    return this;
  }

  has(value: K): boolean {
    return super.peek().has(value);
  }

  delete(value: K): boolean {
    if (!super.peek().delete(value))
      return false;

    super.value = new Map(super.peek());
    return true;
  }

  clear(): void {
    var size = this.size;
    super.peek().clear();

    if (size !== this.size)
      super.value = new Map(super.peek());
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    super.peek().forEach(callbackfn, thisArg);
  }
}