import { Component, PropsWithChildren, ReactNode } from "react";
import { Signal, signal } from "@preact/signals-react";

import computeFunctions from "./calc/computeFunctions";
import computeVariables from "./calc/computeVariables";
import { connect } from "@/library/connect";
import { provide } from "@/library/provide";
import rsp from "@vicimpa/rsp";
import s from "./Functions.module.sass";

var id = 0;
var vid = 0;

export type TFunction = {
  id: number;
  type: Signal<'x' | 'y'>;
  color: Signal<string>;
  func: Signal<(v: number, p: Record<string, number>, t: number) => number>;
};

export type TVariable = {
  id: number;
  name: Signal<string>;
  min: Signal<number>;
  max: Signal<number>;
  default: Signal<number>;
  signal: Signal<Signal<number> | undefined>;
};

export const makeFunc = (
  type: 'x' | 'y',
  color: string,
  func: (v: number) => number
): TFunction => {
  return {
    id: id++,
    type: signal(type),
    color: signal(color),
    func: signal(func)
  };
};


export const makeVariable = (
): TVariable => {
  return {
    id: vid++,
    name: signal(''),
    min: signal(0),
    max: signal(100),
    default: signal(0),
    signal: signal(undefined)
  };
};

@provide()
@connect()
export class Functions extends Component<PropsWithChildren> {
  loop = signal(false);

  functions = signal([] as TFunction[]);
  variables = signal([] as TVariable[]);

  functionItems = computeFunctions(this);
  variablesItems = computeVariables(this);

  params = new Proxy({} as Record<string, number>, {
    get: (_, key: string) => {
      return this.variables.value
        .find(v => v.name.value === key)
        ?.signal.value?.value ?? 0;
    }
  });

  render(): ReactNode {
    return (
      <div className={s.func}>
        <div className={s.sidebar}>
          <div className={s.head}>
            <a href="https://github.com/vicimpa/graph-calc">GitHub</a>
            <label>
              Loop
              <rsp.input type="checkbox" bind-checked={this.loop} />
            </label>
          </div>
          {this.functionItems}
          {this.variablesItems}
          <button
            onClick={() => {
              this.functions.value = [
                ...this.functions.peek(),
                makeFunc('x', '#999', function (v) { return v; })
              ];
            }}
          >
            Append func
          </button>
          <button
            onClick={() => {
              this.variables.value = [
                ...this.variables.peek(),
                makeVariable(),
              ];
            }}
          >
            Append variable
          </button>
        </div>
        <div className={s.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}