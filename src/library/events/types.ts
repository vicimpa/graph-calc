export type WEM = WindowEventMap;
export type DEM = DocumentEventMap;
export type HEM = HTMLElementEventMap;
export type SEM = SVGElementEventMap;
export type EListener<T extends Event = Event> = (e: T) => any;