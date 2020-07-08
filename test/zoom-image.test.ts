import * as ZoomImage from "src/index";

const wrapper: HTMLDivElement = document.createElement("div");
beforeEach(() => wrapper.innerHTML = "");
const img = () => {
  const img = document.createElement("img");
  wrapper.appendChild(img);
  return img;
};

describe("ZoomImage", () => {
  describe("setOptions", () => {
    it("should allow for changing options, recreating elements", () => {
      const el = img();
      const instance = ZoomImage.create(el);
      const { zoom, view } = instance;
      instance.setOptions({ factor: 4 });
      expect(zoom).not.toBe(instance.zoom);
      expect(view).not.toBe(instance.view);
      expect(instance.options.factor).toBe(4);
    });
  });
});
