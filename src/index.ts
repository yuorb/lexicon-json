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

type Affix = null;

type Lexicon = {
    roots: Root[],
    affixes: Affix[]
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

export function mergeAffixes(): Affix[] {
    let target: Affix[] = []

    // Get filenames and sort
    const filenames: string[] = []
    for (const { name } of Deno.readDirSync("./lexicon/affixes")) {
        filenames.push(name)
    }
    filenames.sort();

    for (let i = 0; i < filenames.length; i++) {
        const text = Deno.readTextFileSync(`lexicon/affixes/${filenames[i]}`);
        const json: Affix[] = JSON.parse(text);
        target = target.concat(json)
    }

    return target
}

export function bundle(): Lexicon {
    return {
        roots: mergeRoots(),
        affixes: mergeAffixes()
    }
}

