import {
  CaseAccessorAffix,
  CaseStackingAffix,
  Lexicon,
  Root,
  StandardAffix,
} from "./types.ts";
import { readJsonFiles } from "./utils.ts";

export async function bundle(): Promise<Lexicon> {
  return {
    roots: (await readJsonFiles<Root[]>("./lexicon/roots")).flat(),
    affixes: {
      standard:
        (await readJsonFiles<StandardAffix[]>("./lexicon/affixes/standard"))
          .flat(),
      accessor: await readJsonFiles<CaseAccessorAffix>(
        "./lexicon/affixes/case_accessor",
      ),
      stacking: await readJsonFiles<CaseStackingAffix>(
        "./lexicon/affixes/case_stacking",
      ),
    },
  };
}
