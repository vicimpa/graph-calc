export const createSvgElement = <K extends keyof SVGElementTagNameMap>(tag: K) => {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
};