# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the
http://ithkuil.net/newithkuil_lexicon.pdf.

Currently it does not include the affixes like `-řst` but is planned in the
future.

## Format

```ts
type Specs = {
  "BSC": string;
  "CTE": string;
  "CSV": string;
  "OBJ": string;
};

type Lexicon = {
  root: string;
  refers?: string;
  stems?: [
    Specs | string,
    Specs | string,
    Specs | string,
  ];
  notes?: string;
  see?: string;
}[];
```

The fields will and should be expanded in the future, but at the current stage,
the top priority is complete the lexicon.

## Progress

|                         | Roots | Addtional Roots | Stem & Spec | Notes |
| ----------------------- | ----- | --------------- | ----------- | ----- |
| Chapter 1               | ✅    | ✅              | ✅          | ✅    |
| Chapter 2               | ✅    | ✅              | ✅          | ✅    |
| Chapter 3.0             | ✅    | ✅              | ✅          | ✅    |
| Chapter 3.1             | ✅    | ✅              | ✅          | ✅    |
| Chapter 3.2             | ✅    | ✅              | ✅          | ✅    |
| Chapter 3.3 (P104-P105) |       |                 |             |       |
| Chapter 3.4 (P105-P107) |       |                 |             |       |
| Chapter 3.5 (P107-P108) |       |                 |             |       |
| Chapter 3.6 (P109-P110) |       |                 |             |       |
| Chapter 3.7 (P111-P115) |       |                 |             |       |
| Chapter 4 (P115 - P244) |       |                 |             |       |
| Chapter 5 (P245 - P260) |       |                 |             |       |
| Chapter 6 (P261 - P319) |       |                 |             |       |
| Chapter 7 (P319 - P570) |       |                 |             |       |

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
