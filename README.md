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
type Affix = {
  affix: string;
  abbr: string;
  name: string;
  type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
  degrees: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  notes?: string;
};

type Affixes = Array<Affix>;
```

## Progress

### Roots

Completed

### Affixes

|                                                                        | Roots           |
| ---------------------------------------------------------------------- | --------------- |
| Demonstrative, Determinative, and Deictic Affixes                      | Not Completed   |
| Sequential/Temporal Affixes                                            | Not Started Yet |
| Spatial, Positional, and Motion Affixes                                | Not Started Yet |
| Quantifying Affixes                                                    | Not Started Yet |
| Qualifying Affixes                                                     | Not Started Yet |
| Adverbial Affixes                                                      | Not Started Yet |
| Modality Affixes                                                       | Not Started Yet |
| Agential/Participant Affixes                                           | Not Started Yet |
| Affixes Relating to Bodily Position                                    | Not Started Yet |
| Instrumentative/Utilitative Affixes                                    | Not Started Yet |
| Configurative Affixes                                                  | Not Started Yet |
| Affixes Relating to Meta-Level Qualification                           | Not Started Yet |
| Sensory Affixes                                                        | Not Started Yet |
| Affixes Relating to Mathematics and Measurement                        | Not Started Yet |
| Coordinative and Connective Affixes                                    | Not Started Yet |
| Grammatical Affixes                                                    | Not Started Yet |
| Affixes for Biological Genera, Species and Sub-Species Differentiation | Not Started Yet |
| Miscellaneous Affixes                                                  | Not Started Yet |

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
