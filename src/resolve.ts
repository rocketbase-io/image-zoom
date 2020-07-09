export function resolve(el: HTMLElement | string): HTMLElement {
  if (typeof el === "string") el = document.querySelector(el) as HTMLElement;
  if (!el) throw new Error("No elements provided or no element matching selector!");
  return el;
}
