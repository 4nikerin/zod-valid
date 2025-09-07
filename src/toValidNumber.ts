import { z } from "zod";

type ToValidNumberAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidNumber`
 */
type ToValidNumberOptions<T extends z.ZodType = z.ZodNumber, K = null> = {
  /**
   * Base Zod schema to apply to the input before coercion.
   * Default is `z.number()`.
   */
  type?: T;

  /**
   * Value to return when the input is invalid or an allowed empty value
   * (`null`/`undefined`) should be replaced (when `preserve: false`).
   * Default is `null`.
   */
  fallback?: K;

  /**
   * Controls which "empty" values are considered allowed:
   * - `"none"` — neither `null` nor `undefined` are allowed.
   * - `"optional"` — only `undefined` is considered allowed.
   * - `"nullable"` — only `null` is considered allowed.
   * - `"nullish"` — both `null` and `undefined` are considered allowed.
   *
   * Default is `"nullish"`.
   */
  allow?: ToValidNumberAllow;

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
 * Creates a Zod schema that coerces input values to numbers
 * and provides flexible handling of empty values (`null` / `undefined`)
 * and invalid inputs.
 *
 * Behavior:
 * - Converts valid inputs to numbers using `Number(val)`.
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered an allowed empty value.
 *   - `"nullable"` — only `null` is considered an allowed empty value.
 *   - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other value is converted to a number:
 *   - If the result is finite (`Number.isFinite(num)`), it is returned.
 *   - Otherwise, it is replaced with `fallback`.
 *
 * @param options Behavior options:
 *   - `type` — base Zod schema to apply. Default `z.number()`.
 *   - `fallback` — value returned when input is invalid or an allowed empty value should be replaced. Default `null`.
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`. Default `"nullish"`.
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback`. Default `true`.
 *
 * @returns A ZodPipe schema that:
 *   - Coerces valid inputs to numbers.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * const schema = toValidNumber();
 * schema.parse(42);        // 42
 * schema.parse("123");     // 123
 * schema.parse(null);      // null (default allow="nullish", preserve=true)
 *
 * @example
 * const schema = toValidNumber({ allow: "optional" });
 * schema.parse(null);      // null replaced with "null" logic → returns fallback if preserve=false
 * schema.parse(undefined); // undefined
 *
 * @example
 * const schema = toValidNumber({ allow: "nullable", fallback: 0, preserve: false });
 * schema.parse("oops");    // 0 (invalid string replaced with fallback)
 * schema.parse(null);      // 0
 *
 * @example
 * const schema = toValidNumber({ allow: "nullish", fallback: 99, preserve: false });
 * schema.parse("abc");     // 99 (invalid string → fallback)
 * schema.parse(null);      // 99
 * schema.parse(undefined); // 99
 */

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform,
  T extends z.ZodNumber
    ? z.ZodNumber | (K extends null | undefined ? z.ZodType<z.infer<T>> : z.ZodType<K>)
    : K extends null | undefined
      ? z.ZodType<z.infer<T>>
      : z.ZodType<K>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "optional" },
): z.ZodPipe<
  z.ZodTransform,
  z.ZodOptional<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<
  z.ZodTransform,
  z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options?: ToValidNumberOptions<T, K>,
): z.ZodPipe<
  z.ZodTransform,
  z.ZodOptional<z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>>
>;

export function toValidNumber<T extends z.ZodType, K>(options: ToValidNumberOptions<T, K> = {}) {
  const { type = z.number(), fallback = null, allow = "nullish", preserve = true } = options;

  let finalSchema;
  switch (allow) {
    case "none":
      finalSchema = type.or(z.custom<K>((val) => val === fallback && val != null));
      break;
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

    if (typeof val === "object") {
      return fallback;
    }

    const num = Number(val);

    return Number.isFinite(num) ? num : fallback;
  }, finalSchema);
}

export default toValidNumber;
