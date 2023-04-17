const data = [
    {
        key: '1',
        keyTwo: '1.1',
        versionNumber: '1.0',
        status: 'active',
        classStageType: 'type1',
        approverUser: 'John Doe',
        approvedDate: '01/01/2020',
        code: '1',
        prevData: 'value1',
        currentData: 'value2',
    },
    {
        key: '2',
        keyTwo: '2.1',
        versionNumber: '2.0',
        status: 'inactive',
        classStageType: 'type2',
        approverUser: 'Jane Doe',
        approvedDate: '02/02/2020',
        code: '2',
        prevData: 'value3',
        currentData: 'value4',
    },
];

const pagedProperty = {
    totalCount: 1500,
    current: 2,
    pageSize: 10,
};

const versionSelectData = [
    { id: 1, type: 'YKS Önlisans Atlası' },
    { id: 2, type: 'YKS Lisans Atlası' },
    { id: 3, type: 'LGS PDF ekle ' },
];

export { data, pagedProperty, versionSelectData };
