import { z } from "zod";

type ToValidEnumAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidEnum`
 */
type ToValidEnumOptions<T extends { [k: string]: string | number }, K = null> = {
  /**
   * Enum values to validate against. Must be a non-empty object with string or number values.
   */
  type: T;

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
  allow?: ToValidEnumAllow;

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
 * Creates a Zod schema that validates values against a given enum
 * and provides flexible handling of empty values (`null` / `undefined`)
 * and invalid inputs.
 *
 * Behavior:
 * - Validates input against the provided enum (`type`).
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered an allowed empty value.
 *   - `"nullable"` — only `null` is considered an allowed empty value.
 *   - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other value not in the enum returns `fallback`.
 *
 * @param options Behavior options:
 *   - `type` — enum values to validate against.
 *   - `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).
 *
 * @returns A ZodPipe schema that:
 *   - Validates input against the enum.
 *   - Optionally wraps with `.optional()`, `.nullable()`, or `.nullish()` based on `allow`.
 *
 * @example
 * const schema = toValidEnum({ a: "A", b: "B" });
 * schema.parse("A");        // "A"
 * schema.parse("C");        // null (default fallback)
 * schema.parse(null);       // null (default allow="nullish", preserve=true)
 *
 * @example
 * const schema = toValidEnum({ a: "A", b: "B" }, { allow: "optional" });
 * schema.parse(undefined);  // undefined
 * schema.parse(null);       // fallback (null coerced if preserve=false)
 *
 * @example
 * const schema = toValidEnum({ a: "A", b: "B" }, { allow: "nullable", fallback: "A", preserve: false });
 * schema.parse(null);       // "A"
 * schema.parse("C");        // "A" (invalid value → fallback)
 */

export function toValidEnum<T extends { [k: string]: string | number }, K = null>(
  options: ToValidEnumOptions<T, K> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform,
  NonNullable<
    | z.ZodEnum<T>
    | (K extends never[] ? z.ZodEnum<T> : K extends null | undefined ? z.ZodEnum<T> : z.ZodType<K>)
  >
>;

export function toValidEnum<T extends { [k: string]: string | number }, K = null>(
  options: ToValidEnumOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, z.ZodEnum<T> | z.ZodType<K>>;

export function toValidEnum<T extends { [k: string]: string | number }, K = null>(
  options: ToValidEnumOptions<T, K> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodUnion<[z.ZodEnum<T>, z.ZodCustom<K, K>]>>>;

export function toValidEnum<T extends { [k: string]: string | number }, K = null>(
  options: ToValidEnumOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform, z.ZodNullable<z.ZodUnion<[z.ZodEnum<T>, z.ZodCustom<K, K>]>>>;

export function toValidEnum<T extends { [k: string]: string | number }, K = null>(
  options: ToValidEnumOptions<T, K>,
): z.ZodPipe<
  z.ZodTransform,
  z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodEnum<T>, z.ZodCustom<K, K>]>>>
>;

export function toValidEnum<T extends { [k: string]: string | number }, K>(
  options: ToValidEnumOptions<T, K>,
) {
  const { type, fallback = null, allow = "nullish", preserve = true } = options;

  const baseSchema = z.enum(type);

  let finalSchema;
  switch (allow) {
    case "none":
      finalSchema = baseSchema.or(z.custom<K>((val) => val === fallback && val != null)).optional();
      break;
    case "optional":
      finalSchema = baseSchema.or(z.custom<K>((val) => val === fallback)).optional();
      break;
    case "nullable":
      finalSchema = baseSchema.or(z.custom<K>((val) => val === fallback)).nullable();
      break;
    case "nullish":
      finalSchema = baseSchema.or(z.custom<K>((val) => val === fallback)).nullish();
      break;
    default:
      finalSchema = baseSchema;
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

    const result = baseSchema.safeParse(val);

    return result.success ? val : fallback;
  }, finalSchema);
}

export default toValidEnum;
