# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the http://ithkuil.net/newithkuil_lexicon.pdf.

## Format

```ts
type Specs = {
    "BSC": string,
    "CTE": string,
    "CSV": string,
    "OBJ": string
}

type Lexicon = {
    root: string,
    refers: string,
    stems?: [
        Specs | string,
        Specs | string,
        Specs | string,
    ],
    notes?: string
}[]
```

The fields will and should be expanded in the future, but at the current stage, the top priority is complete the lexicon.

## Progress

|                                                  | Roots | Addtional Roots | Stem & Spec | Notes |
| ------------------------------------------------ | ----- | --------------- | ----------- | ----- |
| 1. ROOTS ASSOCIATED WITH GRAMMATICAL FUNCTIONS   | ✅     | ✅               | ✅           | ✅     |
| 2. COMMON STATES AND ACTS                        | ✅     |                 |             |       |
| 3. SPACETIME and MOTION                          |       |                 |             |       |
| 4. PSYCHOLOGICAL AND SOCIOLOGICAL PHENOMENA      |       |                 |             |       |
| 5. MISCELLANEOUS ENTITIES AND OBJECTS            |       |                 |             |       |
| 6. NATURE AND NATURAL PHENOMENA (Non-Biological) |       |                 |             |       |
| 7. NATURAL PHENOMENA (BIOLOGICAL/ZOOLOGICAL)     |       |                 |             |       |

## Scripts

### `json`

```console
$ deno task json
```
Generate a minified json file to `output/lexicon.json`, which includes all the roots.

### `yaml`

```console
$ deno task yaml
```
Generate a yaml file to `output/lexicon.yaml`, which includes all the roots.
