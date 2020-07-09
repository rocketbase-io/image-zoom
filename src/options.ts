export interface ZoomImageOptions {
  factor: number;
  scale: number;
  shape: "circle" | "square";
  position: "cursor" | "fixed" | "cover";
  offset: [number, number];
  viewportClass: string | string[];
  zoomClass: string | string[];
  hide: boolean;
  placeAt?: string | HTMLElement;
}

export function normalizeOptions({
  factor = 2,
  scale = 200,
  hide = true,
  position = "cursor",
  shape = position === "cursor" ? "circle" : "square",
  offset = [-scale / 2, -scale / 2],
  viewportClass = "rocket-zoom-image-viewport",
  zoomClass = "rocket-zoom-image-zoom",
  placeAt,
}: Partial<ZoomImageOptions> = {}): ZoomImageOptions {
  return { factor, scale, shape, position, offset, hide, viewportClass, zoomClass, placeAt };
}
