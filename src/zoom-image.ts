import { normalizeOptions, ZoomImageOptions } from "src/options";
import { View } from "src/view";
import { Zoom } from "src/zoom";

export class ZoomImage {
  public view!: View;
  public zoom!: Zoom;

  constructor(public reference: HTMLImageElement, public options: ZoomImageOptions) {
    this.create();
  }

  public setOptions(options: Partial<ZoomImageOptions>): void {
    this.options = normalizeOptions(options);
    this.destroy();
    this.create();
  }

  public create(): void {
    const { reference, options } = this;
    const view = (this.view = new View(reference, options));
    this.zoom = new Zoom(reference, view, options);
  }

  public destroy(): void {
    this.zoom?.destroy();
    this.view?.destroy();
  }
}
