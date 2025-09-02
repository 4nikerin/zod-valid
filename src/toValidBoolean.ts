import { z } from "zod";

type ToValidBooleanAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidBoolean`
 */
type ToValidBooleanOptions<T extends z.ZodType = z.ZodBoolean, K = null> = {
  /**
   * Base Zod schema to apply to the input before coercion.
   * Default is `z.boolean()`.
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
  allow?: ToValidBooleanAllow;

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
 * Creates a Zod schema that coerces input to boolean values
 * and provides flexible handling of empty values (`null` / `undefined`)
 * and invalid inputs.
 *
 * Behavior:
 * - Converts strings like `"true"`/`"false"` to boolean.
 * - Converts numbers to boolean (`0` → `false`, others → `true`).
 * - Objects with keys are treated as `true`, empty objects as `false`.
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered an allowed empty value.
 *   - `"nullable"` — only `null` is considered an allowed empty value.
 *   - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other invalid value is coerced to boolean following the rules above.
 *
 * @param options Behavior options:
 *   - `type` — base Zod schema to apply (default `z.boolean()`).
 *   - `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).
 *
 * @returns A ZodPipe schema that:
 *   - Coerces valid inputs to boolean.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * const schema = toValidBoolean();
 * schema.parse("true");      // true
 * schema.parse("FALSE");     // false
 * schema.parse(1);           // true
 * schema.parse(0);           // false
 * schema.parse(null);        // null (default allow="nullish", preserve=true)
 *
 * @example
 * const schema = toValidBoolean({ allow: "optional" });
 * schema.parse(undefined);   // undefined
 * schema.parse(null);        // fallback (null coerced if preserve=false)
 *
 * @example
 * const schema = toValidBoolean({ allow: "nullable", fallback: true, preserve: false });
 * schema.parse(null);        // true
 * schema.parse("invalid");   // true (invalid → fallback)
 */

export function toValidBoolean<T extends z.ZodType = z.ZodBoolean, K = null>(
  options: ToValidBooleanOptions<T, K> & { allow: "none" },
): z.ZodPipe<z.ZodTransform, z.ZodType<z.infer<T>>>;

export function toValidBoolean<T extends z.ZodType = z.ZodBoolean, K = null>(
  options: ToValidBooleanOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, z.ZodType<z.infer<T>> | z.ZodType<K>>;

export function toValidBoolean<T extends z.ZodType = z.ZodBoolean, K = null>(
  options: ToValidBooleanOptions<T, K> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodType<z.infer<T>>>>;

export function toValidBoolean<T extends z.ZodType = z.ZodBoolean, K = null>(
  options: ToValidBooleanOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform, z.ZodNullable<z.ZodType<z.infer<T>>>>;

export function toValidBoolean<T extends z.ZodType = z.ZodBoolean, K = null>(
  options?: ToValidBooleanOptions<T, K>,
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodNullable<z.ZodType<z.infer<T>>>>>;

export function toValidBoolean<T extends z.ZodType, K>(options: ToValidBooleanOptions<T, K> = {}) {
  const { type = z.boolean(), fallback = null, allow = "nullish", preserve = true } = options;

  let finalSchema;
  switch (allow) {
    case "none":
      finalSchema = type.or(z.custom<K>((val) => val === fallback && val != null)).optional();
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
    if (allow === "nullish" && val == null) {
      return preserve ? val : fallback;
    }

    if (allow === "nullable" && val === null) {
      return preserve ? val : fallback;
    }

    if (allow === "optional" && val === undefined) {
      return preserve ? val : fallback;
    }

    if (typeof val === "object") {
      return Object.keys(val ?? []).length > 0;
    }

    const strVal = String(val).trim().toLowerCase();

    if (strVal === "true") return true;
    if (strVal === "false") return false;

    return Boolean(Number(strVal));
  }, finalSchema);
}

export default toValidBoolean;
