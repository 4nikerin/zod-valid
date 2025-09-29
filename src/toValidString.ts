import { z } from "zod";

type ToValidStringAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options to configure the behavior of `toValidString`
 */
type ToValidStringOptions<T extends z.ZodType, K = null> = {
  /**
   * Base Zod schema to apply to the input before coercion.
   * Default is `z.string()`.
   */
  type?: T;

  /**
   * Value to return when the input is invalid or when an allowed empty value
   * (`null`/`undefined`) should be replaced (if `preserve: false`).
   * Default is `null`.
   */
  fallback?: K;

  /**
   * Controls which "empty" values are allowed:
   * - `"none"` — neither `null` nor `undefined` is allowed.
   * - `"optional"` — only `undefined` is allowed.
   * - `"nullable"` — only `null` is allowed.
   * - `"nullish"` — both `null` and `undefined` are allowed.
   *
   * Default is `"nullish"`.
   */
  allow?: ToValidStringAllow;

  /**
   * Determines what happens with allowed empty values:
   * - `true`  — returns the empty value (`null` or `undefined`) as-is.
   * - `false` — replaces the empty value with `fallback`.
   *
   * Default is `true`.
   */
  preserve?: boolean;
};

/**
 * Creates a Zod schema that coerces any value to a string
 * and provides flexible handling of empty values (`null` / `undefined`)
 * and invalid inputs.
 *
 * Behavior:
 * - Converts any input to a string (`String(val)`), unless it is an allowed empty value.
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered as allowed empty value.
 *   - `"nullable"` — only `null` is considered as allowed empty value.
 *   - `"nullish"` — both `null` and `undefined` are considered as allowed empty values.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other value is coerced to a string using `String(val)`.
 *
 * @param typeOrOptions Either:
 *   - A base Zod schema to apply (`z.ZodType`), **or**
 *   - An options object (see below).
 *
 * @param [options] Behavior options (if `type` is passed as first argument):
 *   - `type` — base Zod schema to apply. Default `z.string()`.
 *   - `fallback` — value to return when input is invalid or an allowed empty value should be replaced. Default `null`.
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`). Default `"nullish"`.
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback`. Default `true`.
 *
 * @returns A Zod schema that:
 *   - Coerces valid inputs to string.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * // Default usage (string coercion with nullish allowed)
 * const schema = toValidString();
 * schema.parse("abc");      // "abc"
 * schema.parse(123);        // "123"
 * schema.parse(null);       // null
 *
 * @example
 * // Pass only options
 * const schema = toValidString({ allow: "optional" });
 * schema.parse(null);       // "null" (null is coerced to string)
 * schema.parse(undefined);  // undefined
 *
 * @example
 * // Pass type first, then options
 * const schema = toValidString(z.string().min(2), { fallback: "N/A", preserve: false });
 * schema.parse("a");        // "N/A"
 * schema.parse("abc");      // "abc"
 * schema.parse(null);       // "N/A"
 *
 * @example
 * // Using custom type in options
 * const schema = toValidString({ type: z.email(), fallback: "empty" });
 * schema.parse("example@host.com"); // "example@host.com"
 * schema.parse("oops");             // "empty"
 * schema.parse(null);               // null
 * schema.parse(undefined);          // undefined
 */

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options: Omit<ToValidStringOptions<T, K>, "type"> & { allow: "none" },
): z.ZodPipe<z.ZodTransform<unknown, string>, z.ZodString>;

export function toValidString<T extends z.ZodType, K = null>(
  options: ToValidStringOptions<T, K> & { allow: "none" },
): z.ZodPipe<z.ZodTransform<unknown, string>, z.ZodString>;

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options: Omit<ToValidStringOptions<T, K>, "type"> & { preserve: false },
): z.ZodPipe<z.ZodTransform<unknown, string | K>, z.ZodString | z.ZodType<K>>;

export function toValidString<T extends z.ZodType, K = null>(
  options: ToValidStringOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform<unknown, string | K>, z.ZodString | z.ZodType<K>>;

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options: Omit<ToValidStringOptions<T, K>, "type"> & {
    allow: "optional";
    preserve: false;
  },
): z.ZodPipe<
  z.ZodTransform<unknown, string | K | undefined>,
  z.ZodOptional<z.ZodString | z.ZodType<K>>
>;

export function toValidString<T extends z.ZodType, K = null>(
  options: ToValidStringOptions<T, K> & {
    allow: "optional";
    preserve: false;
  },
): z.ZodPipe<
  z.ZodTransform<unknown, string | K | undefined>,
  z.ZodOptional<z.ZodString | z.ZodType<K>>
>;

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options: Omit<ToValidStringOptions<T, K>, "type"> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform<unknown, string | undefined>, z.ZodOptional<z.ZodString>>;

export function toValidString<T extends z.ZodType, K = null>(
  options: ToValidStringOptions<T, K> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform<unknown, string | undefined>, z.ZodOptional<z.ZodString>>;

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options: Omit<ToValidStringOptions<T, K>, "type"> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform<unknown, string | null>, z.ZodNullable<z.ZodString>>;

export function toValidString<T extends z.ZodType, K = null>(
  options: ToValidStringOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform<unknown, string | null>, z.ZodNullable<z.ZodString>>;

export function toValidString<T extends z.ZodType, K = null>(
  type: T,
  options?: Omit<ToValidStringOptions<T, K>, "type">,
): z.ZodPipe<
  z.ZodTransform<unknown, string | null | undefined>,
  z.ZodOptional<z.ZodNullable<z.ZodString>>
>;

export function toValidString<T extends z.ZodType, K = null>(
  options?: ToValidStringOptions<T, K>,
): z.ZodPipe<
  z.ZodTransform<unknown, string | null | undefined>,
  z.ZodOptional<z.ZodNullable<z.ZodString>>
>;

export function toValidString<T extends z.ZodType, K>(
  arg1: T | ToValidStringOptions<T, K> = {},
  arg2: ToValidStringOptions<T, K> = {},
) {
  const type = (arg1 instanceof z.ZodType ? arg1 : (arg1.type ?? arg2.type)) ?? z.string();
  const options = (arg1 instanceof z.ZodType ? arg2 : arg1) ?? {};
  const { fallback = null, allow = "nullish", preserve = true } = options;

  let finalSchema;
  switch (allow) {
    case "optional":
      finalSchema = type.or(z.custom<K>((val) => val === fallback)).optional();
      break;
    case "nullable":
      finalSchema = type.or(z.custom<K>((val) => val === fallback)).nullable();
      break;
    case "nullish":
      finalSchema = type.or(z.custom<K>((val) => val === fallback)).nullish();
      break;
    default:
      finalSchema = type;
  }

  return z.preprocess((val) => {
    if (
      (allow === "nullish" && val == null) ||
      (allow === "nullable" && val === null) ||
      (allow === "optional" && val === undefined)
    ) {
      return preserve ? val : fallback;
    }

    return String(val);
  }, finalSchema);
}

export default toValidString;
