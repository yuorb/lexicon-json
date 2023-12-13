import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";
import { stringify } from "https://deno.land/std@0.168.0/encoding/yaml.ts";
import { bundle } from '../src/index.ts'

const lexicon = bundle();
ensureDirSync('output');
Deno.writeTextFileSync('output/lexicon.yaml', stringify(lexicon))
