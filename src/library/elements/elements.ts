import { signal } from "@preact/signals-react";
import { useEffect } from "react";
import { useSignalRef } from "../signals";

export class ElementStore<T, A extends any[] = []> {
  list = signal<T[]>([]);

  constructor(
    public makeElement: (...args: A) => T
  ) { }

  make(...args: A): T {
    const l = this.list.peek();
    const e = this.makeElement(...args);
    return (this.list.value = [...l, e], e);
  }

  drop(elem: T) {
    const l = this.list.peek();
    const index = l.indexOf(elem);
    if (index !== -1) {
      this.list.value = l.toSpliced(index, 1);
    }
  }

  useRef(...args: A) {
    const ref = useSignalRef<T>();

    useEffect(() => {
      const elem = this.make(...args);
      ref.current = elem as any;

      return () => {
        this.drop(elem);
        ref.current = null;
      };
    }, []);

    return ref;
  }
}

export const elements = <T, A extends any[] = []>(
  makeElement: (...args: A) => T
) => new ElementStore(makeElement);