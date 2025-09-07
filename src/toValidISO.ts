import { z } from "zod";

type ToValidISOAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidISO`
 */
type ToValidISOOptions<T extends z.ZodType = z.ZodISODateTime, K = null> = {
  /**
   * Base Zod schema to apply to the input before coercion.
   * Default is `z.iso.datetime()`.
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
  allow?: ToValidISOAllow;

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
 * Creates a Zod schema that coerces input to ISO 8601 date strings
 * and provides flexible handling of empty values (`null` / `undefined`)
 * and invalid inputs.
 *
 * Behavior:
 * - Converts valid string inputs to ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`).
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered an allowed empty value.
 *   - `"nullable"` — only `null` is considered an allowed empty value.
 *   - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other value is processed:
 *   - Strings are parsed as dates. Invalid dates return `fallback`.
 *   - Non-strings return `fallback`.
 *
 * @param options Behavior options:
 *   - `type` — base Zod schema to apply. Default `z.iso.datetime()`.
 *   - `fallback` — value returned when input is invalid or an allowed empty value should be replaced. Default `null`.
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`. Default `"nullish"`.
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback`. Default `true`.
 *
 * @returns A ZodPipe schema that:
 *   - Coerces valid inputs to ISO 8601 strings.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * const schema = toValidISO();
 * schema.parse("2025-09-02T10:00:00Z");  // "2025-09-02T10:00:00Z"
 * schema.parse(null);                    // null (default allow="nullish", preserve=true)
 *
 * @example
 * const schema = toValidISO({ allow: "optional" });
 * schema.parse(undefined);               // undefined
 * schema.parse(null);                    // null (default fallback)
 *
 * @example
 * const schema = toValidISO({ allow: "nullable", fallback: "1970-01-01T00:00:00Z", preserve: false });
 * schema.parse(null);                    // "1970-01-01T00:00:00Z"
 * schema.parse("invalid");               // "1970-01-01T00:00:00Z"
 */

export function toValidISO<T extends z.ZodType = z.ZodISODateTime, K = null>(
  options: ToValidISOOptions<T, K> & { allow: "none" },
): z.ZodPipe<z.ZodTransform, z.ZodType<NonNullable<z.infer<T> | K>>>;

export function toValidISO<T extends z.ZodType = z.ZodISODateTime, K = null>(
  options: ToValidISOOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, z.ZodType<z.infer<T> | K>>;

export function toValidISO<T extends z.ZodType = z.ZodISODateTime, K = null>(
  options: ToValidISOOptions<T, K> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodType<z.infer<T> | K>>>;

export function toValidISO<T extends z.ZodType = z.ZodISODateTime, K = null>(
  options: ToValidISOOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform, z.ZodNullable<z.ZodType<z.infer<T> | K>>>;

export function toValidISO<T extends z.ZodType = z.ZodISODateTime, K = null>(
  options?: ToValidISOOptions<T, K>,
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodNullable<z.ZodType<z.infer<T> | K>>>>;

export function toValidISO<T extends z.ZodType, K>(options: ToValidISOOptions<T, K> = {}) {
  const { type = z.iso.datetime(), fallback = null, allow = "nullish", preserve = true } = options;

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

    if (typeof val === "string") {
      const d = new Date(val);

      if (Number.isNaN(d.getTime())) {
        return fallback;
      }

      return d.toISOString().replace(/\.\d{3}Z$/, "Z");
    }
    return fallback;
  }, finalSchema);
}

export default toValidISO;
