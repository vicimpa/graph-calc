import { dispose } from "./dispose";
import { subemit } from "@/library/subemit";

type ResizeListener = (entry: ResizeObserverEntry) => void;

const events = subemit<ResizeListener>();

const observer = new ResizeObserver((entries) => {
  for (const entry of entries)
    events.emit(entry.target, entry);
});

const observe = <T extends Element>(element: T) => {
  observer.observe(element);
  return () => { observer.unobserve(element); };
};

export const resize = <T extends Element>(
  element: T,
  listener: ResizeListener
) => dispose(
  events.sub(element, listener),
  observe(element),
);