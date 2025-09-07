import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidObject from "../src/toValidObject";

describe("toValidObject", () => {
  it("default params", () => {
    const schema = toValidObject({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: z.object({}).catchall(z.any()),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          [x: string]: any;
        }
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:object |", () => {
    const schema = toValidObject({ type: z.object({ value: z.number() }) });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         |          |", () => {
    const schema = toValidObject();

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:object |", () => {
    const schema = toValidObject({
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  |          |", () => {
    const schema = toValidObject({
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:false | t:object |", () => {
    const schema = toValidObject({
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    } | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false |          |", () => {
    const schema = toValidObject({
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:none     |         | t:object |", () => {
    const schema = toValidObject({
      allow: "none",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    }>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(() => schema.parse({ x: "12" })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         |          |", () => {
    const schema = toValidObject({
      allow: "none",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown>>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:object |", () => {
    const schema = toValidObject({
      allow: "none",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    }>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(() => schema.parse({ x: "12" })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  |          |", () => {
    const schema = toValidObject({
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown>>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:object |", () => {
    const schema = toValidObject({
      allow: "none",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    }>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(() => schema.parse({ x: "12" })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false |          |", () => {
    const schema = toValidObject({
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown>>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse("2")).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:optional |         | t:object |", () => {
    const schema = toValidObject({
      allow: "optional",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         |          |", () => {
    const schema = toValidObject({
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:object |", () => {
    const schema = toValidObject({
      allow: "optional",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  |          |", () => {
    const schema = toValidObject({
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | null | undefined
    >();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:false | t:object |", () => {
    const schema = toValidObject({
      allow: "optional",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    } | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false |          |", () => {
    const schema = toValidObject({
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         | t:object |", () => {
    const schema = toValidObject({
      allow: "nullable",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    } | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         |          |", () => {
    const schema = toValidObject({
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  | t:object |", () => {
    const schema = toValidObject({
      allow: "nullable",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    } | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  |          |", () => {
    const schema = toValidObject({
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false | t:object |", () => {
    const schema = toValidObject({
      allow: "nullable",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
      value: number;
    } | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe(null);
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false |          |", () => {
    const schema = toValidObject({
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("| f:{}       |            |         | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | null
      | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       |            |         |          |", () => {
    const schema = toValidObject({
      fallback: {},
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | {} | null | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       |            | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | null
      | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       |            | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: {},
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | {} | null | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       |            | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       |            | p:false |          |", () => {
    const schema = toValidObject({
      fallback: {},
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     |         | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     |         |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:none     | p:false |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:optional |         | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       | a:optional |         |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | {} | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       | a:optional | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       | a:optional | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | {} | undefined
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:{}       | a:optional | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:optional | p:false |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable |         | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | null
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable |         |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {} | null>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
      | null
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {} | null>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | {}
    >();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({});
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:{}       | a:nullable | p:false |          |", () => {
    const schema = toValidObject({
      fallback: {},
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | {}>();

    expect(schema.parse("value")).toStrictEqual({});
    expect(schema.parse(42)).toStrictEqual({});
    expect(schema.parse([])).toStrictEqual({});
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toStrictEqual({});
    expect(schema.parse(null)).toStrictEqual({});
    expect(schema.parse(undefined)).toStrictEqual({});
  });

  it("| f:fallback |            |         | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | string | null | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | null
      | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | string | null | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional |         | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | string | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      Record<string, unknown> | string | undefined
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | null
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string | null>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
      | null
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string | null>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false | t:object |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.object({ value: z.number() }),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<
      | {
          value: number;
        }
      | string
    >();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toBe("fallback");
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false |          |", () => {
    const schema = toValidObject({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<Record<string, unknown> | string>();

    expect(schema.parse("value")).toBe("fallback");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toStrictEqual({ value: 42 });
    expect(schema.parse({ x: "12" })).toStrictEqual({ x: "12" });
    expect(schema.parse(new Date())).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });
});
