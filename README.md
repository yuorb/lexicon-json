# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the http://ithkuil.net/newithkuil_lexicon.pdf.

## Format

```ts
Array<{
    root: string
    refers: string,
    stems: [
        {
            "BSC": string,
            "CTE": string,
            "CSV": string,
            "OBJ": string
        } | string,
        {
            "BSC": string,
            "CTE": string,
            "CSV": string,
            "OBJ": string
        } | string,
        {
            "BSC": string,
            "CTE": string,
            "CSV": string,
            "OBJ": string
        } | string,
    ]
}>
```

The fields will and should be expanded in the future, but at the current stage, the top priority is complete the lexicon.

## Progress

|                                                  | Roots | Addtional Roots | Stem & Spec | Notes |
| ------------------------------------------------ | ----- | --------------- | ----------- | ----- |
| 1. ROOTS ASSOCIATED WITH GRAMMATICAL FUNCTIONS   | ✅     |                 | ✅           |       |
| 2. COMMON STATES AND ACTS                        | ✅     |                 |             |       |
| 3. SPACETIME and MOTION                          |       |                 |             |       |
| 4. PSYCHOLOGICAL AND SOCIOLOGICAL PHENOMENA      |       |                 |             |       |
| 5. MISCELLANEOUS ENTITIES AND OBJECTS            |       |                 |             |       |
| 6. NATURE AND NATURAL PHENOMENA (Non-Biological) |       |                 |             |       |
| 7. NATURAL PHENOMENA (BIOLOGICAL/ZOOLOGICAL)     |       |                 |             |       |

## Scripts

### Minify

```console
$ deno task minify
```
Generate a minified json to `output/minified.json`, which includes all the roots.
