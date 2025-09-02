# zod-valid

A tiny helper library for [Zod](https://zod.dev) to safely normalize values to valid types with flexible handling of `null`, `undefined`, and fallback values.
Supports strings, numbers, booleans, ISO dates, enums, and arrays.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [toValidString](#tovalidstring)
  - [toValidNumber](#tovalidnumber)
  - [toValidISO](#tovalidiso)
  - [toValidEnum](#tovalidenum)
  - [toValidBoolean](#tovalidboolean)
  - [toValidArray](#tovalidarray)
- [Examples](#examples)
- [License](#license)

## Features

- Coerce any value to a valid type.
- Fine-grained control over empty values (`null` / `undefined`):
  - `none` — disallow both.
  - `optional` — allow only `undefined`.
  - `nullable` — allow only `null`.
  - `nullish` — allow both.
- Optionally replace empty values with a `fallback`.
- Works with custom base schemas (`z.string().min(3)` etc.).
- Includes helpers: `toValidString`, `toValidNumber`, `toValidBoolean`, `toValidISO`, `toValidEnum`, `toValidArray`.

## Installation

```bash
npm install zod-valid zod
```

## Usage

### toValidString

Options to configure the behavior of `toValidString`:
- `type` - base Zod schema to apply to the input before coercion. Default is `z.string()`.
- `fallback` - Value to return when the input is invalid or when an allowed empty value (`null`/`undefined`) should be replaced (if `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are allowed:
  - `"none"` — neither `null` nor `undefined` is allowed.
  - `"optional"` — only `undefined` is allowed.
  - `"nullable"` — only `null` is allowed.
  - `"nullish"` — both `null` and `undefined` are allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values:
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that coerces any value to a string and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts any input to a string (`String(val)`), unless it is an allowed empty value.
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered as allowed empty value.
  - `"nullable"` — only `null` is considered as allowed empty value.
  - `"nullish"` — both `null` and `undefined` are considered as allowed empty values.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other value is coerced to a string using `String(val)`.

Behavior options:
- `type` — base Zod schema to apply (default `z.string()`).
- `fallback` — value to return when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
- `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
- `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidString } from "zod-valid";

const schema = toValidString();
schema.parse("abc");                  // "abc"
schema.parse(123);                    // "123"
schema.parse(null);                   // null  (default allow="nullish", preserve=true)

const schema = toValidString({ allow: "optional" });
schema.parse(null);                   // "null"  (null is coerced to string)
schema.parse(undefined);              // undefined

const schema = toValidString({ allow: "nullable", fallback: "N/A", preserve: false });
schema.parse(null);                   // "N/A"
schema.parse("test");                 // "test"

const schema = toValidString({ allow: "nullish", fallback: "empty", preserve: false });
schema.parse(null);                   // "empty"
schema.parse(undefined);              // "empty"

const schema = toValidString({ type: z.email(), fallback: "empty" });
schema.parse("example@hostname.com"); // "example@hostname.com"
schema.parse("hello");                // "empty"
schema.parse(null);                   // null
schema.parse(undefined);              // undefined
```

### toValidNumber

Options for configuring the behavior of `toValidNumber`:
- `type` - base Zod schema to apply to the input before coercion. Default is `z.number()`.
- `fallback` - value to return when the input is invalid or an allowed empty value (`null`/`undefined`) should be replaced (when `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are considered allowed:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values:
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that coerces input values to numbers and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts valid inputs to numbers using `Number(val)`.
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered an allowed empty value.
  - `"nullable"` — only `null` is considered an allowed empty value.
  - `"nullish"` — both `null` and `undefined` are considered allowed empty values.

  Default is `"nullish"`.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other value is converted to a number:
  - If the result is finite (`Number.isFinite(num)`), it is returned.
  - Otherwise, it is replaced with `fallback`.

Behavior options:
  - `type` — base Zod schema to apply (default `z.number()`).
  - `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
  - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
  - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidNumber } from "zod-valid";

const schema = toValidNumber();
schema.parse(42);        // 42
schema.parse("123");     // 123
schema.parse(null);      // null (default allow="nullish", preserve=true)

const schema = toValidNumber({ allow: "optional" });
schema.parse(null);      // null replaced with "null" logic → returns fallback if preserve=false
schema.parse(undefined); // undefined

const schema = toValidNumber({ allow: "nullable", fallback: 0, preserve: false });
schema.parse("oops");    // 0 (invalid string replaced with fallback)
schema.parse(null);      // 0

const schema = toValidNumber({ allow: "nullish", fallback: 99, preserve: false });
schema.parse("abc");     // 99 (invalid string → fallback)
schema.parse(null);      // 99
schema.parse(undefined); // 99
```

### toValidISO

Options for configuring the behavior of `toValidISO`:
- `type` - base Zod schema to apply to the input before coercion. Default is `z.iso.datetime()`.
- `fallback` - value to return when the input is invalid or an allowed empty value (`null`/`undefined`) should be replaced (when `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are considered allowed:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values:
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that coerces input to ISO 8601 date strings and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts valid string inputs to ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`).
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered an allowed empty value.
  - `"nullable"` — only `null` is considered an allowed empty value.
  - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other value is processed:
  - Strings are parsed as dates. Invalid dates return `fallback`.
  - Non-strings return `fallback`.

Behavior options:
  - `type` — base Zod schema to apply (default `z.iso.datetime()`).
  - `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
  - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
  - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidISO } from "zod-valid";

const schema = toValidISO();
schema.parse("2025-09-02 10:00");  // "2025-09-02T10:00:00Z"
schema.parse(null);                // null (default allow="nullish", preserve=true)

const schema = toValidISO({ allow: "optional" });
schema.parse(null);                // null (default fallback)
schema.parse(undefined);           // undefined

const schema = toValidISO({ allow: "nullable", fallback: "1970-01-01T00:00:00Z", preserve: false });
schema.parse(null);                // "1970-01-01T00:00:00Z"
schema.parse("invalid");           // "1970-01-01T00:00:00Z"
```

### toValidEnum

Options for configuring the behavior of `toValidEnum`:
- `type` - enum values to validate against. Must be a non-empty object with string or number values.
- `fallback` - value to return when the input is invalid or an allowed empty value (`null`/`undefined`) should be replaced (when `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are considered allowed:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values:
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that validates values against a given enum and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Validates input against the provided enum (`type`).
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered an allowed empty value.
  - `"nullable"` — only `null` is considered an allowed empty value.
  - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other value not in the enum returns `fallback`.

Behavior options:
- `type` — enum values to validate against.
- `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
- `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
- `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidEnum } from "zod-valid";

const schema = toValidEnum({ type: { a: "A", b: "B" } });
schema.parse("A");        // "A"
schema.parse("C");        // null (default fallback)
schema.parse(null);       // null (default allow="nullish", preserve=true)

const schema = toValidEnum({ type: { a: "A", b: "B" }, allow: "optional" });
schema.parse(null);       // null (default fallback)
schema.parse(undefined);  // undefined

const schema = toValidEnum({ type: { a: "A", b: "B" }, allow: "nullable", fallback: "A", preserve: false });
schema.parse("C");        // "A" (invalid value → fallback)
schema.parse(null);       // null
```

### toValidBoolean

Options for configuring the behavior of `toValidBoolean`:
- `type` - base Zod schema to apply to the input before coercion. Default is `z.boolean()`.
- `fallback` - value to return when the input is invalid or an allowed empty value (`null`/`undefined`) should be replaced (when `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are considered allowed:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that coerces input to boolean values and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts strings like `"true"`/`"false"` to boolean.
- Converts numbers to boolean (`0` → `false`, others → `true`).
- Objects with keys are treated as `true`, empty objects as `false`.
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered an allowed empty value.
  - `"nullable"` — only `null` is considered an allowed empty value.
  - `"nullish"` — both `null` and `undefined` are considered allowed empty values.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other invalid value is coerced to boolean following the rules above.

Behavior options:
- `type` — base Zod schema to apply (default `z.boolean()`).
- `fallback` — value returned when input is invalid or an allowed empty value should be replaced (`preserve: false`; default `null`).
- `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
- `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidBoolean } from "zod-valid";

const schema = toValidBoolean();
schema.parse("true");      // true
schema.parse("FALSE");     // false
schema.parse(1);           // true
schema.parse(0);           // false
schema.parse(null);        // null (default allow="nullish", preserve=true)

const schema = toValidBoolean({ allow: "optional" });
schema.parse(null);        // false
schema.parse(undefined);   // undefined

const schema = toValidBoolean({ allow: "nullable", fallback: true, preserve: false });
schema.parse(null);        // true
schema.parse("invalid");   // true (invalid → fallback)
```

### toValidArray

Options for configuring the behavior of `toValidArray`:
- `type` - base Zod schema for the array elements.
- `fallback` - value to return when the input is invalid or an allowed empty value (`null`/`undefined`) should be replaced (when `preserve: false`). Default is `null`.
- `allow` - controls which "empty" values are considered allowed:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.

  Default is `"nullish"`.
- `preserve` - determines what happens with allowed empty values:
  - `true`  — returns the empty value (`null` or `undefined`) as-is.
  - `false` — replaces the empty value with `fallback`.

  Default is `true`.

Creates a Zod schema that ensures input is an array of elements matching `type`, with flexible handling of empty (`null`/`undefined`) and invalid values.

Behavior:
- If input is not an array and not an allowed empty value, it is replaced with `fallback`.
- Controls which "empty" values are allowed using the `allow` option:
  - `"none"` — neither `null` nor `undefined` are allowed.
  - `"optional"` — only `undefined` is considered allowed.
  - `"nullable"` — only `null` is considered allowed.
  - `"nullish"` — both `null` and `undefined` are considered allowed.
- If an empty value is allowed:
  - `preserve: true` — returns the empty value as-is.
  - `preserve: false` — replaces the empty value with `fallback`.
- Any other invalid value (non-array) is replaced with `fallback`.

Behavior options:
  - `type` — Zod schema for array elements.
  - `fallback` — value returned instead of invalid input or replaced empty value (`preserve: false`; default `null`).
  - `allow` — which empty values are allowed (`"none"`, `"optional"`, `"nullable"`, `"nullish"`; default `"nullish"`).
  - `preserve` — whether to return allowed empty values as-is (`true`) or replace them with `fallback` (`false`; default `true`).

Examples:
```ts
import { toValidArray } from "zod-valid";

const schema = toValidArray(z.string());
schema.parse(["a", "b"]); // ["a", "b"]
schema.parse(null);       // null (default allow="nullish", preserve=true)

const schema = toValidArray({ type: z.coerce.number(), allow: "optional" });
schema.parse(null);       // null
schema.parse(undefined);  // undefined

const schema = toValidArray({ type: z.number(), allow: "nullable", fallback: [], preserve: false });
schema.parse(null);       // null
schema.parse("oops");     // null
```

## Examples

ℹ️ You can find all possible usage examples for each function in the [tests folder](./tests).

```ts
import { z } from "zod";
import {
  toValidNumber,
  toValidString,
  toValidISO,
  toValidArray,
  toValidBoolean,
} from "zod-valid";

const ResponseSchema = toValidArray({
  type: z.object({
    id: toValidNumber({ allow: "none", fallback: 0 }),
    name: toValidString(),
    email: toValidString({ type: z.email(), fallback: "N/A" }),
    isActive: toValidBoolean(),
    createdAt: toValidISO(),
  }),
  fallback: [],
  preserve: false,
});

async function getUser() {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const rawData = await response.json();
  const validData = ResponseSchema.parse(rawData);

  return validData.filter((user) => user.id > 0);
}
```

## License

MIT © 2025 Nikerin Evgenii <4nikerin@gmail.com> (https://github.com/4nikerin)