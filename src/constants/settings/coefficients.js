
export const examTypes = {
    LGS: 1,
    TYT: 2,
    AYT:3,
    YKS: 4,
    OTHER: 5
};

export const LGS = "LGS"
export const TYT = "TYT"
export const AYT = "AYT"
export const YKS = "YKS"
export const OTHER = "OTHER"

export const examTypeList = [
    { id: 1, value: 'LGS' },
    { id: 2, value: 'TYT' },
    { id: 3, value: 'AYT' },
    { id: 4, value: 'YKS' },
    { id: 5, value: 'Diğer' },
];

export const dummyCoefficients = [
    { id: 1, no: 1, status: "Aktif", version: "v2", examType: "LGS" },
    { id: 2, no: 1, status: "Pasif", version: "v1", examType: "TYT" },
    { id: 3, no: 1, status: "Aktif", version: "v2", examType: "AYT" },
    { id: 4, no: 1, status: "Aktif", version: "v1", examType: "YKS" }
]

export const dummySections = [
    { id: 1, value: 'A Bölümü' },
    { id: 2, value: 'B Bölümü' },
    { id: 3, value: 'C Bölümü' },
];

export const defaultRowCount = {
    "LGS": 6,
    "TYT": 4,
    "OTHER": 4
}

export const AYTFormTemplate = [
    {id:1,title:'Sayısal (MF) Katsayıları',rowCount:4},
    {id:2,title:'Eşit Ağırlık (TM) Katsayıları',rowCount:4},
    {id:3,title:'Sözel (TS) Katsayıları',rowCount:7},
    {id:4,title:'Yabancı Dil Katsayıları',rowCount:1},
]

export const YKSFormTemplate = [
    {title:'Sayısal (MF) Katsayıları',rowCountTYT:4,rowCountAYT:4},
    {title:'Eşit Ağırlık (TM) Katsayıları',rowCountTYT:4,rowCountAYT:4},
    {title:'Sözel (TS) Katsayıları',rowCountTYT:4,rowCountAYT:7},
    {title:'Yabancı Dil Katsayıları',rowCountTYT:4,rowCountAYT:1},
]

export const COPY = "COPY"
export const UPDATE = "UPDATE"
export const ADD = "ADD"

