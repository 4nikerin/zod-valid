import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidISO from "../src/toValidISO";

describe("toValidISO", () => {
  it("without params", () => {
    const schema = toValidISO();

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("empty params", () => {
    const schema = toValidISO({});

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("default params", () => {
    const schema = toValidISO({
      allow: "nullish",
      fallback: null,
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), {
      allow: "nullish",
      fallback: null,
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:datetime |", () => {
    const schema = toValidISO({ type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), {});

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:string   |", () => {
    const schema = toValidISO({ type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), {});

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  |            |", () => {
    const schema = toValidISO({ preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:datetime |", () => {
    const schema = toValidISO({ preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:string   |", () => {
    const schema = toValidISO({ preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:false |            |", () => {
    const schema = toValidISO({ preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:datetime |", () => {
    const schema = toValidISO({ preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.iso.datetime(), { preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:string   |", () => {
    const schema = toValidISO({ preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.string(), { preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:none     |         |            |", () => {
    const schema = toValidISO({ allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         | t:datetime |", () => {
    const schema = toValidISO({ allow: "none", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         | t:string   |", () => {
    const schema = toValidISO({ allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.string(), { allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  |            |", () => {
    const schema = toValidISO({ allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:datetime |", () => {
    const schema = toValidISO({ allow: "none", preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:string   |", () => {
    const schema = toValidISO({ allow: "none", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.string(), { allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false |            |", () => {
    const schema = toValidISO({ allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:datetime |", () => {
    const schema = toValidISO({ allow: "none", preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:string   |", () => {
    const schema = toValidISO({ allow: "none", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidISO(z.string(), { allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:optional |         |            |", () => {
    const schema = toValidISO({ allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:datetime |", () => {
    const schema = toValidISO({ allow: "optional", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:string   |", () => {
    const schema = toValidISO({ allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  |            |", () => {
    const schema = toValidISO({ allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:datetime |", () => {
    const schema = toValidISO({ allow: "optional", preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:string   |", () => {
    const schema = toValidISO({ allow: "optional", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:false |            |", () => {
    const schema = toValidISO({ allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:datetime |", () => {
    const schema = toValidISO({ allow: "optional", preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:string   |", () => {
    const schema = toValidISO({ allow: "optional", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.string(), { allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         |            |", () => {
    const schema = toValidISO({ allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         | t:datetime |", () => {
    const schema = toValidISO({ allow: "nullable", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         | t:string   |", () => {
    const schema = toValidISO({ allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.string(), { allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  |            |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  | t:datetime |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  | t:string   |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.string(), { allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false |            |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false | t:datetime |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.iso.datetime(), { allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false | t:string   |", () => {
    const schema = toValidISO({ allow: "nullable", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidISO(z.string(), { allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(null);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("| f:fallback |            |         |            |", () => {
    const schema = toValidISO({ fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  |            |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:false |            |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), { fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "none", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), { fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), { fallback: "fallback", allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), {
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional |         |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "optional", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), {
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:false |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), {
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "nullable", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), { fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         | t:string   |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), { fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false |            |", () => {
    const schema = toValidISO({ fallback: "fallback", allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe("fallback");
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidISO(z.string(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe("fallback");
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:12345678 |            |         |            |", () => {
    const schema = toValidISO({ fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  |            |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: true, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:false |            |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: false, type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "none", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional |         |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "optional", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | undefined>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidISO(z.string(), {
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | undefined>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:false |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), {
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         | t:datetime |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "nullable", type: z.iso.datetime() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), { fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         | t:string   |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), { fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number | null>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number | null>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false |            |", () => {
    const schema = toValidISO({ fallback: 12345678, allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false | t:datetime |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.iso.datetime(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.iso.datetime(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false | t:string   |", () => {
    const schema = toValidISO({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema.parse(42)).toBe(12345678);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidISO(z.string(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | number>();

    expect(schema2.parse("2023-08-25 19:55:06+04")).toBe("2023-08-25T15:55:06Z");
    expect(schema2.parse("2023-08-25 19:55")).toBe("2023-08-25T16:55:00Z");
    expect(schema2.parse(42)).toBe(12345678);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });
});
