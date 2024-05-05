import { Component, ReactNode } from "react";
import { context } from "@/utils/context";

const ProvideSymbol = Symbol('provide');

export const provide = <T extends Component>(): any => {
  return (target: new (...args: any[]) => T) => {
    const ctx = context(target);

    return class extends (target as any) {
      static [ProvideSymbol] = ctx;

      render(): ReactNode {
        const { Provider } = ctx;
        return (
          <Provider value={this as any}>
            {super.render()}
          </Provider>
        );
      }
    };
  };
};

type ProvideComponent<T extends Component> = (new (...args: any[]) => T) & {
  [ProvideSymbol]?: ReturnType<typeof context<T>>;
};

export const useProvide = <T extends Component>(
  target: new (...args: any[]) => T
): T => {
  const t = target as ProvideComponent<T>;
  const ctx = t[ProvideSymbol];

  if (!ctx)
    throw new Error('This class is not decorate provide');

  return ctx.useContext();
};

export const provider = <T extends Component>(target: new (...args: any[]) => T) => {
  return () => (
    useProvide(target)
  );
};