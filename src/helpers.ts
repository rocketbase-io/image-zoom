import { normalizeOptions, ZoomImageOptions } from "src/options";
import { ZoomImage } from "src/zoom-image";

export function attachZoom(el: HTMLImageElement, zoom: ZoomImage): ZoomImage {
  return (el as any).__zoom = zoom;
}

export function detachZoom(el: HTMLImageElement) {
  delete (el as any).__zoom;
}

export function hasZoom(el: HTMLImageElement) {
  return !!(el as any).__zoom;
}

export function create(el: HTMLImageElement | string, options?: Partial<ZoomImageOptions>) {
  if (typeof el === "string") el = document.querySelector(el) as HTMLImageElement;
  if (!el) throw new Error("No elements provided or no element matching selector!");
  if (hasZoom(el)) throw new Error("Element does already have a ZoomImage instance attached!");
  return attachZoom(el, new ZoomImage(el, normalizeOptions(options)));
}
