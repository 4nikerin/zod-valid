import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidNumber from "../src/toValidNumber";

describe("toValidNumber", () => {
  it("without params", () => {
    const schema = toValidNumber();

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("empty params", () => {
    const schema = toValidNumber({});

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("default params", () => {
    const schema = toValidNumber({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), {
      fallback: null,
      allow: "nullish",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:number |", () => {
    const schema = toValidNumber({ type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), {});

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:string |", () => {
    const schema = toValidNumber({ type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), {});

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  |          |", () => {
    const schema = toValidNumber({ preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:number |", () => {
    const schema = toValidNumber({ preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:string |", () => {
    const schema = toValidNumber({ preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:false |          |", () => {
    const schema = toValidNumber({ preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:number |", () => {
    const schema = toValidNumber({ preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.number(), { preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:string |", () => {
    const schema = toValidNumber({ preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.string(), { preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:none     |         |          |", () => {
    const schema = toValidNumber({ allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         | t:number |", () => {
    const schema = toValidNumber({ allow: "none", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.number(), { allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         | t:string |", () => {
    const schema = toValidNumber({ allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.string(), { allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  |          |", () => {
    const schema = toValidNumber({ allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:number |", () => {
    const schema = toValidNumber({ allow: "none", preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.number(), { allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:string |", () => {
    const schema = toValidNumber({ allow: "none", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.string(), { allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false |          |", () => {
    const schema = toValidNumber({ allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:number |", () => {
    const schema = toValidNumber({ allow: "none", preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.number(), { allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:string |", () => {
    const schema = toValidNumber({ allow: "none", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);

    const schema2 = toValidNumber(z.string(), { allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(() => schema2.parse([])).toThrow(z.ZodError);
    expect(() => schema2.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema2.parse(null)).toThrow(z.ZodError);
    expect(() => schema2.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:optional |         |          |", () => {
    const schema = toValidNumber({ allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:number |", () => {
    const schema = toValidNumber({ allow: "optional", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:string |", () => {
    const schema = toValidNumber({ allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  |          |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:number |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:string |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:false |          |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:number |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.number(), { allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:string |", () => {
    const schema = toValidNumber({ allow: "optional", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.string(), { allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         |          |", () => {
    const schema = toValidNumber({ allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         | t:number |", () => {
    const schema = toValidNumber({ allow: "nullable", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.number(), { allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         | t:string |", () => {
    const schema = toValidNumber({ allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.string(), { allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  |          |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  | t:number |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.number(), { allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:true  | t:string |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.string(), { allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false |          |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false | t:number |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.number(), { allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable | p:false | t:string |", () => {
    const schema = toValidNumber({ allow: "nullable", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(null);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);

    const schema2 = toValidNumber(z.string(), { allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(null);
    expect(schema2.parse({ value: 42 })).toBe(null);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(null);
  });

  it("| f:fallback |            |         |          |", () => {
    const schema = toValidNumber({ fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: "fallback", preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:false |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), { fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), { fallback: "fallback", preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "none", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), { fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), { fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional |         |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "optional", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: "fallback", allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:false |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         | t:number |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "nullable", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), { fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         | t:string |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), { fallback: "fallback", allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string | null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false |          |", () => {
    const schema = toValidNumber({ fallback: "fallback", allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.number(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | string>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe("fallback");
    expect(schema.parse({ value: 42 })).toBe("fallback");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");

    const schema2 = toValidNumber(z.string(), {
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<string>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe("fallback");
    expect(schema2.parse({ value: 42 })).toBe("fallback");
    expect(schema2.parse(null)).toBe("fallback");
    expect(schema2.parse(undefined)).toBe("fallback");
  });

  it("| f:12345678 |            |         |          |", () => {
    const schema = toValidNumber({ fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: true, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: true, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678, preserve: true });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:false |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: false, type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, preserve: false, type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678, preserve: false });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "none", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.number(),
    });
    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "none",
      preserve: false,
    });
    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional |         |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "optional", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "optional", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678, allow: "optional" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | undefined>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(undefined);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | undefined>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:false |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         | t:number |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "nullable", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), { fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         | t:string |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "nullable", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), { fallback: 12345678, allow: "nullable" });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:true  | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number | null>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(null);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false |          |", () => {
    const schema = toValidNumber({ fallback: 12345678, allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false | t:number |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(schema.parse("55")).toBe(55);
    expect(schema.parse(42)).toBe(42);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.number(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(schema2.parse("55")).toBe(55);
    expect(schema2.parse(42)).toBe(42);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable | p:false | t:string |", () => {
    const schema = toValidNumber({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toBe(12345678);
    expect(schema.parse({ value: 42 })).toBe(12345678);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);

    const schema2 = toValidNumber(z.string(), {
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema2>>().toEqualTypeOf<number>();

    expect(() => schema2.parse("55")).toThrow(z.ZodError);
    expect(() => schema2.parse(42)).toThrow(z.ZodError);
    expect(schema2.parse([])).toBe(12345678);
    expect(schema2.parse({ value: 42 })).toBe(12345678);
    expect(schema2.parse(null)).toBe(12345678);
    expect(schema2.parse(undefined)).toBe(12345678);
  });
});
