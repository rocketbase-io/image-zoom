import { assign } from "src/assign";
import { Bound } from "src/bound";
import { addClasses } from "src/css";
import { ZoomImageOptions } from "src/options";
import { View } from "src/view";

export class Zoom {
  private el?: HTMLImageElement;
  public constructor(private reference: HTMLImageElement, private view: View, private options: ZoomImageOptions) {
    reference.addEventListener("mousemove", this.onMouseMove, { passive: true });
  }

  public get element(): HTMLImageElement {
    return this.el ?? (this.el = this.createZoom());
  }

  public get viewportDimensions(): { width: number; height: number } {
    const { clientWidth: width, clientHeight: height } = this.view.element;
    return { width, height };
  }

  public getCssDimensions(el: HTMLElement): { width: string; height: string } {
    const { width, height } = getComputedStyle(el);
    return { width, height };
  }

  public getOffsetFactor(ev: MouseEvent): { x: number; y: number } {
    const { clientWidth, clientHeight } = this.reference;
    const { offsetX, offsetY } = ev;
    const x = -offsetX / clientWidth;
    const y = -offsetY / clientHeight;
    return { x, y };
  }

  public createZoom(): HTMLImageElement {
    const { view, options, reference } = this;
    const { factor, zoomClass } = options;
    const image = document.createElement("img");
    const { width, height } = this.getCssDimensions(reference);
    image.src = reference.src;
    const { style } = image;
    assign(style, {
      transform: `scale(${factor})`,
      transformOrigin: "0 0",
      position: "absolute",
      width,
      height,
      willChange: "top, left",
      maxWidth: "unset",
    });
    addClasses(image, zoomClass);
    view.attachZoom(image);
    return image;
  }

  @Bound
  public onMouseMove(ev: MouseEvent): void {
    const { x, y } = this.getOffsetFactor(ev);
    const { width, height } = this.viewportDimensions;
    const { element, options } = this;
    element.style.transform = `translate(${width / 2}px, ${height / 2}px) scale(${options.factor}) translate(${x * 100}%, ${y * 100}%)`;
  }

  public destroy(): void {
    this.reference.removeEventListener("mousemove", this.onMouseMove);
    if (this.el) this.view.detachZoom(this.el);
    delete this.el;
    // @ts-expected-error
    delete this.reference;
    // @ts-expected-error
    delete this.view;
  }
}
