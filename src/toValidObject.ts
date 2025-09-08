import { z } from "zod";

type ToValidObjectAllow = "none" | "optional" | "nullable" | "nullish";

/**
 * Options for configuring the behavior of `toValidObject`.
 */
type ToValidObjectOptions<T extends z.ZodObject, K = null> = {
  /**
   * Base Zod schema used to validate plain objects.
   *
   * Defaults to `z.object({}).catchall(z.any())` (accepts any key-value pairs).
   */
  type?: T;

  /**
   * Replacement value returned when the input is invalid, or when an allowed
   * empty value (`null`/`undefined`) is replaced because `preserve` is `false`.
   *
   * Defaults to `null`.
   */
  fallback?: K;

  /**
   * Defines which "empty" values are considered allowed:
   * - `"none"`     — neither `null` nor `undefined` are allowed.
   * - `"optional"` — only `undefined` is allowed.
   * - `"nullable"` — only `null` is allowed.
   * - `"nullish"`  — both `null` and `undefined` are allowed.
   *
   * Defaults to `"nullish"`.
   */
  allow?: ToValidObjectAllow;

  /**
   * Controls how allowed empty values are handled:
   * - `true`  — return the empty value (`null` or `undefined`) as-is.
   * - `false` — replace the empty value with `fallback`.
   *
   * Defaults to `true`.
   */
  preserve?: boolean;
};

/**
 * Creates a Zod schema that ensures the input is a **plain object**
 * (validated by `type`), with flexible handling of empty values
 * (`null` / `undefined`) and a fallback value for invalid cases.
 *
 * Behavior:
 * - If the input is a plain object (`{}`), it is validated against `type`.
 * - If the input is not an object:
 *   - If it matches the allowed `allow` values (`null` / `undefined`),
 *     then either the original value is returned (`preserve: true`) or it is replaced
 *     with `fallback` (`preserve: false`).
 *   - Otherwise, the value is replaced with `fallback`.
 *
 * @param options Behavior options:
 * - `type` — Base Zod schema for validating objects. Default: `z.object({}).catchall(z.any())` (any plain object).
 * - `fallback` — Value returned instead of invalid input or replaced empty input (`preserve: false`). Default: `null`.
 * - `allow` — Which empty values are considered valid:
 *   - `"none"`     — neither `null` nor `undefined` are allowed.
 *   - `"optional"` — only `undefined` is allowed.
 *   - `"nullable"` — only `null` is allowed.
 *   - `"nullish"`  — both `null` and `undefined` are allowed.
 *   Default: `"nullish"`.
 * - `preserve` — What to do with allowed empty values:
 *   - `true`  — return them as-is.
 *   - `false` — replace them with `fallback`.
 *   Default: `true`.
 *
 * @returns A ZodPipe schema that:
 * Validates plain objects and applies the described rules.
 *
 * @example
 * // Basic usage: any plain object
 * const schema = toValidObject();
 * schema.parse({ a: 1 }); // { a: 1 }
 * schema.parse([1, 2]);   // null (fallback, not a plain object)
 * schema.parse(null);     // null (allow="nullish", preserve=true)
 *
 * @example
 * // With type: only objects with numeric values
 * const schemaNum = toValidObject({ type: z.object({ x: z.number() }) });
 * schemaNum.parse({ x: 42 });    // { x: 42 }
 * schemaNum.parse({ x: "oops" }); // null (invalid, replaced with fallback)
 *
 * @example
 * // With allow="optional"
 * const schemaOpt = toValidObject({ type: z.object({}), allow: "optional" });
 * schemaOpt.parse(undefined); // undefined
 * schemaOpt.parse(null);      // null (replaced with fallback, since null not allowed)
 *
 * @example
 * // With allow="nullable" and custom fallback
 * const schemaNull = toValidObject({ type: z.object({}), allow: "nullable", fallback: {} });
 * schemaNull.parse(null);   // null (allowed)
 * schemaNull.parse("oops"); // {} (invalid, replaced with fallback)
 *
 * @example
 * // With preserve: false
 * const schemaReplace = toValidObject({ type: z.object({}), allow: "nullish", fallback: {}, preserve: false });
 * schemaReplace.parse(null);      // {} (null allowed, but replaced with fallback)
 * schemaReplace.parse(undefined); // {} (undefined allowed, but replaced with fallback)
 * schemaReplace.parse("oops");    // {} (invalid, replaced with fallback)
 *
 * @example
 * // With strict schema and preserve: true
 * const schemaStrict = toValidObject({ type: z.object({ id: z.string() }), allow: "nullish" });
 * schemaStrict.parse({ id: "abc" }); // { id: "abc" }
 * schemaStrict.parse({ id: 123 });   // null (invalid, fallback applied)
 */

export function toValidObject<T extends z.ZodObject, K = null>(
  options: ToValidObjectOptions<T, K> & { allow: "none" },
): z.ZodPipe<
  z.ZodTransform,
  T | (K extends never[] ? T : K extends null | undefined ? T : z.ZodType<K>)
>;

export function toValidObject<T extends z.ZodObject, K = null>(
  options: ToValidObjectOptions<T, K> & { preserve: false },
): z.ZodPipe<z.ZodTransform, T | z.ZodType<K>>;

export function toValidObject<T extends z.ZodObject, K = null>(
  options: ToValidObjectOptions<T, K> & { allow: "optional" },
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodUnion<[T, z.ZodCustom<K, K>]>>>;

export function toValidObject<T extends z.ZodObject, K = null>(
  options: ToValidObjectOptions<T, K> & { allow: "nullable" },
): z.ZodPipe<z.ZodTransform, z.ZodNullable<z.ZodUnion<[T, z.ZodCustom<K, K>]>>>;

export function toValidObject<T extends z.ZodObject, K = null>(
  options?: ToValidObjectOptions<T, K>,
): z.ZodPipe<z.ZodTransform, z.ZodOptional<z.ZodNullable<z.ZodUnion<[T, z.ZodCustom<K, K>]>>>>;

export function toValidObject<T extends z.ZodObject, K>(options: ToValidObjectOptions<T, K> = {}) {
  const {
    type = z.object({}).catchall(z.any()),
    fallback = null,
    allow = "nullish",
    preserve = true,
  } = options;

  let finalSchema;
  switch (allow) {
    case "none":
      finalSchema = z.union([type, z.custom<K>((val) => val === fallback && val != null)]);
      break;
    case "optional":
      finalSchema = z.union([type, z.custom<K>((val) => val === fallback)]).optional();
      break;
    case "nullable":
      finalSchema = z.union([type, z.custom<K>((val) => val === fallback)]).nullable();
      break;
    case "nullish":
      finalSchema = z.union([type, z.custom<K>((val) => val === fallback)]).nullish();
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

    if (Object.prototype.toString.call(val) === "[object Object]") {
      const result = type.safeParse(val);

      return result.success ? val : fallback;
    }

    return fallback;
  }, finalSchema);
}

export default toValidObject;
