import { z } from "zod";

type ToValidArrayAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidArray`
 */
type ToValidArrayOptions<T extends z.ZodType, K = null, S extends boolean = false> = {
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
   * Controls which "empty" values are considered allowed in the array:
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

  /**
   * Whether to strictly enforce the element schema:
   * - `true` — removes any elements that do **not** pass the `type` schema (invalid elements).
   *            Also removes `null` and `undefined` values, even if allowed by `allow`.
   *            **Does not remove fallback values** if they are not `null` or `undefined`.
   * - `false` — invalid elements and allowed empty values are preserved (or replaced by `fallback` if `preserve: false`).
   *
   * Default is `false`.
   */
  strict?: S;
};

/**
 * Creates a Zod schema that ensures input is an array of elements
 * matching `type`, with flexible handling of empty (`null`/`undefined`)
 * and invalid values.
 *
 * Behavior:
 * - If input is not an array and not an allowed empty value, it is replaced with `fallback`.
 * - Controls which empty values are allowed using the `allow` option.
 * - If an empty value is allowed:
 *   - `preserve: true` — returns the empty value as-is.
 *   - `preserve: false` — replaces the empty value with `fallback`.
 * - If `strict: true`:
 *   - invalid elements are removed.
 *   - `null`/`undefined` are also removed regardless of `allow`.
 * - Any other invalid value (non-array) is replaced with `fallback`.
 *
 * @param options Behavior options:
 * - `type` — Zod schema for array elements.
 * - `fallback` — value returned instead of invalid input or replaced empty value. Default `null`.
 * - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`). Default `"nullish"`.
 * - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback`. Default `true`.
 * - `strict` — whether to strictly enforce the element schema:
 *   - `true` — removes invalid elements (those that do not match `type`) and also removes `null`/`undefined` even if allowed by `allow`.
 *     **Note:** fallback values that are not `null`/`undefined` are not removed.
 *   - `false` — invalid elements are preserved (or replaced by `fallback` if `preserve: false`).
 *     Default is `false`.
 *
 * @returns A ZodPipe schema that validates arrays and applies the described rules.
 *
 * @example
 * const schema = toValidArray({ type: z.string() });
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
 *
 * @example
 * const strictSchema = toValidArray({ type: z.number(), strict: true });
 * strictSchema.parse([1, "x", 2, null, undefined]); // [1, 2]
 */

export function toValidArray<T extends z.ZodType, K = null, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform,
  | z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>
  | (K extends never[]
      ? z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>
      : K extends null | undefined
        ? z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>
        : z.ZodType<K>)
>;

export function toValidArray<T extends z.ZodType, K = null, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S> & { preserve: false },
): z.ZodPipe<
  z.ZodTransform,
  | z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>
  | (K extends never[]
      ? z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>
      : z.ZodType<K>)
>;

export function toValidArray<T extends z.ZodType, K = null, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S> & { allow: "optional" },
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodOptional<z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>>
    : z.ZodOptional<
        z.ZodUnion<
          [z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>, z.ZodCustom<K, K>]
        >
      >
>;

export function toValidArray<T extends z.ZodType, K = null, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S> & { allow: "nullable" },
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodNullable<z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>>
    : z.ZodNullable<
        z.ZodUnion<
          [z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>, z.ZodCustom<K, K>]
        >
      >
>;

export function toValidArray<T extends z.ZodType, K = null, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S>,
): z.ZodPipe<
  z.ZodTransform,
  K extends never[]
    ? z.ZodOptional<
        z.ZodNullable<z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>>
      >
    : z.ZodOptional<
        z.ZodNullable<
          z.ZodUnion<
            [z.ZodArray<S extends true ? z.ZodType<NonNullable<z.infer<T>>> : T>, z.ZodCustom<K, K>]
          >
        >
      >
>;

export function toValidArray<T extends z.ZodType, K, S extends boolean = false>(
  options: ToValidArrayOptions<T, K, S>,
) {
  const { type, fallback = null, allow = "nullish", preserve = true, strict } = options;

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
    if (
      (allow === "nullish" && val == null) ||
      (allow === "nullable" && val === null) ||
      (allow === "optional" && val === undefined)
    ) {
      return preserve ? val : fallback;
    }

    if (Array.isArray(val)) {
      if (strict) {
        return val.filter((el) => {
          const res = type.safeParse(el);

          if (res.data == null) {
            return false;
          }

          return res.success;
        });
      }

      return val;
    }

    return fallback;
  }, finalSchema);
}

export default toValidArray;
