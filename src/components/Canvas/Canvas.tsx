import { Component, PropsWithChildren } from "react";
import { Signal, signal } from "@preact/signals-react";
import { connect, inject } from "@/library/connect";
import { provide, provider } from "@/library/provide";

import { Functions } from "../Functions";
import { Vec2 } from "@/library/vec2";
import computeCtx from "./calc/computeCtx";
import computeShow from "./calc/computeShow";
import detectDrag from "./plugins/detectDrag";
import detectDraw from "./plugins/detectDraw";
import detectResize from "./plugins/detectResize";
import detectWheel from "./plugins/detectWheel";
import s from "./Canvas.module.sass";
import { signalRef } from "@/library/signals";

export type TFunction = {
  type: Signal<'x' | 'y'>;
  color: Signal<string>;
  func: Signal<(v: number) => number>;
};

@provide()
@connect(
  detectResize,
  detectDraw,
  detectWheel,
  detectDrag
)
export class Canvas extends Component<PropsWithChildren> {
  can = signalRef<HTMLCanvasElement>();
  ctx = computeCtx(this);

  x = signal(0);
  y = signal(0);
  s = signal(1);

  size = signal(new Vec2());
  show = computeShow(this);

  @inject(provider(Functions))
  functions!: Functions;

  render() {
    return (
      <div className={s.container}>
        <canvas ref={this.can} />
        {this.props.children}
      </div>
    );
  }
}