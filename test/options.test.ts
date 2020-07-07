import { normalizeOptions } from "src/options";



describe("normalizeOptions", () => {
  it("should populate not provided options", () => {
    expect(normalizeOptions()).toEqual({
      factor: 2,
      scale: 200,
      shape: "circle",
      position: "cursor",
      offset: [-100, -100],
      overlayClass: "rocket-zoom-image-overlay",
      hide: true
    });
  });

  it("should not overwrite provided settings", () => {
    expect(normalizeOptions({
      factor: 3,
      scale: 400,
      shape: "square",
      position: "fixed",
      overlayClass: [],
      hide: false
    })).toEqual({
      factor: 3,
      scale: 400,
      shape: "square",
      position: "fixed",
      offset: [-200, -200],
      overlayClass: [],
      hide: false
    });
  });
});
