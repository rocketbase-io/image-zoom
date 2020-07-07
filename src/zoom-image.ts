import { Bound } from "src/bound";
import { ZoomImageOptions } from "src/options";

export class ZoomImage {

  public magnifier?: HTMLElement;
  public image?: HTMLImageElement;

  constructor(
    public el: HTMLImageElement,
    public options: ZoomImageOptions
  ) {
    const { onMouseMove, onMouseLeave, onMouseEnter } = this;
    this.el.addEventListener("mousemove", onMouseMove, { passive: true });
    this.el.addEventListener("mouseleave", onMouseLeave);
    this.el.addEventListener("mouseenter", onMouseEnter);
  }

  public get classes() {
    const { overlayClass } = this.options;
    return !overlayClass ? [] : typeof overlayClass === "string" ? [overlayClass] : overlayClass;
  }

  public get offset(): [number, number] {
    return this.options.offset ?? [-this.scale / 2, -this.scale / 2];
  }

  public get scale(): number {
    return this.options.scale ?? 200;
  }

  public get factor(): number {
    return this.options.factor ?? 2;
  }

  public get dimensions() {
    const { width, height } = getComputedStyle(this.el);
    return { width, height };
  }

  @Bound
  public onMouseMove(ev: MouseEvent) {
    this.updatePosition(ev);
    this.updateView(ev);
  }

  @Bound
  public onMouseLeave(ev: MouseEvent) {
    this.magnifier!.style.display = "none";
  }

  @Bound
  public onMouseEnter(ev: MouseEvent) {
    this.magnifier = this.magnifier ?? this.createMagnifier();
    this.image = this.image ?? this.createImage();
    this.magnifier!.style.display = "block";
    this.updatePosition(ev);
    this.updateView(ev);
  }

  public createMagnifier() {
    const { classes, offset, scale } = this;
    const el = document.createElement("div");
    el.classList.add(...classes);
    this.el.parentElement?.appendChild(el);
    const style = el.style;
    style.position = "absolute";
    style.transform = `translate(${offset.map(it => `${it}px`).join(",")})`;
    style.maxWidth = style.width = style.maxHeight = style.height = `${scale}px`;
    style.pointerEvents = "none";
    style.paddingLeft = style.paddingTop = `${scale / 2}px`;
    style.overflow = "hidden";
    style.boxSizing = "border-box";
    style.willChange = "top, left";
    style.cursor = "none";
    if (this.options.shape === "circle") style.borderRadius = "100000px";
    return el;
  }

  public createImage() {
    const { factor, magnifier } = this;
    const image = document.createElement("img");
    const { width, height } = this.dimensions;
    image.src = this.el.src;
    magnifier!.appendChild(image);
    const style = image.style;
    style.transform = `scale(${factor})`;
    style.transformOrigin = "0 0";
    style.position = "absolute";
    style.width = width;
    style.height = height;
    style.willChange = "top, left";
    return image;
  }


  public updatePosition(ev: MouseEvent) {
    if (this.options.position === "fixed") return;
    const { offsetX, offsetY } = ev;
    const { offsetTop, offsetLeft } = this.el;
    const { style } = this.magnifier!;
    style.top = `${offsetY + offsetTop}px`;
    style.left = `${offsetX + offsetLeft}px`;
  }

  public updateView(ev: MouseEvent) {
    const { factor, scale } = this;
    const { clientX, clientY } = ev;
    const { top, left} = this.el.getBoundingClientRect();
    const { clientWidth, clientHeight } = this.el;
    const x = (clientX - left) / clientWidth;
    const y = (clientY - top) / clientHeight;
    const { style, clientWidth: width, clientHeight: height } = this.image!;
    style.top = `${-y * height * factor + scale / 2}px`;
    style.left = `${-x * width * factor + scale / 2}px`;
  }

  public destroy() {
    this.el.removeEventListener("mouseenter", this.onMouseEnter);
    this.el.removeEventListener("mouseleave", this.onMouseLeave);
    this.el.removeEventListener("mousemove", this.onMouseMove);
    this.magnifier?.parentElement?.removeChild(this.magnifier);
    this.magnifier = this.image = undefined;
    (this.el as any).__zoom = undefined;
  }

}
