# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the
http://ithkuil.net/newithkuil_lexicon.pdf.

Currently it does not include the affixes like `-řst` but is planned in the
future.

## Format

```ts
type Specs = {
  /** basic */
  "BSC": string;
  /** contential */
  "CTE": string;
  /** constitutive */
  "CSV": string;
  /** objective */
  "OBJ": string;
};

type Root = {
  root: string;
  refers?: string;
  stems?: [
    Specs | string,
    Specs | string,
    Specs | string,
  ];
  /** Notes in markdown format */
  notes?: string;
  /** See the root below if the stems are empty as they may have similar rules */
  see?: string;
}[];

type Lexicon = Array<Root>;
```

## Progress

|                           | Roots | Additional Roots | Stem & Spec | Notes |
| ------------------------- | ----- | ---------------- | ----------- | ----- |
| Chapter 1                 | ✅    | ✅               | ✅          | ✅    |
| Chapter 2                 | ✅    | ✅               | ✅          | ✅    |
| Chapter 3                 | ✅    | ✅               | ✅          | ✅    |
| Chapter 4                 | ✅    | ✅               | ✅          | ✅    |
| Chapter 5                 | ✅    | ✅               | ✅          | ✅    |
| Chapter 6.0               | ✅    | ✅               | ✅          | ✅    |
| Chapter 6.1 (P261 - P268) |       |                  |             |       |
| Chapter 6.2 (P269 - P281) |       |                  |             |       |
| Chapter 6.3 (P281 - P295) |       |                  |             |       |
| Chapter 6.4 (P296 - P319) |       |                  |             |       |
| Chapter 7.0 (P319 - P319) |       |                  |             |       |
| Chapter 7.1 (P320 - P332) |       |                  |             |       |
| Chapter 7.2 (P333 - P397) |       |                  |             |       |
| Chapter 7.3 (P397 - P570) |       |                  |             |       |

## Scripts

### `json`

```console
$ deno task json
```

Generate a minified json file to `output/lexicon.json`, which includes all the
roots.

### `yaml`

```console
$ deno task yaml
```

Generate a yaml file to `output/lexicon.yaml`, which includes all the roots.
