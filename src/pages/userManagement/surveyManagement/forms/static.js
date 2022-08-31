import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from "@ant-design/icons";

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

const menuList = [
    {
        key: "1",
        name: "Güncelle",
    },
    {
        key: "2",
        name: "Sil",
    },
    {
        key: "3",
        name: "Kopyala",
    },
    {
        key: "4",
        name: "Pasif Et/Sonlandır",
    },
    {
        key: "5",
        name: "Aktif Et/Yayınla",
    },
    {
        key: "6",
        name: "İstatistikleri Göster",
    },
];

const sortList = [
    {
        id: 1,
        name: 'Oluşturulma Tarihine Göre En Yakın',
        default: "insertASC"
    },
    {
        id: 2,
        name: 'Oluşturulma Tarihine Göre En Uzak',
        default: "insertDESC"
    },
    {
        id: 3,
        name: 'Güncelleme Tarihine Göre En Yakın',
        default: "updateASC"
    },
    {
        id: 4,
        name: 'Güncelleme Tarihine Göre En Uzak',
        default: "updateDESC"
    },
    {
        id: 5,
        name: 'Anket Başlangıç Tarihine Göre En Yakın',
        default: "updateASC"
    },
    {
        id: 6,
        name: 'Anket Başlangıç Tarihine Göre En Uzak',
        default: "updateASC"
    },
    {
        id: 7,
        name: 'Anket Bitiş Tarihine Göre En Yakın',
        default: "updateASC"
    },
    {
        id: 8,
        name: 'Anket Bitiş Tarihine Göre En Uzak',
        default: "updateASC"
    },
]

const columns = (action) => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "50px",
        fixed: 'left',
    },
    {
        title: "Anket Adı",
        dataIndex: "name",
        key: "name",
        fixed: 'left',
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
        fixed: 'right',
        render: (_, record) => {
            const menu = (
                <Menu>
                    {menuList.map(item => (
                        (!(item.key === "4" && record.isActive === false) && !((item.key === "5" || item.key === "2") && record.isActive === true)) && 
                        <Menu.Item key={item.key}>
                            <Button type="text" size={12} onClick={ () => action(record, item?.name)} >
                                {item.name}
                            </Button>
                        </Menu.Item>
                    ))}
                </Menu>
            );

            return (
                <Dropdown type="primary" overlay={menu}>
                    <Button
                        className="ant-dropdown-link userName"
                    >
                        İşlemler
                        <DownOutlined />
                    </Button>
                </Dropdown>
            );
        }
    }
];

export { data, columns, sortList };
