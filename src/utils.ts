import z from "zod";

export function nonNullable<T extends z.ZodTypeAny>(schema: T, message?: string) {
  return schema.transform((val, ctx) => {
    if (val == null) {
      ctx.addIssue({
        code: "custom",
        message: message ?? "Cannot be null or undefined",
      });
      return z.NEVER;
    }
    return val;
  });
}
