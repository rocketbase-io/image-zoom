export function classes(cls: string | string[] = []): string[] {
  return typeof cls === "string" ? cls.split(/\s+/g) : cls;
}

export function addClasses(el: HTMLElement, cls?: string | string[]) {
  el.classList.add(...classes(cls));
}
