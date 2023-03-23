import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";
import { stringify } from "https://deno.land/std@0.168.0/encoding/yaml.ts";
import { merge } from '../src/index.ts'

const lexicon = merge() as unknown as Record<string, unknown>;
ensureDirSync('output');
Deno.writeTextFileSync('output/lexion.yaml', stringify(lexicon))
