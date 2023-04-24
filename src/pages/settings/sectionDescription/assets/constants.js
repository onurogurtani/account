export const examKinds = [
    { id: 1, description: 'LGS' },
    { id: 2, description: 'TYT' },
    { id: 3, description: 'AYT' },
    { id: 4, description: 'YKS' },
    { id: 5, description: 'Diğer' },
];
export const examKindsEnum = {
    1: 'LGS',
    2: 'TYT',
    3: 'AYT',
    4: 'YKS',
    5: 'Diğer',
};
export const recordStatusEnum = {
    0: 'Pasif',
    1: 'Aktif',
};
// !FIX ME AŞAĞIDAKİ ALANLAR KONTROL EDİLCEK
export const noActionColums = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (index, record) => {
            return <span>{index}</span>;
        },
    },
    {
        title: 'Durum',
        dataIndex: 'recordStatus',
        key: 'recordStatus',
        align: 'center',
        render: (recordStatus) => {
            return <span>{recordStatusEnum[recordStatus]}</span>;
        },
    },
    {
        title: 'Versiyon',
        dataIndex: 'version',
        key: 'version',
        align: 'center',
    },
    {
        title: 'Sınav Türü',
        dataIndex: 'examKinds',
        key: 'examKinds',
        align: 'center',
        render: (examKinds) => {
            return <span>{recordStatusEnum[examKinds]}</span>;
        },
    },
    {
        title: 'Bölüm Adları',
        dataIndex: 'sectionDescriptionChapters',
        key: 'sectionDescriptionChapters',
        align: 'center',
        // !FIX ME
        // render: (sectionDescriptionChapters) => {
        //     return <span>{sectionDescriptionChapters}</span>;
        // },
    },
];
