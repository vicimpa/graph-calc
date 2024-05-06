import { Canvas } from "../Canvas";
import { Dispose } from "@/utils/dispose";
import { Vec2 } from "@/library/vec2";
import { composeEffect } from "@/library/signals";
import { looper } from "@/library/looper";
import { precision } from "@/library/math";

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
    var size = 10;

    while (size * s < 100)
      size *= 2;

    const center = new Vec2(c.size.value)
      .times(.5)
      .plus(dX, dY);

    can.width = width;
    can.height = height;
    c.functions.loop.value;


    for (const f of c.functions.functions.value) {
      f.func.value;
      f.color.value;
      f.type.value;
    }

    const dispose: Dispose = looper((t) => {
      // Camera
      ctx.resetTransform();
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, width, height);
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

        ctx.lineWidth = 2 / s;
        ctx.stroke();
      }
      ctx.closePath();

      // Grid 2
      ctx.strokeStyle = '#333';
      ctx.beginPath();
      {
        for (let x = precision(-X - aX - size, size); x <= X - aX; x += size / 4) {
          ctx.moveTo(x, -Y - aY);
          ctx.lineTo(x, Y - aY);
        }

        for (let y = precision(-Y - aY - size, size); y <= Y - aY; y += size / 4) {
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


        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(` 0 `, 0, 0);
      }

      // Functions
      for (const f of c.functions.functions.value) {
        {
          const p = c.show.value.cdiv(c.size.value);

          if (f.type.value === 'x') {
            ctx.beginPath();

            var first = true;
            for (let x = precision(-X - aX - size, size); x <= X - aX; x += p.x) {
              ctx[first ? 'moveTo' : 'lineTo'](x, -f.func.value(x / 10, c.functions.params, t) * 10);
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
              ctx[first ? 'moveTo' : 'lineTo'](f.func.value(y / 10, c.functions.params, t) * 10, y);
              first = false;
            }

            ctx.strokeStyle = f.color.value ?? '#33f';
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      if (!c.functions.loop.value) {
        return dispose?.();
      }
    });


    return dispose;
  })
);