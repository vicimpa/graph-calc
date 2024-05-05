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
import detectMouse from "./plugins/detectMouse";
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
  detectDrag,
  detectMouse,
)
export class Canvas extends Component<PropsWithChildren> {
  can = signalRef<HTMLCanvasElement>();
  ctx = computeCtx(this);

  mouse = signal(new Vec2());

  x = signal(0);
  y = signal(0);
  s = signal(1);

  size = signal(new Vec2());
  show = computeShow(this);

  @inject(provider(Functions))
  functions!: Functions;

  toScale(scale: number) {
    const mouse = this.mouse.peek();
    const size = this.size.peek().cdiv(2);

    const start = mouse
      .cminus(size)
      .minus(this.x, this.y)
      .cdiv(this.s);

    this.s.value = scale;

    mouse
      .cminus(size)
      .minus(this.x, this.y)
      .cdiv(this.s)
      .minus(start)
      .times(this.s)
      .plus(this.x, this.y)
      .toSignals(this.x, this.y);

  }

  render() {
    return (
      <div className={s.container}>
        <canvas ref={this.can} />
        {this.props.children}
      </div>
    );
  }
}