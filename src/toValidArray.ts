import { z } from "zod";

type ToValidArrayAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidArray`
 */
type ToValidArrayOptions<T extends z.ZodType, K = null> = {
  /**
   * Base Zod schema for the array elements.
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
  allow?: ToValidArrayAllow;

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
 * Creates a Zod schema that ensures input is an array of elements
 * matching `type`, with flexible handling of empty (`null`/`undefined`) and invalid values.
 *
 * Behavior:
 * - If input is not an array and not an allowed empty value, it is replaced with `fallback`.
 * - Controls which "empty" values are allowed using the `allow` option:
 *   - `"none"` — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is considered allowed.
 *   - `"nullable"` — only `null` is considered allowed.
 *   - `"nullish"` — both `null` and `undefined` are considered allowed.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - Any other invalid value (non-array) is replaced with `fallback`.
 *
 * @param options Behavior options:
 *   - `type` — Zod schema for array elements.
 *   - `fallback` — value returned instead of invalid input or replaced empty value (`preserve: false`; default `null`).
 *   - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
 *   - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).
 *
 * @returns A ZodPipe schema that validates arrays and applies the described rules.
 *
 * @example
 * const schema = toValidArray(z.string());
 * schema.parse(["a", "b"]); // ["a", "b"]
 * schema.parse(null);       // null (default allow="nullish", preserve=true)
 *
 * @example
 * const schema = toValidArray({ type: z.number(), allow: "optional" });
 * schema.parse(null);       // null
 * schema.parse(undefined);  // undefined
 *
 * @example
 * const schema = toValidArray({ type: z.number(), allow: "nullable", fallback: [], preserve: false });
 * schema.parse(null);       // null
 * schema.parse("oops");     // null
 */

export function toValidArray<T extends z.ZodType, K = null>(
  options: ToValidArrayOptions<T, K> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform,
  | z.ZodArray<T>
  | (K extends never[] ? z.ZodArray<T> : K extends null | undefined ? z.ZodArray<T> : z.ZodType<K>)
>;

export function toValidArray<T extends z.ZodType, K = null>(
  options: ToValidArrayOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, z.ZodArray<T> | (K extends never[] ? z.ZodArray<T> : z.ZodType<K>)>;

export function toValidArray<T extends z.ZodType, K = null>(
  options: ToValidArrayOptions<T, K> & { allow: "optional" },
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodOptional<z.ZodArray<T>>
    : z.ZodOptional<z.ZodUnion<[z.ZodArray<T>, z.ZodCustom<K, K>]>>
>;

export function toValidArray<T extends z.ZodType, K = null>(
  options: ToValidArrayOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodNullable<z.ZodArray<T>>
    : z.ZodNullable<z.ZodUnion<[z.ZodArray<T>, z.ZodCustom<K, K>]>>
>;

export function toValidArray<T extends z.ZodType, K = null>(
  options: ToValidArrayOptions<T, K>,
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodOptional<z.ZodNullable<z.ZodArray<T>>>
    : z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodArray<T>, z.ZodCustom<K, K>]>>>
>;

export function toValidArray<T extends z.ZodType, K>(options: ToValidArrayOptions<T, K>) {
  const { type, fallback = null, allow = "nullish", preserve = true } = options;

  const baseSchema = z.array(type);
  const isEmptyArray = Array.isArray(fallback) && fallback.length === 0;

  let finalSchema;
  switch (allow) {
    case "none":
      finalSchema = baseSchema.or(z.custom<K>((val) => val === fallback && val != null));
      break;
    case "optional":
      finalSchema = (
        isEmptyArray ? baseSchema : baseSchema.or(z.custom<K>((val) => val === fallback))
      ).optional();
      break;
    case "nullable":
      finalSchema = (
        isEmptyArray ? baseSchema : baseSchema.or(z.custom<K>((val) => val === fallback))
      ).nullable();
      break;
    case "nullish":
      finalSchema = (
        isEmptyArray ? baseSchema : baseSchema.or(z.custom<K>((val) => val === fallback))
      ).nullish();
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

    return Array.isArray(val) ? val : fallback;
  }, finalSchema);
}

export default toValidArray;
