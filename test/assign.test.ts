import { assign } from "src/assign";

describe("assign", () => {
  it("should assign new values to an existing object", () => {
    const a: Record<string, any> = { a: "foo", c: "foo" };
    const b: Record<string, any> = { a: "bar", b: "baz" };
    assign(a, b);
    expect(a).toEqual({ a: "bar", b: "baz", c: "foo" });
  });
});
