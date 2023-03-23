import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";
import { merge } from '../src/index.ts'

const lexicon = merge()
ensureDirSync('output');
Deno.writeTextFileSync('output/lexion.json', JSON.stringify(lexicon))
