import { ReactNode } from "react";
import { useConnect } from "./useConnect";

export * from "./connect";
export * from "./inject";

export type ConnectProps = {
  target: object;
  children?: ReactNode;
};

export const Connect = (props: ConnectProps) => (
  useConnect(props.target),
  <>{props.children}</>
);
