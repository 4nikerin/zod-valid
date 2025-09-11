<p align="center">
  <h1 align="center">zod-valid</h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zod-valid">
    <img src="https://img.shields.io/npm/v/zod-valid.svg" alt="npm version"/>
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"/>
  </a>
</p>


A tiny helper library for [Zod](https://zod.dev) to safely normalize values to valid types with flexible handling of `null`, `undefined`, and fallback values.
Supports strings, numbers, booleans, ISO dates, enums, arrays and objects.

It is very important to validate data coming from the server on the client side, making it more resilient to various errors, including critical ones.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [toValidString](#tovalidstring)
  - [toValidNumber](#tovalidnumber)
  - [toValidISO](#tovalidiso)
  - [toValidBoolean](#tovalidboolean)
  - [toValidArray](#tovalidarray)
  - [toValidObject](#tovalidobject)
- [Utils](#utils)
  - [nonNullable](#nonnullable)
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
- Includes helpers: `toValidString`, `toValidNumber`, `toValidBoolean`, `toValidISO`, `toValidArray`.

## Installation

```bash
npm install zod-valid zod
```

## Usage

### toValidString

Creates a Zod schema that coerces any value to a string and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Usage forms:
- `toValidString(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidString(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- Converts any non-empty input to a string using `String(val)`.
- Allowed empty values (`null` / `undefined`) are controlled via allow and may be preserved or replaced with fallback.

Behavior options:
| Option    | Description                                                                                                         | Default        | Required |
|-----------|---------------------------------------------------------------------------------------------------------------------|----------------|----------|
| `type`    | Base Zod schema to apply.                                                                                           | `z.string()`   | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).                          | `null`         | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`    | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`.        | `true`         | No       |

Examples:
```ts
import { toValidString } from "zod-valid";

const schema = toValidString();
schema.parse("abc");                  // "abc"
schema.parse(123);                    // "123"
schema.parse(null);                   // null (default allow="nullish", preserve=true)

const schema = toValidString({ allow: "optional" });
schema.parse(null);                   // "null" (null is coerced to string)
schema.parse(undefined);              // undefined

const schema = toValidString(z.string().min(2), { fallback: "N/A", preserve: false });
schema.parse("a");                    // "N/A"
schema.parse("abc");                  // "abc"
schema.parse(null);                   // "N/A"

const schema = toValidString({ type: z.email(), fallback: "empty" });
schema.parse("example@hostname.com"); // "example@hostname.com"
schema.parse("oops");                 // "empty"
schema.parse(null);                   // null
schema.parse(undefined);              // undefined
```

### toValidNumber

Creates a Zod schema that coerces input values to numbers and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Usage forms:
- `toValidNumber(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidNumber(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- Converts values to numbers using `Number(val)`.
- Non-numeric or invalid values are replaced with `fallback` depending on `allow` and `preserve`.

Behavior options:
| Option    | Description                                                                                                         | Default        | Required |
|-----------|---------------------------------------------------------------------------------------------------------------------|----------------|----------|
| `type`    | Base Zod schema to apply.                                                                                           | `z.number()`   | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).                          | `null`         | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`    | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`.        | `true`         | No       |

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

const schemaTyped = toValidNumber(z.number().min(10), { fallback: 0 });
schemaTyped.parse(5);    // 0 (invalid, replaced with fallback)
schemaTyped.parse(20);   // 20

const schema = toValidNumber({ allow: "nullish", fallback: 99, preserve: false });
schema.parse("abc");     // 99 (invalid string → fallback)
schema.parse(null);      // 99
schema.parse(undefined); // 99
```

### toValidISO

Creates a Zod schema that coerces input to ISO 8601 date strings and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Usage forms:
- `toValidISO(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidISO(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- Converts valid string inputs to `ISO 8601` dates.
- Non-string or invalid values are replaced with `fallback` depending on `allow` and `preserve`.

Behavior options:
| Option    | Description                                                                                                         | Default             | Required |
|-----------|---------------------------------------------------------------------------------------------------------------------|--------------------|----------|
| `type`    | Base Zod schema to apply.                                                                                           | `z.iso.datetime()` | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).                          | `null`             | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`        | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`.        | `true`             | No       |

Examples:
```ts
import { toValidISO } from "zod-valid";

const schema = toValidISO();
schema.parse("2025-09-02 10:00"); // "2025-09-02T10:00:00Z"
schema.parse(null);               // null (default allow="nullish", preserve=true)

const schema = toValidISO({ allow: "optional" });
schema.parse(null);               // null (default fallback)
schema.parse(undefined);          // undefined

const schemaTyped = toValidISO(z.string().datetime(), { fallback: "1970-01-01T00:00:00Z" });
schemaTyped.parse("invalid");     // "1970-01-01T00:00:00Z"
schemaTyped.parse("2025-09-11");  // "2025-09-11T00:00:00.000Z"

const schema = toValidISO({ allow: "nullable", fallback: "N/A", preserve: false });
schemaFallback.parse("abc");      // "N/A"
schemaFallback.parse(null);       // "N/A"
schemaFallback.parse(undefined);  // "N/A"
```

### toValidBoolean

Creates a Zod schema that coerces input to boolean values and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Usage forms:
- `toValidBoolean(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidBoolean(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- Converts values to boolean ("true"/"false", numbers, objects).
- Allowed empty values (`null` / `undefined`) are controlled via allow and may be preserved or replaced.
- Other invalid values are coerced to `boolean` following the above rules.

Behavior options:
| Option    | Description                                                                                                         | Default        | Required |
|-----------|---------------------------------------------------------------------------------------------------------------------|----------------|----------|
| `type`    | Base Zod schema to apply.                                                                                           | `z.boolean()`  | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).                          | `null`         | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`    | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`.        | `true`         | No       |

Examples:
```ts
import { toValidBoolean } from "zod-valid";

const schema = toValidBoolean();
schema.parse("true");            // true
schema.parse("FALSE");           // false
schema.parse(1);                 // true
schema.parse(0);                 // false
schema.parse(null);              // null (default allow="nullish", preserve=true)

const schema = toValidBoolean({ allow: "optional" });
schema.parse(null);              // false
schema.parse(undefined);         // undefined

const schemaTyped = toValidBoolean(z.boolean(), { fallback: false });
schemaTyped.parse("true");       // true
schemaTyped.parse("oops");       // false

const schemaFallback = toValidBoolean({ allow: "nullish", fallback: false, preserve: false });
schemaFallback.parse(null);      // false
schemaFallback.parse(undefined); // false
schemaFallback.parse("oops");    // false
```

### toValidArray

Creates a Zod schema that ensures input is an array of elements matching `type`, with flexible handling of empty (`null`/`undefined`) and invalid values.

Usage forms:
- `toValidArray(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidArray(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- If input is not an array or is an invalid value, it is replaced with `fallback` (depending on `allow` and `preserve`).
- Allowed empty values (`null` / `undefined`) are controlled via `allow` and may be preserved or replaced.
- If `strict: true`, removes any elements that do **not** pass the `type` schema (invalid elements), as well as `null` and `undefined`, **but does not remove fallback values** if they are not `null` or `undefined`.

Behavior options:
| Option    | Description                                                                                               | Default            | Required |
|-----------|-----------------------------------------------------------------------------------------------------------|------------------|----------|
| `type`    | Zod schema for array elements. Can be passed either as the first argument (`toValidArray(z.string())`) or inside the options object (`toValidArray({ type: z.string() })`). | `z.array(z.never())` | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).               | `[]`             | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`        | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`. | `true`             | No       |
| `strict`  | Whether to strictly enforce the element schema:<br>- `true` — removes any elements that do **not** pass the `type` schema (invalid elements).<br>Also removes `null` and `undefined` values, even if allowed by `allow`.<br>**Does not remove fallback values** if they are not `null` or `undefined`.<br>- `false` — invalid elements and allowed empty values are preserved (or replaced by `fallback` if `preserve: false`). | `true`           | No       |

Examples:
```ts
import { toValidArray } from "zod-valid";

const schema = toValidArray(z.string());
schema.parse(["a", "b"]);              // ["a", "b"]
schema.parse(null);                    // null (allow="nullish", preserve=true)

const schemaTyped = toValidArray(z.number(), { allow: "optional" });
schemaTyped.parse([1, 2]);             // [1, 2]
schemaTyped.parse(undefined);          // undefined

const schema3 = toValidArray({ type: z.number(), allow: "nullable", fallback: [], preserve: false });
schema3.parse("oops");                 // []
schema3.parse(null);                   // []

const strictSchema = toValidArray({ type: z.number(), strict: true });
strictSchema.parse([1, "x", 2, null]); // [1, 2] — removes invalid values, null, and undefined; preserves fallback values
```

### toValidObject

Creates a Zod schema that ensures the input is a plain object (validated by `type`), with flexible handling of empty values (`null` / `undefined`) and a fallback value for invalid cases.

Usage forms:
- `toValidObject(type, options?)` — pass the base Zod schema as the first argument and options as the second.
- `toValidObject(options)` — pass only an options object, where options.type defines the base schema.

Behavior:
- If the input is a plain object ({}), it is validated against type.
- Non-object or invalid values are replaced with fallback depending on `allow` and `preserve`.

Behavior options:
| Option    | Description                                                                                  | Default                                | Required |
|-----------|----------------------------------------------------------------------------------------------|----------------------------------------|----------|
| `type`    | Base Zod schema for validating objects.                                                      | `z.object({}).catchall(z.any())` (any plain object) | No       |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).   | `null`                                 | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"` | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`. | `true` | No       |

Examples:
```ts
import { toValidArray } from "zod-valid";

const schemaNum = toValidObject({ type: z.object({ x: z.number() }) });
schemaNum.parse({ x: 42 });        // { x: 42 }
schemaNum.parse({ x: "oops" });    // null (invalid, replaced with fallback)

const schemaStrict = toValidObject(z.object({ id: z.string() }), { allow: "nullish" });
schemaStrict.parse({ id: "abc" }); // { id: "abc" }
schemaStrict.parse({ id: 123 });   // null (invalid, fallback applied)

const RoleEnum = z.enum(["admin", "user", "guest"]);
const schemaEnum = toValidObject({ type: RoleEnum, allow: "optional" });
schemaEnum.parse("admin");         // "admin"
schemaEnum.parse("superuser");     // null (invalid value -> fallback)
schemaEnum.parse(null);            // null (replaced with fallback, since null not allowed)
schemaEnum.parse(undefined);       // undefined

const schemaReplace = toValidObject({ type: z.object({}), allow: "nullish", fallback: {}, preserve: false });
schemaReplace.parse(null);         // {} (null allowed, but replaced with fallback)
schemaReplace.parse(undefined);    // {} (undefined allowed, but replaced with fallback)
schemaReplace.parse("oops");       // {} (invalid, replaced with fallback)
```

## Utils

### nonNullable

You can remove `null` and `undefined` from the result of an API call using the `nonNullable` utility. This utility adds a `z.transform` to the schema, removing `null` and `undefined` from the type and returning a custom error.

Behavior options:
| Option   | Description        | Default                        | Required |
|----------|------------------|--------------------------------|----------|
| `schema` | A Zod schema       | —                              | Yes      |
| `message`| Error message text | `"Cannot be null or undefined"` | No       |

Examples:
```ts
import z from "zod";
import { toValidString, toValidNumber } from "zod-valid";
import { nonNullable } from "zod-valid/utils";

const emailSchema = z.object({
  id: toValidNumber({ allow: "none", preserve: false }),
  name: toValidString(),
  surname: toValidString(),
  address: toValidString(),
});

/*
  {
    id: number;v
    name?: string | null | undefined;
    surname?: string | null | undefined;
    address?: string | null | undefined;
  }
*/
type Email = z.infer<typeof emailSchema>;

const formSchema = z.object({
  name: nonNullable(emailSchema.shape.name).refine((v) => v, "Name is required"),
  surname: emailSchema.shape.name.nonoptional(),
  address: nonNullable(emailSchema.shape.name).optional(),
});

/*
  {
    name: string;
    surname: string | null;
    address?: string | undefined;
  }
*/
type Form = z.infer<typeof formSchema>;

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
  toValidObject,
} from "zod-valid";

const ResponseSchema = toValidObject({
  type: z.object({
    users: toValidArray({
      type: toValidObject({
        type: z.object({
          id: toValidNumber({ allow: "none" }),
          name: toValidString(),
          email: toValidString({ type: z.email(), fallback: "N/A", preserve: false }),
          isActive: toValidBoolean(),
          createdAt: toValidISO(),
        }),
      }),
      preserve: false,
    })
  }),
});

// or more shorter

const ResponseSchema = toValidObject(z.object({
  users: toValidArray(
    toValidObject(z.object({
      id: toValidNumber({ allow: "none" }),
      name: toValidString(),
      email: toValidString(z.email(), { fallback: "N/A", preserve: false }),
      isActive: toValidBoolean(),
      createdAt: toValidISO(),
    })),
    {
      preserve: false,
    },
  )
}));

/*
  type ResponseType = {
    users: {
      id: number;
      name?: string | null | undefined;
      email: string;
      isActive?: boolean | null | undefined;
      createdAt?: string | null | undefined;
    }[]
  } | null | undefined
*/
type ResponseType = z.infer<typeof ResponseSchema>

async function getUser() {
  const response = await fetch("/api/users");
  const rawData = await response.json();
  const validData = ResponseSchema.parse(rawData);
  return validData;
}
```

## License

MIT © 2025 Nikerin Evgenii <4nikerin@gmail.com> (https://github.com/4nikerin)