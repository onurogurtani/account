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
import "../../../../styles/surveyManagement/surveyStyles.scss"

const QuestionsList = () => {


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Soru Başlığı',
            dataIndex: 'questiontitle',
            key: 'questiontitle',
        },
        {
            title: 'Soru Tipi',
            dataIndex: 'questiontype',
            key: 'questiontype',
        },
        {
            title: 'Soru Metni',
            dataIndex: 'questiontext',
            key: 'questiontext',
        },
        {
            title: 'Cevap Şıkları',
            dataIndex: 'answerchoise',
            key: 'answerchoise',
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createddate',
            key: 'createddate',
        },
        {
            title: 'Oluşturan Kullanıcı',
            dataIndex: 'createduser',
            key: 'createduser',
        },
        {
            title: 'Güncellenme Tarihi',
            dataIndex: 'updatedate',
            key: 'updatedate',
        },
        {
            title: 'Güncelleyen Kullanıcı',
            dataIndex: 'updateuser',
            key: 'updateuser',
        },
        {
            title: 'Etiket',
            dataIndex: 'ticket',
            key: 'ticket',
        },
        {
            title: 'İşlemler',
            dataIndex: 'operations',
            key: 'operations',
        }
    ];

    const [questionFormModalVisible, setQuestionFormModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('')

    const addFormModal = (questionType) => {
        console.log(questionType)
        setSelectedQuestionType(questionType)
        setQuestionFormModalVisible(true);
    };

    const handleSortButton = () => {
        setSortModalVisible(true)
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
                                <CustomButton type='secondary'>
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
                    dataSource={[]}
                    columns={columns}
                    scroll={{ x: false }}
                />
            </CustomCollapseCard>

            <QuestionModal
                selectedQuestionType={selectedQuestionType}
                modalVisible={questionFormModalVisible}
                handleModalVisible={setQuestionFormModalVisible}
            />
            <SortModal
                modalVisible={sortModalVisible}
                handleModalVisible={setSortModalVisible}
            />
        </>
    )
}

export default QuestionsList