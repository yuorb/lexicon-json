import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";

type Dict = {
    [lexicon: string]: {
        refers: string
    }
}

const target: Dict = {}

for (const { name } of Deno.readDirSync("./lexicon")) {
    const text = Deno.readTextFileSync(`lexicon/${name}`);
    const json: Dict = JSON.parse(text);
    for (const lexicon in json) {
        target[lexicon] = json[lexicon];
    }
}

ensureDirSync('output');
Deno.writeTextFileSync('output/minified.json', JSON.stringify(target))
