import { signalRef } from "./signalRef";
import { useMemo } from "react";

export const useSignalRef = <T>() => {
  return useMemo(() => {
    return signalRef<T>();
  }, []);
};