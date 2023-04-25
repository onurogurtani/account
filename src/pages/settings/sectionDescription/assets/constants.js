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
export const noActionColums = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
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
        dataIndex: 'examKindName',
        key: 'examKindName',
        align: 'center',
    },
    {
        title: 'Bölüm Adları',
        dataIndex: 'sectionDescriptionChapters',
        key: 'sectionDescriptionChapters',
        align: 'center',
        render: (sectionDescriptionChapters) => {
            const chapterNames = sectionDescriptionChapters?.map((item) => item?.name)?.join(' - ');
            return <span> {chapterNames} </span>;
        },
    },
];

export const modalTitleEnum = {
    add: 'Bölüm Adı Ekle',
    update: 'Bölüm Adı Güncelle',
    copy: 'Bölüm Adı Kopyala',
};

export const addNewSectionInitValues = {
    recordStatus: 1,
    sectionDescriptionChapters: [
        {
            name: undefined,
            coefficient: undefined,
        },
        {
            name: undefined,
            coefficient: undefined,
        },
    ],
};

export const confirmMessages = {
    update: {
        title: 'Güncellemek istediğinize emin misiniz?',
        message:
            'Deneme sınavı oluşturma ekranında yeni bir sınav oluşturulurken güncellediğiniz veriler kullanılacaktır ve güncelleme işlemini onaylamanız halinde katsayı tanımlarına da otomatik olarak versiyon atılacaktır, bu nedenle güncelleme işlemini tamamladıktan sonra katsayı verileri düzenlemeniz/ kontrol etmeniz gerekmektedir.',
    },
    copy: {
        title: 'Kopyala',
        message:
            'Kopyala işlemini onayladığınızda ilgili kayıt için önceki veriler pasif edilerek yeni versiyonla aktif bir kayıt eklenecektir. Deneme sınavı oluşturma ekranında yeni bir sınav oluşturulurken kopyaladığınız veriler kullanılacaktır ve kopyalama işlemini onaylamanız halinde katsayı tanımlarına da otomatik olarak versiyon atılacaktır, bu nedenle kopyalama işlemini tamamladıktan sonra katsayı verileri düzenlemeniz/kontrol etmeniz gerekmektedir. Kopyalamak istediğinizden emin misiniz',
    },
};
