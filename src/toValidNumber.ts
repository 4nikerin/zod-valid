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
 * @param typeOrOptions Either:
 *   - A base Zod schema to apply (`z.ZodNumber` or other `z.ZodType`), **or**
 *   - An options object (see below).
 *
 * @param [options] Behavior options (if `type` is passed as first argument):
 *   - `type` — base Zod schema to apply. Default `z.number()`.
 *   - `fallback` — value returned when input is invalid or an allowed empty value should be replaced. Default `null`.
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`). Default `"nullish"`.
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback`. Default `true`.
 *
 * @returns A ZodPipe schema that:
 *   - Coerces valid inputs to numbers.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * // Default usage
 * const schema = toValidNumber();
 * schema.parse(42);        // 42
 * schema.parse("123");     // 123
 * schema.parse(null);      // null (allow="nullish", preserve=true)
 *
 * @example
 * // Passing options only
 * const schemaOpt = toValidNumber({ allow: "optional" });
 * schemaOpt.parse(null);      // null → fallback if preserve=false
 * schemaOpt.parse(undefined); // undefined
 *
 * @example
 * // Passing type first, options second
 * const schemaTyped = toValidNumber(z.number().min(10), { fallback: 0 });
 * schemaTyped.parse(5);    // 0 (invalid, replaced with fallback)
 * schemaTyped.parse(20);   // 20
 *
 * @example
 * // With allow="nullish" and custom fallback
 * const schemaFallback = toValidNumber({ allow: "nullish", fallback: 99, preserve: false });
 * schemaFallback.parse("abc");     // 99
 * schemaFallback.parse(null);      // 99
 * schemaFallback.parse(undefined); // 99
 */

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  type: T,
  options: Omit<ToValidNumberOptions<T, K>, "type"> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform<
    unknown,
    T extends z.ZodNumber
      ? number | (K extends null | undefined ? z.infer<T> : K)
      : K extends null | undefined
        ? z.infer<T>
        : K
  >,
  T extends z.ZodNumber
    ? z.ZodNumber | (K extends null | undefined ? z.ZodType<z.infer<T>> : z.ZodType<K>)
    : K extends null | undefined
      ? z.ZodType<z.infer<T>>
      : z.ZodType<K>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform<
    unknown,
    T extends z.ZodNumber
      ? number | (K extends null | undefined ? z.infer<T> : K)
      : K extends null | undefined
        ? z.infer<T>
        : K
  >,
  T extends z.ZodNumber
    ? z.ZodNumber | (K extends null | undefined ? z.ZodType<z.infer<T>> : z.ZodType<K>)
    : K extends null | undefined
      ? z.ZodType<z.infer<T>>
      : z.ZodType<K>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  type: T,
  options: Omit<ToValidNumberOptions<T, K>, "type"> & { preserve: false },
): z.ZodPipe<
  z.ZodTransform<unknown, T extends z.ZodNumber ? number | K : K>,
  T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { preserve: false },
): z.ZodPipe<
  z.ZodTransform<unknown, T extends z.ZodNumber ? number | K : K>,
  T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  type: T,
  options: Omit<ToValidNumberOptions<T, K>, "type"> & { allow: "optional" },
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | undefined>,
  z.ZodOptional<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "optional" },
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | undefined>,
  z.ZodOptional<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  type: T,
  options: Omit<ToValidNumberOptions<T, K>, "type"> & { allow: "nullable" },
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | null>,
  z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options: ToValidNumberOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | null>,
  z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  type: T,
  options?: Omit<ToValidNumberOptions<T, K>, "type">,
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | null | undefined>,
  z.ZodOptional<z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>>
>;

export function toValidNumber<T extends z.ZodType = z.ZodNumber, K = null>(
  options?: ToValidNumberOptions<T, K>,
): z.ZodPipe<
  z.ZodTransform<unknown, (T extends z.ZodNumber ? number | K : K) | null | undefined>,
  z.ZodOptional<z.ZodNullable<T extends z.ZodNumber ? z.ZodNumber | z.ZodType<K> : z.ZodType<K>>>
>;

export function toValidNumber<T extends z.ZodType, K>(
  arg1: T | ToValidNumberOptions<T, K> = {},
  arg2: ToValidNumberOptions<T, K> = {},
) {
  const type = (arg1 instanceof z.ZodType ? arg1 : (arg1.type ?? arg2.type)) ?? z.number();
  const options = (arg1 instanceof z.ZodType ? arg2 : arg1) ?? {};
  const { fallback = null, allow = "nullish", preserve = true } = options;

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
