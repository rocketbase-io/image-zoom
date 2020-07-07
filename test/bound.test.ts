import { Bound } from "src/bound";

describe("Bound", () => {
  class Class {
    @Bound
    public method() {
      return this;
    }
  }

  it("should bind a method to its instance", () => {
    const instance = new Class();
    expect(instance.method.call(undefined)).toBe(instance);
  });

  it("should only bind on first access", () => {
    const instance = new Class();
    const method1 = instance.method;
    const method2 = instance.method;
    expect(method1).toBe(method2);
  });
});
