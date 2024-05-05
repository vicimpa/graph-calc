import { protostore } from "../protostore";

export type SubEmit<F extends (...args: any[]) => any> = {
  sub<T extends object>(target: T, listener: F): () => void;
  emit<T extends object>(target: T, ...args: Parameters<F>): void;
};

export const subemit = <F extends (...args: any[]) => any>(): SubEmit<F> => {
  const subStore = protostore(() => new Set<F>());

  return {
    sub(target, listener) {
      const store = subStore(target);
      return (
        store.add(listener),
        () => { store.delete(listener); }
      );
    },
    emit(target, ...args) {
      const store = subStore(target);
      store.forEach(listener => listener(...args));
    }
  };
};

const { sub, emit } = subemit<() => void>();
export { sub, emit };
