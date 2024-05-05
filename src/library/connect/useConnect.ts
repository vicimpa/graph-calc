import { ConnectPlugin, connectStore } from "./connect";

import { assign } from "../object";
import { dispose } from "@/utils/dispose";
import { injectStore } from "./inject";
import { proto } from "../object";
import { useEffect } from "react";

export const useConnect = <T extends object>(target: T) => {
  proto(target)
    .map(proto => injectStore(proto))
    .forEach((inject) => {
      for (const [key, hook] of inject)
        assign(target, { [key]: hook() });
    });

  const plugins: ConnectPlugin<T>[] = proto(target)
    .map(proto => connectStore(proto))
    .reduce((acc, current) => acc.concat(current), []);

  useEffect(() => dispose(
    ...plugins.map(plugin => plugin(target))
  ));
};