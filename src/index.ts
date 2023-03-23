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

export function merge(): Lexicon {
    let target: Lexicon = []

    // Get filenames and sort
    const filenames: string[] = []
    for (const { name } of Deno.readDirSync("./lexicon")) {
        filenames.push(name)
    }
    filenames.sort();

    for (let i = 0; i < filenames.length; i++) {
        const text = Deno.readTextFileSync(`lexicon/${filenames[i]}`);
        const json: Lexicon = JSON.parse(text);
        target = target.concat(json)
    }

    return target
}


