import { CustomButton } from "../../../../components";

const data = [
    {
        id: 1,
        name: 'Static',
        isActive: true,
        createdUser: "admin",
        createdDate: '2020-01-01',
        updatedUser: "admin",
        updatedDate: '2020-02-01',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        surveyCompletionStatus: {
            id: 1,
            name: 'Incomplete',
        },
        surveyConstraint: {
            id: 1,
            name: 'None',
        },
        targetGroup: {
            id: 1,
            name: 'All',
        },
        category: {
            id: 1,
            name: 'All',
        },
        categoryId: 1,
        surveyConstraintId: 1,
        targetGroupId: 1,
        surveyCompletionStatusId: 1,
        questions: [
            {
                id: 1,
                headText: "Açık Uçlu Soru ",
                text: "Text",
                tags: "Tags",
                isActive: true,
                questionType: {
                    id: 1,
                    name: 'Açık Uçlu',
                }
            },
            {
                id: 2,
                headText: "Üçlü Likert Tipi Soru",
                text: "Text",
                tags: "Tags",
                isActive: true,
                questionType: {
                    id: 2,
                    name: 'Üçlü Likert',
                }
            },
            {
                id: 3,
                headText: "Head Text",
                text: "Text",
                tags: "Tags",
                isActive: true,
                questionType: {
                    id: 3,
                    name: 'Çok Seçimli',
                    options: [
                        "Option 1",
                        "Option 2",
                        "Option 3",
                    ]
                }
            }
        ]
    }
]

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Anket Adı",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Durum",
        dataIndex: "isActive",
        key: "isActive",
        render: (isActive) => {
            return isActive ? "Aktif" : "Pasif"
        }
    },
    {
        title: "Oluşturulma Tarihi",
        dataIndex: "createdDate",
        key: "createdDate",
    },
    {
        title: "Oluşturan Kullanıcı",
        dataIndex: "createdUser",
        key: "createdUser",
    },
    {
        title: "Güncelleme Tarihi",
        dataIndex: "updatedDate",
        key: "updatedDate",
    },
    {
        title: "Güncelleyen Kullanıcı",
        dataIndex: "updatedUser",
        key: "updatedUser",
    },
    {
        title: "Kategori",
        dataIndex: "category",
        key: "category",
        render: (category) => {
            return category?.name
        }
    },
    {
        title: "Hedef Kitle",
        dataIndex: "targetGroup",
        key: "targetGroup",
        render: (targetGroup) => {
            return targetGroup?.name
        }
    },
    {
        title: "Anket Kısıtı Tipi",
        dataIndex: "surveyConstraint",
        key: "surveyConstraint",
        render: (surveyConstraint) => {
            return surveyConstraint?.name
        }
    },
    {
        title: "Anket Başlangıç Tarihi",
        dataIndex: "startDate",
        key: "startDate",
    },
    {
        title: "Anket Bitiş Tarihi",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "İşlemler",
        dataIndex: "draftDeleteAction",
        key: "draftDeleteAction",
        width: 100,
        align: "center",
        render: (record) => {
            return (
                <div className="action-btns">
                    <CustomButton >
                        İşlemler
                    </CustomButton>
                </div>
            );
        }
    }
];

export { data, columns };
