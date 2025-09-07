import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidEnum from "../src/toValidEnum";

enum SomeEnum {
  el1 = 1,
  el2 = 2,
}

const someObject = {
  el1: 1,
  el2: 2,
};

describe("toValidEnum", () => {
  it("default params", () => {
    const schema = toValidEnum({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           |            |         | t:string |", () => {
    const schema = toValidEnum({ type: SomeEnum });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           |            |         | t:number |", () => {
    const schema = toValidEnum({ type: someObject });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           |            | p:true  | t:string |", () => {
    const schema = toValidEnum({
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           |            | p:true  | t:number |", () => {
    const schema = toValidEnum({
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           |            | p:false | t:string |", () => {
    const schema = toValidEnum({
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           |            | p:false | t:number |", () => {
    const schema = toValidEnum({
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:none     |         | t:string |", () => {
    const schema = toValidEnum({
      allow: "none",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:none     |         | t:number |", () => {
    const schema = toValidEnum({
      allow: "none",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject]
    >();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:none     | p:true  | t:string |", () => {
    const schema = toValidEnum({
      allow: "none",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:none     | p:true  | t:number |", () => {
    const schema = toValidEnum({
      allow: "none",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject]
    >();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:none     | p:false | t:string |", () => {
    const schema = toValidEnum({
      allow: "none",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:none     | p:false | t:number |", () => {
    const schema = toValidEnum({
      allow: "none",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject]
    >();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse(1)).toBe(1);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|           | a:optional |         | t:string |", () => {
    const schema = toValidEnum({
      allow: "optional",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           | a:optional |         | t:number |", () => {
    const schema = toValidEnum({
      allow: "optional",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           | a:optional | p:true  | t:string |", () => {
    const schema = toValidEnum({
      allow: "optional",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           | a:optional | p:true  | t:number |", () => {
    const schema = toValidEnum({
      allow: "optional",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|           | a:optional | p:false | t:string |", () => {
    const schema = toValidEnum({
      allow: "optional",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:optional | p:false | t:number |", () => {
    const schema = toValidEnum({
      allow: "optional",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable |         | t:string |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable |         | t:number |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable | p:true  | t:string |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable | p:true  | t:number |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable | p:false | t:string |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|           | a:nullable | p:false | t:number |", () => {
    const schema = toValidEnum({
      allow: "nullable",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | null
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("| f:invalid |            |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | null | undefined>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid |            |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | null | undefined
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid |            | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | null | undefined>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid |            | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | null | undefined
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid |            | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid |            | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:none     | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "none",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:optional |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | undefined>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid | a:optional |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | undefined
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid | a:optional | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | undefined>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid | a:optional | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | undefined
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:invalid | a:optional | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:optional | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "optional",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | null>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | null
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string | null>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string | null
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | string>();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:invalid | a:nullable | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: "invalid",
      allow: "nullable",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | string
    >();

    expect(schema.parse("value")).toBe("invalid");
    expect(schema.parse(42)).toBe("invalid");
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe("invalid");
    expect(schema.parse([])).toBe("invalid");
    expect(schema.parse({ value: 42 })).toBe("invalid");
    expect(schema.parse(null)).toBe("invalid");
    expect(schema.parse(undefined)).toBe("invalid");
  });

  it("| f:12      |            |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      |            |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | null | undefined
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      |            | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      |            | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | null | undefined
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      |            | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      |            | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:none     | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "none",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:optional |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      | a:optional |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | undefined
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      | a:optional | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      | a:optional | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | undefined
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12      | a:optional | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:optional | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "optional",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable |         | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable |         | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | null
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable | p:true  | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      preserve: true,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable | p:true  | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      preserve: true,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number | null
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable | p:false | t:string |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      preserve: false,
      type: SomeEnum,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<SomeEnum | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12      | a:nullable | p:false | t:number |", () => {
    const schema = toValidEnum({
      fallback: 12,
      allow: "nullable",
      preserve: false,
      type: someObject,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      (typeof someObject)[keyof typeof someObject] | number
    >();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse(1)).toBe(1);
    expect(schema.parse("2")).toBe(12);
    expect(schema.parse([])).toBe(12);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });
});
