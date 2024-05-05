import { Dispose } from "@/utils/dispose";
import { composeEffect, UnsignalArray } from "./composeEffect";
import { useEffect } from "react";
import { Signal } from "@preact/signals-react";

export const useComposeEffect = <const A extends Signal<any>[]>(
  signals: A,
  func: (...args: UnsignalArray<A>) => Dispose
) => {
  useEffect(() => composeEffect(signals, func), []);
};