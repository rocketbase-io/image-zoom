import { normalizeOptions } from "src/options";



describe("normalizeOptions", () => {
  it("should populate not provided options", () => {
    expect(normalizeOptions()).toEqual({
      factor: 2,
      scale: 200,
      shape: "circle",
      position: "cursor",
      offset: [-100, -100],
      zoomClass: "rocket-zoom-image-zoom",
      viewportClass: "rocket-zoom-image-viewport",
      hide: true
    });
  });

  it("should not overwrite provided settings", () => {
    expect(normalizeOptions({
      factor: 3,
      scale: 400,
      position: "fixed",
      zoomClass: [],
      hide: false
    })).toEqual({
      factor: 3,
      scale: 400,
      shape: "square",
      position: "fixed",
      offset: [-200, -200],
      zoomClass: [],
      viewportClass: "rocket-zoom-image-viewport",
      hide: false
    });
  });
});
