import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidBoolean from "../src/toValidBoolean";

describe("toValidBoolean", () => {
  it("without params", () => {
    const schema = toValidBoolean();

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("empty params", () => {
    const schema = toValidBoolean({});

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("default params", () => {
    const schema = toValidBoolean({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:number  |", () => {
    const schema = toValidBoolean({ type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:boolean |", () => {
    const schema = toValidBoolean({ type: z.boolean() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  |           |", () => {
    const schema = toValidBoolean({ preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:false |           |", () => {
    const schema = toValidBoolean({ preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:none     |         |           |", () => {
    const schema = toValidBoolean({ allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:none     |         | t:number  |", () => {
    const schema = toValidBoolean({ allow: "none", type: z.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     |         | t:boolean |", () => {
    const schema = toValidBoolean({ allow: "none", type: z.boolean() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:none     | p:true  |           |", () => {
    const schema = toValidBoolean({ allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:none     | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "none",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "none",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:none     | p:false |           |", () => {
    const schema = toValidBoolean({ allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:none     | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "none",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "none",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:optional |         |           |", () => {
    const schema = toValidBoolean({ allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  |           |", () => {
    const schema = toValidBoolean({ allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:false |           |", () => {
    const schema = toValidBoolean({ allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "optional",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         |           |", () => {
    const schema = toValidBoolean({ allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:nullable |         | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:nullable |         | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:nullable | p:true  |           |", () => {
    const schema = toValidBoolean({ allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:nullable | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:nullable | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:nullable | p:false |           |", () => {
    const schema = toValidBoolean({ allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("|            | a:nullable | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:nullable | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      allow: "nullable",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback |            |         |           |", () => {
    const schema = toValidBoolean({ fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         |           |", () => {
    const schema = toValidBoolean({ fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:none     |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:none     |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:none     | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:none     | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:none     | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:none     | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:none     | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:none     | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:optional |         |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:nullable |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:nullable |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:nullable | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:nullable | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:nullable | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:nullable | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:fallback | a:nullable | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | string>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe("fallback");
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:nullable | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | string>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 |            |         |           |", () => {
    const schema = toValidBoolean({ fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         |           |", () => {
    const schema = toValidBoolean({ fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:none     | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:none     | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:none     |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:none     |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:none     | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:none     | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:none     | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:none     | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:optional |         |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | undefined>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | undefined>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(false);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:nullable | p:true  |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:nullable | p:false |           |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:nullable |         | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:nullable |         | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:nullable | p:true  | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:nullable | p:true  | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | null>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(false);
  });

  it("| f:12345678 | a:nullable | p:false | t:number  |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number>();

    expect(() => schema.parse(1)).toThrow(z.ZodError);
    expect(() => schema.parse("0")).toThrow(z.ZodError);
    expect(() => schema.parse(true)).toThrow(z.ZodError);
    expect(() => schema.parse("55")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(12345678);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:nullable | p:false | t:boolean |", () => {
    const schema = toValidBoolean({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.boolean(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<boolean | number>();

    expect(schema.parse(1)).toBe(true);
    expect(schema.parse("0")).toBe(false);
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse("55")).toBe(true);
    expect(schema.parse(42)).toBe(true);
    expect(schema.parse([])).toBe(false);
    expect(schema.parse({ value: 42 })).toBe(true);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(false);
  });
});
