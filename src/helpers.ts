import { normalizeOptions, ZoomImageOptions } from "src/options";
import { resolve } from "src/resolve";
import { ZoomImage } from "src/zoom-image";

export function attach(el: HTMLImageElement, zoom: ZoomImage): ZoomImage {
  return ((el as any).__zoom = zoom);
}

export function detach(el: HTMLImageElement): void {
  delete (el as any).__zoom;
}

export function get(el: HTMLImageElement | string): ZoomImage | undefined {
  return (resolve(el) as any).__zoom;
}

export function has(el: HTMLImageElement | string): boolean {
  return !!get(el);
}

export function create(el: HTMLImageElement | string, options?: Partial<ZoomImageOptions>): ZoomImage {
  el = resolve(el) as HTMLImageElement;
  if (has(el)) throw new Error("Element does already have a ZoomImage instance attached!");
  return attach(el, new ZoomImage(el, normalizeOptions(options)));
}
