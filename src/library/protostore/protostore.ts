export const protostore = <T>(initial: () => T) => {
  const store = new WeakMap<object, T>();

  return <T extends object>(target: T) => (
    store.get(target) ?? (
      store.set(target, initial()),
      store.get(target)!
    )
  );
};