import { assign } from "src/assign";
import { Bound } from "src/bound";
import { ZoomImageOptions } from "src/options";



export class View {
  private el?: HTMLDivElement;

  constructor(
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
    }
  }

  public setVisible(visible: boolean) {
    this.element.style.display = "block";
  }

  public destroy() {
    const { reference, onMouseMove, onMouseEnter, onMouseLeave } = this;
    reference.removeEventListener("mousemove", onMouseMove);
    reference.removeEventListener("mouseenter", onMouseEnter);
    reference.removeEventListener("mouseleave", onMouseLeave);
    delete this.el;
  }

  public get element() {
    return this.el ?? (this.el = this.createView());
  }

  public createView(): HTMLDivElement {
    const { reference, options } = this;
    const { offset, scale, shape, position } = options;
    const el = document.createElement("div");
    const style = el.style;
    reference.parentElement?.appendChild(el);
    assign(style, {
      position: "absolute",
      pointerEvents: "none",
      overflow: "hidden",
      boxSizing: "border-box",
      cursor: "none",
      willChange: "top, left",
      transform: `translate(${offset.map(it => `${it}px`).join(",")})`
    });
    if (position !== "cover") style.maxWidth = style.width = style.maxHeight = style.height = `${scale}px`;
    if (shape === "circle") style.borderRadius = "100000px";
    return el;
  }

  @Bound
  onMouseMove(ev: MouseEvent) {

  }

  @Bound
  onMouseEnter(ev: MouseEvent) {

  }

  onMouseLeave(ev: MouseEvent) {

  }
}
