import { Component, PropsWithChildren, ReactNode } from "react";
import { Signal, signal } from "@preact/signals-react";

import computeFunctions from "./calc/computeFunctions";
import { connect } from "@/library/connect";
import { provide } from "@/library/provide";
import s from "./Functions.module.sass";

var id = 0;

export type TFunction = {
  id: number;
  type: Signal<'x' | 'y'>;
  color: Signal<string>;
  func: Signal<(v: number) => number>;
};

@provide()
@connect()
export class Functions extends Component<PropsWithChildren> {
  functions = signal([] as TFunction[]);
  functionItems = computeFunctions(this);

  render(): ReactNode {
    return (
      <div className={s.func}>
        <div className={s.sidebar}>
          {this.functionItems}
          <button
            onClick={() => {
              this.functions.value = [
                ...this.functions.peek(),
                {
                  id: id++,
                  type: signal('x'),
                  color: signal('#666'),
                  func: signal((v) => v)
                }
              ];
            }}
          >
            Append
          </button>
        </div>
        <div className={s.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}