import {
    CustomCollapseCard,
    confirmDialog,
    errorDialog,
    successDialog,
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
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsType, getQuestions, deleteQuestion, activeQuestion, passiveQuestion  } from '../../../../store/slice/questionSlice'
import { useEffect } from 'react';


const QuestionsList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuestionsType());
        dispatch(getQuestions())
    }, [dispatch])

    const { questionType, questionList } = useSelector(state => state?.questions);

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
            dataIndex: 'headText',
            key: 'headText',
        },
        {
            title: 'Durum',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => {
                return isActive ? "Aktif" : "Pasif"
            }
        },
        {
            title: 'Soru Tipi',
            dataIndex: 'questionTypeId',
            key: 'questionTypeId',
        },
        {
            title: 'Soru Metni',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: 'Cevap Şıkları',
            dataIndex: 'choices',
            key: 'choices',
            render: (answer) => {
                if (answer.length > 0) {
                    return `${answer.text} : ${answer.marker} `
                } else {
                    return `-`
                }
            }
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Oluşturan Kullanıcı',
            dataIndex: 'insertUserFullName',
            key: 'insertUserFullName',
        },
        {
            title: 'Güncellenme Tarihi',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Güncelleyen Kullanıcı',
            dataIndex: 'updateUserFullName',
            key: 'updateUserFullName',
        },
        {
            title: 'Etiket',
            dataIndex: 'tags',
            key: 'tags',
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

    const [questionFormModalVisible, setQuestionFormModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('')
    const [selectedQuestion, setSelectedQuestion] = useState('')

    const addFormModal = (questionType) => {
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
        setSelectedQuestionType(data.questionType.name)
        setSelectedQuestion(data)
        setQuestionFormModalVisible(true);
    }

    const handleDeleteQuestion = async (question) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Kaydı silmek istediğinizden emin misiniz?',
            okText: <Text t='delete' />,
            cancelText: 'Vazgeç',
            onOk: async () => {
                const action = await dispatch(deleteQuestion(question.id));
                if (deleteQuestion.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt Başarı İle Silindi"
                    });
                } else {
                    errorDialog({
                        title: <Text t='error' />,
                        // message: action?.payload
                        message: "Kayıt Silinirken bir hata ile karşılaştı."
                    });
                }
            }
        });
    }

    const handleActiveQuestion = (question) => {
        dispatch(activeQuestion({
            "ids": question.id
          }))
    }

    const handlePassiveQuestion = (question) => {
        dispatch(passiveQuestion({
            "ids": question.id
          }))
    }

    const action = (row, actionName) => {
        if (actionName === "Güncelle") {
            updateQuestion(row)
        } else if (actionName === "Sil") {
            handleDeleteQuestion(row)
        } else if(actionName === "Aktif Et/Yayınla") {
            handleActiveQuestion(row)
        } else if(actionName === "Pasif Et/Yayınla") {
            handlePassiveQuestion(row)
        }
    }

    const menu = (
        <Menu>
            {questionType.map(questiontype => (
                <Menu.Item key={questiontype.id}>
                    <Button type="text" size={12} onClick={() => addFormModal(questiontype.name)}>
                        {questiontype.name}
                    </Button>
                </Menu.Item>
            ))}
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
                    dataSource={questionList}
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