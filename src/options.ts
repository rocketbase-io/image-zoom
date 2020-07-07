
export interface ZoomImageOptions {
  factor: number;
  scale: number;
  shape: "circle" | "square",
  position: "cursor" | "fixed",
  offset: [number, number];
  overlayClass: string | string[],
  hide: boolean;
}

export function normalizeOptions({
  factor = 2,
  scale = 200,
  shape = "circle",
  position = "cursor",
  offset = [-scale / 2, -scale / 2],
  overlayClass = "rocket-zoom-image-overlay",
  hide = true
}: Partial<ZoomImageOptions> = {}): ZoomImageOptions {
  return { factor, scale, shape, position, offset, overlayClass, hide };
}
