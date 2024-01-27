type Specs = {
    "BSC": string,
    "CTE": string,
    "CSV": string,
    "OBJ": string
}

type Root = {
    root: string,
    refers: string,
    stems?: [
        Specs | string,
        Specs | string,
        Specs | string,
    ],
    notes?: string
};

type Degree = string | [string, string];

type Affix = {
  name: string;
  description: string;
  gradient_type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
  affix: string;
  degrees: [
    Degree | null,
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

type Lexicon = {
    roots: Root[],
    affixes: {
        standard: Affix[],
    },
}

export function mergeRoots(): Root[] {
    let target: Root[] = []

    // Get filenames and sort
    const filenames: string[] = []
    for (const { name } of Deno.readDirSync("./lexicon/roots")) {
        filenames.push(name)
    }
    filenames.sort();

    for (let i = 0; i < filenames.length; i++) {
        const text = Deno.readTextFileSync(`lexicon/roots/${filenames[i]}`);
        const json: Root[] = JSON.parse(text);
        target = target.concat(json)
    }

    return target
}

export function mergeStandardAffixes(): Affix[] {
    let target: Affix[] = []

    // Get filenames and sort
    const filenames: string[] = []
    for (const { name } of Deno.readDirSync("./lexicon/affixes/standard")) {
        filenames.push(name)
    }
    filenames.sort();

    for (let i = 0; i < filenames.length; i++) {
        const text = Deno.readTextFileSync(`lexicon/affixes/standard/${filenames[i]}`);
        const json: Affix[] = JSON.parse(text);
        target = target.concat(json)
    }

    return target
}

export function bundle(): Lexicon {
    return {
        roots: mergeRoots(),
        affixes: {
            standard: mergeStandardAffixes()
        }
    }
}

