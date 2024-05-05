import { Signal } from "@preact/signals-react";

export const unsignal = <T>(maybe: Signal<T> | T) => (
  maybe && typeof maybe === 'object' && 'value' in maybe ? maybe.value : maybe
);