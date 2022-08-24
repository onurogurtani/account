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
import { getQuestionsType, getQuestions, deleteQuestion, activeQuestion, passiveQuestion, getLikertType } from '../../../../store/slice/questionSlice'
import { useEffect } from 'react';


const QuestionsList = () => {

    const dispatch = useDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
            dataIndex: 'questionType',
            key: 'questionType',
            render: (questionType) => {
                return questionType.name
            }
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
            width: "250px",
            render: (choices) => {
                if (choices.length > 0) {
                    let choicearr = [];
                    choices.forEach(choicesitem => {
                         choicearr.push(`${choicesitem.marker} : ${choicesitem.text}`)
                    });
                    return choicearr.join("\n")
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
                            (!(item.key === "4" && record.isActive === false) && !(item.key === "5" && record.isActive === true)) &&
                                (<Menu.Item key={item.key}>
                                    <Button type="text" size={12} onClick={() => action(record, item?.name)} >
                                        {item.name}
                                    </Button>
                                </Menu.Item>)
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
    const emptyFilterObj = {
        HeadText: "",
        Text: "",
        ChoiseText: "",
        UpdateUserName: "",
        InsertUserName: "",
        Tags: "",
        QuestionTypeId: [],
        Status: [],
        UpdateStartDate: "",
        UpdateEndDate: "",
        InsertEndDate: "",
        InsertStartDate: "",
        OrderBy: "",
        PageNumber: "",
        PageSize: "",
    }
    const [questionFormModalVisible, setQuestionFormModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('')
    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [idList, setIdList] = useState([])
    const [filterParams, setFilterParams] = useState(emptyFilterObj)

    useEffect(() => {
        dispatch(getQuestionsType())
        dispatch(getQuestions(filterParams))
        dispatch(getLikertType())
    }, [dispatch])


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
                const ids = selectedRowKeys.length > 0 ? selectedRowKeys : [question.id]
                const action = await dispatch(deleteQuestion({ ids }));
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
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Seçilen soruyu aktifleştirmek istediğinizden emin misiniz?',
            okText: <Text t='Evet' />,
            cancelText: 'Hayır',
            onOk: async () => {
             const ids = selectedRowKeys.length > 0 ? {"ids": selectedRowKeys} :  {"ids": [question.id]}
               dispatch(activeQuestion(ids))
                if (activeQuestion.fulfilled) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt başarı ile aktif edildi."
                    });
                }
            }
        });
    }

    const handlePassiveQuestion = (question) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Seçilen soruyu pasifleştirmek istediğinizden emin misiniz?',
            okText: <Text t='Evet' />,
            cancelText: 'Hayır',
            onOk: async () => {
                const ids = selectedRowKeys.length > 0 ? {"ids": selectedRowKeys} :  {"ids": [question.id]}
                dispatch(passiveQuestion(ids))
                if (passiveQuestion.fulfilled) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt başarı ile pasif edildi."
                    });
                }
            }
        });
    }

    const action = (row, actionName) => {
        if (actionName === "Güncelle") {
            updateQuestion(row)
        } else if (actionName === "Sil") {
            handleDeleteQuestion(row)
        } else if (actionName === "Aktif Et/Yayınla") {
            handleActiveQuestion(row)
        } else if (actionName === "Pasif Et/Sonlandır") {
            handlePassiveQuestion(row)
        }
    }

    const onSelectChange = (newSelectedRowKeys, row) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


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
                            Toplam Soru Sayısı: <span> {questionList.pagedProperty?.totalCount} </span>
                        </div>
                    </div>
                }

                <CustomTable
                    pagination={true}
                    dataSource={questionList.items}
                    columns={columns(action)}
                    rowKey={(record) => record.id}
                    scroll={{ x: false }}
                    rowSelection={rowSelection}
                    footer={() => (
                        selectedRowKeys.length > 0 && (
                            <div className='footer-buttons'>
                                <div className='delete-btn'>
                                    <CustomButton type='secondary' onClick={handleDeleteQuestion}>
                                        <span className='sort'>
                                            <Text t='Seçilenleri Sil' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='active-btn'>
                                    <CustomButton type='secondary' onClick={handleActiveQuestion}>
                                        <span className='filter-text'>
                                            <Text t='Seçilenleri Aktifleştir' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='edit-btn'>
                                    <CustomButton type='secondary' onClick={handlePassiveQuestion}>
                                        <span className='filter-text'>
                                            <Text t='Seçilenleri Pasifleştir' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='active-btn'>
                                    <CustomButton type='secondary'>
                                        <span className='filter-text'>
                                            <Text t='Seçilenlerden Anket Oluştur' />
                                        </span>
                                    </CustomButton>
                                </div>
                            </div>)
                    )}
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
                setFilterParams={setFilterParams}
                filterParams={filterParams}
                emptyFilterObj={emptyFilterObj}
            />
            <FilterModal
                modalVisible={filterModalVisible}
                handleModalVisible={setFilterModalVisible}
                setFilterParams={setFilterParams}
                filterParams={filterParams}
                emptyFilterObj={emptyFilterObj}
            />

        </>
    )
}

export default QuestionsList