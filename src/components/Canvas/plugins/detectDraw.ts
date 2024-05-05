import { max, min, precision } from "@/library/math";

import { Canvas } from "../Canvas";
import { Vec2 } from "@/library/vec2";
import { composeEffect } from "@/library/signals";

export default (c: Canvas) => (
  composeEffect([c.can, c.ctx], (can, ctx) => {
    if (!can || !ctx)
      return;

    const { x: width, y: height } = c.size.value;
    const { x: X, y: Y } = c.show.value.ctimes(.5);

    const dX = c.x.value;
    const dY = c.y.value;
    const s = c.s.value;
    const aX = dX / s;
    const aY = dY / s;
    const size = max(10, precision(min(X, Y) / 5, 10));

    const center = new Vec2(c.size.value)
      .times(.5)
      .plus(dX, dY);

    can.width = width;
    can.height = height;

    // Camera
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    ctx.setTransform(s, 0, 0, s, ...center.tuple);

    // Grid
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    {
      for (let x = precision(-X - aX - size, size); x <= X - aX; x += size) {
        ctx.moveTo(x, -Y - aY);
        ctx.lineTo(x, Y - aY);
      }

      for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size) {
        ctx.moveTo(-X - aX, y);
        ctx.lineTo(X - aX, y);
      }

      ctx.lineWidth = 1 / s;
      ctx.stroke();
    }
    ctx.closePath();

    // Axies
    ctx.strokeStyle = '#733';
    ctx.beginPath();
    {
      ctx.moveTo(0, -Y - aY);
      ctx.lineTo(0, Y - aY);

      ctx.moveTo(-X - aX, 0);
      ctx.lineTo(X - aX, 0);

      ctx.lineWidth = 4 / s;
      ctx.stroke();
    }
    ctx.closePath();

    // Digits
    ctx.fillStyle = '#fff';
    ctx.font = `${20 / s}px monospace`;
    {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      for (let x = precision(-X - aX - size, size); x <= X - aX; x += size) {
        if (x / 10 | 0)
          ctx.fillText(` ${x / 10 | 0} `, x, 0);
      }

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size) {
        if (y / 10 | 0)
          ctx.fillText(` ${-y / 10 | 0} `, 0, y);
      }
    }

    // Functions
    for (const f of c.functions.functions.value) {
      {
        const p = c.show.value.cdiv(c.size.value);

        if (f.type.value === 'x') {
          ctx.beginPath();

          var first = true;
          for (let x = precision(-X - aX - size, size); x <= X - aX; x += p.x) {
            ctx[first ? 'moveTo' : 'lineTo'](x, -f.func.value(x / 10) * 10);
            first = false;
          }

          ctx.strokeStyle = f.color.value ?? '#33f';
          ctx.stroke();
          ctx.closePath();
        }

        if (f.type.value === 'y') {
          ctx.beginPath();

          var first = true;
          for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += p.y) {
            ctx[first ? 'moveTo' : 'lineTo'](f.func.value(y / 10) * 10, y);
            first = false;
          }

          ctx.strokeStyle = f.color.value ?? '#33f';
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  })
);