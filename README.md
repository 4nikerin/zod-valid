# zod-valid

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
  - [toValidEnum](#tovalidenum)
  - [toValidBoolean](#tovalidboolean)
  - [toValidArray](#tovalidarray)
  - [toValidObject](#tovalidobject)
- [Utils](#utils)
  - [nonnulable](#nonnulable)
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

Creates a Zod schema that coerces any value to a string and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts any non-empty input to a string using String(val).
- Allowed empty values (null / undefined) are controlled via allow and may be preserved or replaced with fallback.

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

Creates a Zod schema that coerces input values to numbers and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts values to numbers using Number(val).
- Non-numeric or invalid values are replaced with fallback depending on allow and preserve.

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

const schema = toValidNumber({ allow: "nullable", fallback: 0, preserve: false });
schema.parse("oops");    // 0 (invalid string replaced with fallback)
schema.parse(null);      // 0

const schema = toValidNumber({ allow: "nullish", fallback: 99, preserve: false });
schema.parse("abc");     // 99 (invalid string → fallback)
schema.parse(null);      // 99
schema.parse(undefined); // 99
```

### toValidISO

Creates a Zod schema that coerces input to ISO 8601 date strings and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts valid string inputs to ISO 8601 dates.
- Non-string or invalid values are replaced with fallback depending on allow and preserve.

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

Creates a Zod schema that validates values against a given enum and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Validates input against the provided enum (type).
- Non-enum or invalid values are replaced with fallback depending on allow and preserve.

Behavior options:
| Option    | Description                                                                                                         | Default        | Required |
|-----------|---------------------------------------------------------------------------------------------------------------------|----------------|----------|
| `type`    | Enum values to validate against.                                                                                   | —              | Yes      |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).                          | `null`         | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`    | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`.        | `true`         | No       |

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

Creates a Zod schema that coerces input to boolean values and provides flexible handling of empty values (`null` / `undefined`) and invalid inputs.

Behavior:
- Converts values to boolean ("true"/"false", numbers, objects).
- Allowed empty values (null / undefined) are controlled via allow and may be preserved or replaced.
- Other invalid values are coerced to boolean following the above rules.

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

Creates a Zod schema that ensures input is an array of elements matching `type`, with flexible handling of empty (`null`/`undefined`) and invalid values.

Behavior:
- If input is not an array or is an invalid value, it is replaced with fallback (depending on allow and preserve).
- Allowed empty values (null / undefined) are controlled via allow and may be preserved or replaced.

Behavior options:
| Option    | Description                                                                                               | Default        | Required |
|-----------|-----------------------------------------------------------------------------------------------------------|----------------|----------|
| `type`    | Zod schema for array elements.                                                                           | —              | Yes      |
| `fallback`| Value returned instead of invalid input or when replacing empty input (`preserve: false`).               | `null`         | No       |
| `allow`   | Defines which empty values are considered valid:<br>- `"none"` — neither `null` nor `undefined` allowed.<br>- `"optional"` — only `undefined` allowed.<br>- `"nullable"` — only `null` allowed.<br>- `"nullish"` — both `null` and `undefined` allowed. | `"nullish"`    | No       |
| `preserve`| Behavior for allowed empty values:<br>- `true` — return them as-is.<br>- `false` — replace with `fallback`. | `true`         | No       |


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

### toValidObject

Creates a Zod schema that ensures the input is a plain object (validated by `type`), with flexible handling of empty values (`null` / `undefined`) and a fallback value for invalid cases.

Behavior:
- If the input is a plain object ({}), it is validated against type.
- Non-object or invalid values are replaced with fallback depending on allow and preserve.

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
schemaNum.parse({ x: 42 });    // { x: 42 }
schemaNum.parse({ x: "oops" }); // null (invalid, replaced with fallback)

const schemaOpt = toValidObject({ type: z.object({}), allow: "optional" });
schemaOpt.parse(undefined); // undefined
schemaOpt.parse(null);      // null (replaced with fallback, since null not allowed)

const schemaReplace = toValidObject({ type: z.object({}), allow: "nullish", fallback: {}, preserve: false });
schemaReplace.parse(null);      // {} (null allowed, but replaced with fallback)
schemaReplace.parse(undefined); // {} (undefined allowed, but replaced with fallback)
schemaReplace.parse("oops");    // {} (invalid, replaced with fallback)
```

## Utils

### nonnulable

You can remove `null` and `undefined` from the result of an API call using the `nonnulable` utility. This utility adds a `z.transform` to the schema, removing `null` and `undefined` from the type and returning a custom error.

Behavior options:
| Option   | Description        | Default                        | Required |
|----------|------------------|--------------------------------|----------|
| `schema` | A Zod schema       | —                              | Yes      |
| `message`| Error message text | `"Cannot be null or undefined"` | No       |

Examples:
```ts
import z from "zod";
import { toValidString, toValidNumber } from "zod-valid";
import { nonnulable } from "zod-valid/utils";

const emailSchema = z.object({
  id: toValidNumber({ allow: "none", preserve: false }),
  name: toValidString(),
  surname: toValidString(),
  address: toValidString(),
});

/*
  {
    id: number;
    name?: string | null | undefined;
    surname?: string | null | undefined;
    address?: string | null | undefined;
  }
*/
type Email = z.infer<typeof emailSchema>;

const formSchema = z.object({
  name: nonnulable(emailSchema.shape.name).refine((v) => v, "Name is required"),
  surname: emailSchema.shape.name.nonoptional(),
  address: nonnulable(emailSchema.shape.name).optional(),
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

const ResponseSchema = toValidArray({
  type: toValidObject({
    type: z.object({
      id: toValidNumber({ allow: "none", fallback: 0 }),
      name: toValidString(),
      email: toValidString({ type: z.email(), fallback: "N/A" }),
      isActive: toValidBoolean(),
      createdAt: toValidISO(),
    }),
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