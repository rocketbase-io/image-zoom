export function resolve(el: HTMLElement | string) {
  if (typeof el === "string") el = document.querySelector(el) as HTMLImageElement;
  if (!el) throw new Error("No elements provided or no element matching selector!");
  return el;
}
