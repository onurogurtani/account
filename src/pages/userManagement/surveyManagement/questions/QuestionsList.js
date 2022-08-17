import {
    CustomCollapseCard,
    CustomImage,
    CustomTable,
    CustomButton,
    Text,
} from '../../../../components';
import '../../../../styles/draftOrder/draftList.scss';
import cardsRegistered from '../../../../assets/icons/icon-cards-registered.svg';
import { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import QuestionModal from './QuestionModal';
import SortModal from './SortModal';
import FilterModal from './FilterModal'
import "../../../../styles/surveyManagement/surveyStyles.scss"

const QuestionsList = () => {


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
    const columns = (action) => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "50px",
            fixed: 'left',
        },
        {
            title: 'Soru Başlığı',
            dataIndex: 'questionTitle',
            key: 'questionTitle',
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return status ? "Aktif" : "Pasif"
            }
        },
        {
            title: 'Soru Tipi',
            dataIndex: 'questionType',
            key: 'questionType',
        },
        {
            title: 'Soru Metni',
            dataIndex: 'questionText',
            key: 'questionText',
        },
        {
            title: 'Cevap Şıkları',
            dataIndex: 'answers',
            key: 'answers',
            render: (answer) => {
                return `${answer.title} : ${answer.text}`
            }
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Oluşturan Kullanıcı',
            dataIndex: 'createdUser',
            key: 'createdUser',
        },
        {
            title: 'Güncellenme Tarihi',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Güncelleyen Kullanıcı',
            dataIndex: 'updatedUser',
            key: 'updatedUser',
        },
        {
            title: 'Etiket',
            dataIndex: 'label',
            key: 'label',
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
                            <Menu.Item key={item.key}>
                                <Button type="text" size={12} onClick={() => action(record, item?.name)} >
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

    const data = [{
        id: 1,
        questionTitle: "asdasd",
        status: true,
        questionType: "Açık Uçlu Soru",
        questionText: "asdasdasd",
        answers: [
            {
                title: "A",
                text: "asdasd"
            },
            {
                title: "B",
                text: "asdasd"
            },
            {
                title: "C",
                text: "asdasd"
            },
            {
                title: "D",
                text: "asdasd"
            },
            {
                title: "E",
                text: "asdasd"
            }
        ],
        createdUser: "admin",
        createdDate: '2020-01-01',
        updatedUser: "admin",
        updatedDate: '2020-02-01',
        label: "asd"
    }]

    const [questionFormModalVisible, setQuestionFormModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('')
    const [selectedQuestion, setSelectedQuestion] = useState('')

    const addFormModal = (questionType) => {
        console.log(questionType)
        setSelectedQuestionType(questionType)
        setQuestionFormModalVisible(true);
    };

    const handleSortButton = () => {
        setSortModalVisible(true)
    }

    const handleFilterButton = () => {
        setFilterModalVisible(true)
    }
    const updateQuestion = (data) => {

        setSelectedQuestionType(data.questionType)
        setSelectedQuestion(data)
        setQuestionFormModalVisible(true);
    }
    const action = (row, actionName) => {
        console.log("row", row)
        console.log("actionName", actionName)
        if (actionName === "Güncelle") {
            updateQuestion(row)
        }
    }



    const menu = (
        <Menu>
            <Menu.Item key={"openEndedQuestion"}>
                <Button type="text" size={12} onClick={() => addFormModal("Açık Uçlu Soru")}>
                    Açık Uçlu Soru
                </Button>
            </Menu.Item>
            <Menu.Item key={"oneChoiseQuestion"}>
                <Button type="text" size={12} onClick={() => addFormModal("Tek Seçimli Soru")}>
                    Tek Seçimli Soru
                </Button>
            </Menu.Item>
            <Menu.Item key={"multipleChoiseQuestion"}>
                <Button type="text" size={12} onClick={() => addFormModal("Çok Seçimli Soru")}>
                    Çok Seçimli Soru
                </Button>
            </Menu.Item>
            <Menu.Item key={"FillInTheBlankQuestion"}>
                <Button type="text" size={12} onClick={() => addFormModal("Boşluk Doldurma Sorusu")}>
                    Boşluk Doldurma Sorusu
                </Button>
            </Menu.Item>
            <Menu.Item key={"LikertQuestion"}>
                <Button type="text" size={12} onClick={() => addFormModal("Likert Tipi Soru")}>
                    Likert Tipi Soru
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <CustomCollapseCard
                className='draft-list-card'
                cardTitle={<Text t='Soru Listesi' />}
            >
                {
                    <div className='number-registered-drafts'>
                        <div className='operations-buttons'>
                            <div className='sort-btn'>
                                <CustomButton type='secondary' onClick={handleSortButton}>
                                    <span className='sort'>
                                        <Text t='Sırala' />
                                    </span>
                                </CustomButton>
                            </div>
                            <div className='filter-btn'>
                                <CustomButton type='secondary' onClick={handleFilterButton}>
                                    <span className='filter-text'>
                                        <Text t='Filtrele' />
                                    </span>
                                </CustomButton>
                            </div>
                            <div className='add-question'>
                                <Dropdown type="primary" overlay={menu}>
                                    <Button
                                        className="ant-dropdown-link userName"
                                    >
                                        YENİ SORU EKLE
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='drafts-count-title'>
                            <CustomImage src={cardsRegistered} />
                            Toplam Soru Sayısı: <span> 2 </span>
                        </div>
                    </div>
                }

                <CustomTable
                    pagination={true}
                    dataSource={data}
                    columns={columns(action)}
                    rowKey={(record) => record.id}
                    scroll={{ x: false }}
                />
            </CustomCollapseCard>

            <QuestionModal
                selectedQuestionType={selectedQuestionType}
                modalVisible={questionFormModalVisible}
                handleModalVisible={setQuestionFormModalVisible}
                selectedQuestion={selectedQuestion}
            />
            <SortModal
                modalVisible={sortModalVisible}
                handleModalVisible={setSortModalVisible}
            />
            <FilterModal
                modalVisible={filterModalVisible}
                handleModalVisible={setFilterModalVisible}
            />
        </>
    )
}

export default QuestionsList