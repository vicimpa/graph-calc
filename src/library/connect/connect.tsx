import { Component } from "react";
import { Connect } from ".";
import { Dispose } from "@/utils/dispose";
import { isExtends } from "@/utils/isExtends";
import { protostore } from "../protostore";

export type ConnectPlugin<T> = (instance: T) => Dispose;

export const connectStore = protostore<ConnectPlugin<any>[]>(() => []);

export const connect = <T extends object>(
  ...plugins: ConnectPlugin<T>[]
) => {
  return (target: new (...args: any[]) => T) => {
    connectStore(target.prototype).push(...plugins);

    if (isExtends(target, Component))
      return class extends (target as any) {
        render() {
          return (
            <Connect target={this}>
              {super.render()}
            </Connect>
          );
        }
      } as any;
  };
};