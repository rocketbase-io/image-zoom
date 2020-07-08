import { assign } from "src/assign";
import { Bound } from "src/bound";
import { addClasses } from "src/css";
import { ZoomImageOptions } from "src/options";
import { resolve } from "src/resolve";

export class View {
  private el?: HTMLDivElement;
  public constructor(
    private reference: HTMLImageElement,
    private options: ZoomImageOptions
  ) {
    const { onMouseMove, onMouseEnter, onMouseLeave } = this;
    if (options.position === "cursor")
      reference.addEventListener("mousemove", onMouseMove, { passive: true });
    if (options.hide) {
      reference.addEventListener("mouseenter", onMouseEnter);
      reference.addEventListener("mouseleave", onMouseLeave);
    } else {
      this.setVisible(true);
      this.updateDimensions();
    }
  }

  public setVisible(visible: boolean) {
    this.element.style.opacity = visible ? "1" : "0";
  }

  public get element() {
    return this.el ?? (this.el = this.createView());
  }

  public createView(): HTMLDivElement {
    const { reference, options } = this;
    const el = document.createElement("div");
    const style = el.style;
    const container = options.placeAt ? resolve(options.placeAt) : reference.parentElement;
    container?.appendChild(el);
    assign(style, {
      position: "absolute",
      pointerEvents: "none",
      overflow: "hidden",
      boxSizing: "border-box",
      cursor: "none",
      transition: "opacity .2s ease-in-out"
    });
    addClasses(el, options.viewportClass);
    return el;
  }

  public updateDimensions(el: HTMLDivElement = this.element) {
    const { reference, options } = this;
    const { shape, scale, position, offset } = options;
    const { offsetTop, offsetLeft, clientWidth, clientHeight } = reference;
    if (position === "cover") assign(el!.style, {
      left: `${offsetLeft}px`,
      top: `${offsetTop}px`,
      width: `${clientWidth}px`,
      height: `${clientHeight}px`
    });
    if (position === "cursor") assign(el!.style, {
      width: `${scale}px`,
      height: `${scale}px`,
      maxWidth: `${scale}px`,
      maxHeight: `${scale}px`,
      willChange: "top, left",
      transform: `translate(${offset.map(it => `${it}px`).join(",")})`
    });
    if (shape === "circle") el!.style.borderRadius = "100000px";
  }

  public updatePosition(ev: MouseEvent, el: HTMLDivElement = this.element) {
    if (this.options.position !== "cursor") return;
    const { offsetX, offsetY } = ev;
    const { offsetTop, offsetLeft } = this.reference;
    const { style } = el;
    style.top = `${offsetY + offsetTop}px`;
    style.left = `${offsetX + offsetLeft}px`;
  }

  public attachZoom(el: HTMLImageElement) {
    this.element.appendChild(el);
  }

  public detachZoom(el: HTMLImageElement) {
    this.element.removeChild(el);
  }

  @Bound
  onMouseMove(ev: MouseEvent) {
    this.updatePosition(ev);
  }

  @Bound
  onMouseEnter(ev: MouseEvent) {
    this.updateDimensions();
    this.updatePosition(ev);
    if (this.options.hide) this.setVisible(true);
  }

  @Bound
  onMouseLeave(ev: MouseEvent) {
    if (this.options.hide) this.setVisible(false);
  }

  public destroy() {
    const { reference, onMouseMove, onMouseEnter, onMouseLeave } = this;
    reference.removeEventListener("mousemove", onMouseMove);
    reference.removeEventListener("mouseenter", onMouseEnter);
    reference.removeEventListener("mouseleave", onMouseLeave);
    delete this.el;
    // @ts-expected-error
    delete this.reference;
  }
}
