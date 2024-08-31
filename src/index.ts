import {
  CaseAccessorAffix,
  CaseStackingAffix,
  Lexicon,
  Root,
  StandardAffix,
} from "./types.ts";
import { readJsonFiles } from "./utils.ts";

export async function bundle(langDir: string): Promise<Lexicon> {
  return {
    roots: (await readJsonFiles<Root[]>(`./lexicon/${langDir}/roots`)).flat(),
    affixes: {
      standard:
        (await readJsonFiles<StandardAffix[]>(`./lexicon/${langDir}/affixes/standard`))
          .flat(),
      accessor: await readJsonFiles<CaseAccessorAffix>(
        `./lexicon/${langDir}/affixes/case_accessor`,
      ),
      stacking: await readJsonFiles<CaseStackingAffix>(
        `./lexicon/${langDir}/affixes/case_stacking`,
      ),
    },
  };
}
