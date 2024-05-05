import { createContext, useContext } from "react";

export const context = <T>(target?: new (...args: any[]) => T) => {
  const Context = createContext<T | null>(null);
  const { Provider, Consumer } = Context;

  return {
    Context,
    Provider,
    Consumer,
    useContext() {
      const data = useContext(Context);

      if (!data || (target && !(data instanceof target)))
        throw new Error(`Context need "${target?.name ?? '!NULL'}" type`);

      return data;
    }
  };
};