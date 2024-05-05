import { Dispose } from "@/utils/dispose";

export type LoopFunction<T = any> = (time: number, deltaTime: number) => T;

var LOOPS = new Set<LoopFunction>();

var time = -1;
var deltaTime = -1;

var loop = (newTime: number) => {
  requestAnimationFrame(loop);

  if (time < 0)
    return time = newTime;

  deltaTime = newTime - time;
  time = newTime;

  LOOPS.forEach(execute);
};

requestAnimationFrame(loop);

export const execute = <T extends LoopFunction>(loop: T): ReturnType<T> => {
  return loop(time, deltaTime);
};

export const looper = <T extends LoopFunction>(loop: T, skip?: number): Dispose => {
  var i = skip ?? 0;
  const skipLoop = skip ? ((...args) => {
    if ((i++) > skip) {

      loop(...args);
      i = 0;
    }
  }) as T : loop;

  return (
    LOOPS.add(skipLoop),
    () => { LOOPS.delete(skipLoop); }
  );
};