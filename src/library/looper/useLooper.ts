import { LoopFunction, looper } from "./looper";

import { useEffect } from "react";
import { useEvent } from "../hooks";

export const useLooper = <T extends LoopFunction>(func: T) => {
  const funcRef = useEvent(func);
  useEffect(() => looper(funcRef));
};