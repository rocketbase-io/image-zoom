import { normalizeOptions, ZoomImageOptions } from "src/options";
import { View } from "src/view";
import { Zoom } from "src/zoom";

export class ZoomImage {
  public view!: View;
  public zoom!: Zoom;

  constructor(
    public reference: HTMLImageElement,
    public options: ZoomImageOptions
  ) {
    this.create();
  }

  public setOptions(options: Partial<ZoomImageOptions>) {
    this.options = normalizeOptions(options);
    this.destroy();
    this.create();
  }

  public create() {
    const { reference, options } = this;
    const view = this.view = new View(reference, options);
    this.zoom = new Zoom(reference, view, options);
  }

  public destroy() {
    this.zoom?.destroy();
    this.view?.destroy();
  }
}
