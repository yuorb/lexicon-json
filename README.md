# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the
http://ithkuil.net/newithkuil_lexicon.pdf.

## Format

### Roots

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

### Affixes

```ts
type Degree =
  // Suitable for most situations
  | string
  // Suitable for the situation where the Type-2 of current affix has another meaning
  | [string, string];

type Affix = {
  name: string;
  description: string;
  gradient_type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
  affix: string;
  degrees: [
    // Degree 0
    Degree | null,
    // Below are Degree 1~9
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
  ];
  notes?: string;
};

type Affixes = Array<Affix>;
```

## Scripts

### `json`

```console
$ deno task json
```

Generate a minified json file to `output/lexicon.json`, which includes all the
roots and affixes.

### `yaml`

```console
$ deno task yaml
```

Generate a yaml file to `output/lexicon.yaml`, which includes all the roots and
affixes.
