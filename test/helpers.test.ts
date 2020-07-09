import * as ZoomImage from "src/index";
import { normalizeOptions } from "src/options";

const wrapper: HTMLDivElement = document.createElement("div");
beforeEach(() => (wrapper.innerHTML = ""));
const img = () => {
  const img = document.createElement("img");
  wrapper.appendChild(img);
  return img;
};

describe("has", () => {
  it("should return false if a given element or selector has no ZoomImage instance attached", () => {
    const el = img();
    expect(ZoomImage.has(el)).toBeFalsy();
  });

  it("should return true if a given element has a ZoomImage instance attached", () => {
    const el = img();
    ZoomImage.create(el);
    expect(ZoomImage.has(el)).toBeTruthy();
    ZoomImage.get(el)?.destroy();
  });

  it("should throw for unresolvable selectors", () => {
    expect(() => ZoomImage.has("#does-not-exist")).toThrow();
  });
});

describe("get", () => {
  it("should return a ZoomImage instance if it was attached", () => {
    const el = img();
    const zoom = ZoomImage.create(el);
    expect(ZoomImage.get(el)).toBe(zoom);
    zoom.destroy();
  });

  it("should return undefined if no ZoomImage was attached", () => {
    const el = img();
    expect(ZoomImage.get(el)).toBeUndefined();
  });
});

describe("attach", () => {
  it("should attach an existing ZoomImage to an element", () => {
    const el = img();
    const zoom = new ZoomImage.ZoomImage(el, normalizeOptions());
    expect(ZoomImage.has(el)).toBeFalsy();
    ZoomImage.attach(el, zoom);
    expect(ZoomImage.has(el)).toBeTruthy();
  });
});

describe("detach", () => {
  const el = img();
  const zoom = ZoomImage.create(el);
  expect(ZoomImage.has(el)).toBeTruthy();
  ZoomImage.detach(el);
  expect(ZoomImage.has(el)).toBeFalsy();
  zoom.destroy();
});

describe("create", () => {
  it("should create a ZoomImage instance for a given element", () => {
    const el = img();
    const zoom = ZoomImage.create(el);
    expect(zoom).toBeDefined();
    expect(ZoomImage.has(el)).toBeTruthy();
    zoom.destroy();
  });

  it("should throw if there already is a ZoomImage instance for a given element", () => {
    const el = img();
    const zoom = ZoomImage.create(el);
    expect(() => ZoomImage.create(el)).toThrow();
    zoom.destroy();
  });
});
