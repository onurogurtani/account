import {
    CustomImage,
    CustomModal
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import React, { useCallback } from 'react';
import '../../../../styles/myOrders/paymentModal.scss';
import OpenEndedQuestion from '../questions/questiontypes/OpenEndedQuestion'
import OneChoiseQuestion from '../questions/questiontypes/OneChoiseQuestion'
import MultipleChoiseQuestion from '../questions/questiontypes/MultipleChoiseQuestion'
import FillInTheBlankQuestion from '../questions/questiontypes/FillInTheBlankQuestion'
import LikertQuestion from '../questions/questiontypes/LikertQuestion'
import { Form } from 'antd';
import '../../../../styles/surveyManagement/surveyStyles.scss'
import { addQuestions } from '../../../../store/slice/questionSlice';

const QuestionModal = ({ modalVisible, handleModalVisible, selectedQuestionType , selectedQuestion }) => {
    const [form] = Form.useForm();

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
    }, [handleModalVisible, form]);

    // const onFinish =  ()  => {
    //     console.log("selam")
    // }

    return (
        <CustomModal
            className='survey-modal'
            maskClosable={false}
            footer={false}
            title={`${selectedQuestionType} Ekle`}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='survey-container'>
                {selectedQuestionType === "Açık Uçlu Soru" &&
                    <OpenEndedQuestion
                        addQuestions={addQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                    />
                }
                {selectedQuestionType === "Tek Seçimli Soru" &&
                    <OneChoiseQuestion
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                    />
                }
                {selectedQuestionType === "Çok Seçimli Soru" &&
                    <MultipleChoiseQuestion
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                    />
                }
                {selectedQuestionType === "Boşluk Doldurma Sorusu" &&
                    <FillInTheBlankQuestion
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                    />
                }
                {selectedQuestionType === "Likert Tipi Soru" &&
                    <LikertQuestion
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                    />
                }

            </div>
        </CustomModal>
    );
};

export default QuestionModal;
