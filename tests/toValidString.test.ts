import z from "zod";
import { describe, it, expect, expectTypeOf } from "vitest";
import toValidString from "../src/toValidString";

describe("toValidString |", () => {
  it("without params", () => {
    const schema = toValidString();

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("empty params", () => {
    const schema = toValidString({});

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("default params", () => {
    const schema = toValidString({
      fallback: null,
      allow: "nullish",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:string |", () => {
    const schema = toValidString({ type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            |         | t:email  |", () => {
    const schema = toValidString({ type: z.email() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  |          |", () => {
    const schema = toValidString({ preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:string |", () => {
    const schema = toValidString({
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:true  | t:email  |", () => {
    const schema = toValidString({
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            |            | p:false |          |", () => {
    const schema = toValidString({ preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:string |", () => {
    const schema = toValidString({
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            |            | p:false | t:email  |", () => {
    const schema = toValidString({
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:none     |         |          |", () => {
    const schema = toValidString({ allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     |         | t:string |", () => {
    const schema = toValidString({ allow: "none", type: z.string() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     |         | t:email  |", () => {
    const schema = toValidString({ allow: "none", type: z.email() });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:true  |          |", () => {
    const schema = toValidString({ allow: "none", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     | p:true  | t:string |", () => {
    const schema = toValidString({
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     | p:true  | t:email  |", () => {
    const schema = toValidString({
      allow: "none",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:none     | p:false |          |", () => {
    const schema = toValidString({ allow: "none", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     | p:false | t:string |", () => {
    const schema = toValidString({
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:none     | p:false | t:email  |", () => {
    const schema = toValidString({
      allow: "none",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:optional |         |          |", () => {
    const schema = toValidString({ allow: "optional" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:string |", () => {
    const schema = toValidString({
      allow: "optional",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional |         | t:email  |", () => {
    const schema = toValidString({
      allow: "optional",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  |          |", () => {
    const schema = toValidString({ allow: "optional", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:string |", () => {
    const schema = toValidString({
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:true  | t:email  |", () => {
    const schema = toValidString({
      allow: "optional",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("|            | a:optional | p:false |          |", () => {
    const schema = toValidString({ allow: "optional", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:string |", () => {
    const schema = toValidString({
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:optional | p:false | t:email  |", () => {
    const schema = toValidString({
      allow: "optional",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(null);
  });

  it("|            | a:nullable |         |          |", () => {
    const schema = toValidString({ allow: "nullable" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable |         | t:string |", () => {
    const schema = toValidString({
      allow: "nullable",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable |         | t:email  |", () => {
    const schema = toValidString({
      allow: "nullable",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:nullable | p:true  |          |", () => {
    const schema = toValidString({ allow: "nullable", preserve: true });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable | p:true  | t:string |", () => {
    const schema = toValidString({
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable | p:true  | t:email  |", () => {
    const schema = toValidString({
      allow: "nullable",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("|            | a:nullable | p:false |          |", () => {
    const schema = toValidString({ allow: "nullable", preserve: false });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable | p:false | t:string |", () => {
    const schema = toValidString({
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("|            | a:nullable | p:false | t:email  |", () => {
    const schema = toValidString({
      allow: "nullable",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback |            |         |          |", () => {
    const schema = toValidString({ fallback: "fallback" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            |         | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback |            | p:false |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback |            | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:none     |         |          |", () => {
    const schema = toValidString({ fallback: "fallback", allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     |         | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     |         | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:none     | p:true  |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:none     | p:false |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:none     | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "none",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:optional |         |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional |         | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:fallback | a:optional | p:false |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:optional | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "optional",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe("fallback");
  });

  it("| f:fallback | a:nullable |         |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable |         | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable |         | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:nullable | p:true  |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:fallback | a:nullable | p:false |          |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("fallback");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:fallback | a:nullable | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: "fallback",
      allow: "nullable",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe("fallback");
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 |            |         |          |", () => {
    const schema = toValidString({ fallback: 12345678 });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            |         | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 |            | p:false |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 |            | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:none     |         |          |", () => {
    const schema = toValidString({ fallback: 12345678, allow: "none" });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     |         | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     |         | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:none     | p:true  |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:none     | p:false |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:none     | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "none",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:optional |         |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional |         | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | undefined>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(undefined);
  });

  it("| f:12345678 | a:optional | p:false |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe("null");
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:optional | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "optional",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(() => schema.parse(null)).toThrow(z.ZodError);
    expect(schema.parse(undefined)).toBe(12345678);
  });

  it("| f:12345678 | a:nullable |         |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable |         | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable |         | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:nullable | p:true  |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable | p:true  | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(null);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable | p:true  | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: true,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | null>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });

  it("| f:12345678 | a:nullable | p:false |          |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable | p:false | t:string |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.string(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(schema.parse("value")).toBe("value");
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(schema.parse(42)).toBe("42");
    expect(schema.parse([])).toBe("");
    expect(schema.parse({ value: 42 })).toBe("[object Object]");
    expect(schema.parse(null)).toBe(12345678);
    expect(schema.parse(undefined)).toBe("undefined");
  });

  it("| f:12345678 | a:nullable | p:false | t:email  |", () => {
    const schema = toValidString({
      fallback: 12345678,
      allow: "nullable",
      preserve: false,
      type: z.email(),
    });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string | number>();

    expect(() => schema.parse("value")).toThrow(z.ZodError);
    expect(schema.parse("example@google.com")).toBe("example@google.com");
    expect(() => schema.parse(42)).toThrow(z.ZodError);
    expect(() => schema.parse([])).toThrow(z.ZodError);
    expect(() => schema.parse({ value: 42 })).toThrow(z.ZodError);
    expect(schema.parse(null)).toBe(12345678);
    expect(() => schema.parse(undefined)).toThrow(z.ZodError);
  });
});
