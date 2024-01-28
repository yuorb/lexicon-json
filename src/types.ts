type Specs = {
    "BSC": string,
    "CTE": string,
    "CSV": string,
    "OBJ": string
}

export type Root = {
    root: string,
    refers: string,
    stems?: [
        Specs | string,
        Specs | string,
        Specs | string,
    ],
    notes?: string
};

type Degree = string | [string, string];

export type StandardAffix = {
    name: string;
    description: string;
    gradient_type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
    cs: string;
    degrees: [
        Degree | null,
        Degree,
        Degree,
        Degree,
        Degree,
        Degree,
        Degree,
        Degree,
        Degree,
        Degree,
    ];
    notes?: string;
};

type Case = {
    cs: string;
    vx: Array<string>;
    description: string;
};

export type CaseAccessorAffix = {
    name: string;
    description: string;
    gradient_type: string;
    types: [
        Array<Case>,
        Array<Case>,
        Array<Case>,
    ];
};

export type CaseStackingAffix = {
    name: string;
    description: string;
    gradient_type: string;
    cases: Array<Case>;
};

export type Lexicon = {
    roots: Root[],
    affixes: {
        standard: StandardAffix[],
        accessor: CaseAccessorAffix[],
        stacking: CaseStackingAffix[],
    },
}