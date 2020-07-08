import { addClasses, classes } from "src/css";



describe("classes", () => {
  it("should split a string into tokens", () => {
    expect(classes("foo bar")).toEqual(["foo", "bar"]);
  });
  it("should return an array as is", () => {
    const foo = ["foo", "bar"]
    expect(classes(foo)).toBe(foo);
  });
})

describe("addClasses", () => {
  it("should add classes to a given element", () => {
    const el = document.createElement("div");
    addClasses(el, "foo bar");
    expect(el.classList).toContain("foo");
    expect(el.classList).toContain("bar");
  });
});
