import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";
import { bundle } from "../src/index.ts";
import { Lexicon } from "../src/types.ts";

const lexicon: Lexicon = await bundle();
ensureDirSync("output");
Deno.writeTextFileSync("output/lexicon.json", JSON.stringify(lexicon));
