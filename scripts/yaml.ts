import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";
import { stringify } from "https://deno.land/std@0.168.0/encoding/yaml.ts";
import { bundle } from "../src/index.ts";
import { Lexicon } from "../src/types.ts";

const LANGS = ['zh', 'en'];

for (let i = 0; i < LANGS.length; i += 1) {
    const lexicon: Lexicon = await bundle(LANGS[i]);
    ensureDirSync("output");
    Deno.writeTextFileSync(`output/lexicon_${LANGS[i]}.yaml`, stringify(lexicon));
}


