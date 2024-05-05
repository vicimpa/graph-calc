import { signalCorrect } from "./signalCorrect";
import { useMemo } from "react";

export const useSignalCorrect = <T>(
  initial: T,
  correct?: (v: T) => T
) => {
  return useMemo(() => {
    return signalCorrect(initial, correct);
  }, []);
};