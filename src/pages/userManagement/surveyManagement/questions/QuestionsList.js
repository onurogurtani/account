import {
    CustomCollapseCard,
    CustomImage,
    CustomTable,
    Text,
} from '../../../../components';
import '../../../../styles/draftOrder/draftList.scss';
import cardsRegistered from '../../../../assets/icons/icon-cards-registered.svg';
import { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import QuestionModal from './QuestionModal';

const QuestionsList = () => {


    const columns = [
        {
            title: 'Soru Tipi',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    const [questionFormModalVisible, setQuestionFormModalVisible] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('')

    const addFormModal = (questionType) => {
        console.log(questionType)
        setSelectedQuestionType(questionType)
        setQuestionFormModalVisible(true);
    };

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
                        <div className='drafts-count-title'>
                            <CustomImage src={cardsRegistered} />
                            Toplam Soru Sayısı: <span> 2 </span>
                        </div>
                        <Dropdown overlay={menu}>
                            <Button
                                className="ant-dropdown-link userName"
                            >
                                YENİ SORU EKLE
                                <DownOutlined />
                            </Button>
                        </Dropdown>
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
        </>
    )
}

export default QuestionsList