import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidArray from "../src/toValidArray";

describe("toValidArray", () => {
  it("default params", () => {
    const schema = toValidArray({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      |            |         | t:string |", () => {
    const schema = toValidArray({ type: z.coerce.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      |            |         | t:number |", () => {
    const schema = toValidArray({ type: z.coerce.number() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      |            | p:true  | t:string |", () => {
    const schema = toValidArray({
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      |            | p:true  | t:number |", () => {
    const schema = toValidArray({
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      |            | p:false | t:string |", () => {
    const schema = toValidArray({
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      |            | p:false | t:number |", () => {
    const schema = toValidArray({
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:none     |         | t:string |", () => {
    const schema = toValidArray({
      allow: "none",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:none     |         | t:number |", () => {
    const schema = toValidArray({
      allow: "none",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:none     | p:true  | t:string |", () => {
    const schema = toValidArray({
      allow: "none",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:none     | p:true  | t:number |", () => {
    const schema = toValidArray({
      allow: "none",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:none     | p:false | t:string |", () => {
    const schema = toValidArray({
      allow: "none",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:none     | p:false | t:number |", () => {
    const schema = toValidArray({
      allow: "none",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|      | a:optional |         | t:string |", () => {
    const schema = toValidArray({
      allow: "optional",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      | a:optional |         | t:number |", () => {
    const schema = toValidArray({
      allow: "optional",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      | a:optional | p:true  | t:string |", () => {
    const schema = toValidArray({
      allow: "optional",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      | a:optional | p:true  | t:number |", () => {
    const schema = toValidArray({
      allow: "optional",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|      | a:optional | p:false | t:string |", () => {
    const schema = toValidArray({
      allow: "optional",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:optional | p:false | t:number |", () => {
    const schema = toValidArray({
      allow: "optional",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable |         | t:string |", () => {
    const schema = toValidArray({
      allow: "nullable",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable |         | t:number |", () => {
    const schema = toValidArray({
      allow: "nullable",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable | p:true  | t:string |", () => {
    const schema = toValidArray({
      allow: "nullable",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable | p:true  | t:number |", () => {
    const schema = toValidArray({
      allow: "nullable",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable | p:false | t:string |", () => {
    const schema = toValidArray({
      allow: "nullable",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|      | a:nullable | p:false | t:number |", () => {
    const schema = toValidArray({
      allow: "nullable",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toBe(null);
    expect(schema.parse(42)).toBe(null);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(null);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("| f:[] |            |         | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] |            |         | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] |            | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] |            | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] |            | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] |            | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     |         | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     |         | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:none     | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "none",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:optional |         | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] | a:optional |         | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] | a:optional | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] | a:optional | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | undefined>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:[] | a:optional | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:optional | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "optional",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable |         | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable |         | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | null>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | null>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:[] | a:nullable | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: [],
      allow: "nullable",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[]>();

    expect(schema.parse("value")).toStrictEqual([]);
    expect(schema.parse(42)).toStrictEqual([]);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toStrictEqual([]);
    expect(schema.parse(null)).toStrictEqual([]);
    expect(schema.parse(undefined)).toStrictEqual([]);
  });

  it("| f:12 |            |         | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 |            |         | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 |            | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 |            | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | null | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 |            | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 |            | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     |         | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     |         | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:none     | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "none",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:optional |         | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 | a:optional |         | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 | a:optional | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 | a:optional | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | undefined>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12 | a:optional | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:optional | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "optional",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable |         | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable |         | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable | p:true  | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      preserve: true,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable | p:true  | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      preserve: true,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number | null>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable | p:false | t:string |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      preserve: false,
      type: z.coerce.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual(["1", "2"]);
    expect(schema.parse([3, 4])).toStrictEqual(["3", "4"]);
    expect(schema.parse([[1, 2]])).toStrictEqual(["1,2"]);
    expect(schema.parse([{ value: 123 }])).toStrictEqual(["[object Object]"]);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });

  it("| f:12 | a:nullable | p:false | t:number |", () => {
    const schema = toValidArray({
      fallback: 12,
      allow: "nullable",
      preserve: false,
      type: z.coerce.number(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number[] | number>();

    expect(schema.parse("value")).toBe(12);
    expect(schema.parse(42)).toBe(12);
    expect(schema.parse([])).toStrictEqual([]);
    expect(schema.parse(["1", "2"])).toStrictEqual([1, 2]);
    expect(schema.parse([3, 4])).toStrictEqual([3, 4]);
    expect(() => schema.parse([[1, 2]])).toThrow(z.ZodError);
    expect(() => schema.parse([{ value: 123 }])).toThrow(z.ZodError);
    expect(schema.parse({ value: 42 })).toBe(12);
    expect(schema.parse(null)).toBe(12);
    expect(schema.parse(undefined)).toBe(12);
  });
});
