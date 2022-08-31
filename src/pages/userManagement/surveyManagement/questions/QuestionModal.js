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
import { addQuestions, updateQuestions } from '../../../../store/slice/questionSlice';

const QuestionModal = ({ modalVisible, handleModalVisible, selectedQuestionType, selectedQuestion, setSelectedQuestion, isEdit ,setIsEdit }) => {
    const [form] = Form.useForm();

    const handleClose =() => {
        setIsEdit(false)
        setSelectedQuestion()
        form.resetFields();
        handleModalVisible(false);
    };

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
                        updateQuestions={updateQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                }
                {selectedQuestionType === "Tek Seçimli Soru" &&
                    <OneChoiseQuestion
                        addQuestions={addQuestions}
                        updateQuestions={updateQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                }
                {selectedQuestionType === "Çok Seçimli Soru" &&
                    <MultipleChoiseQuestion
                        addQuestions={addQuestions}
                        updateQuestions={updateQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                }
                {selectedQuestionType === "Boşluk Doldurma Sorusu" &&
                    <FillInTheBlankQuestion
                        addQuestions={addQuestions}
                        updateQuestions={updateQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                }
                {selectedQuestionType === "Likert Tipi Soru" &&
                    <LikertQuestion
                        form={form}
                        addQuestions={addQuestions}
                        updateQuestions={updateQuestions}
                        handleModalVisible={handleModalVisible}
                        selectedQuestion={selectedQuestion}
                        setSelectedQuestion={setSelectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                    />
                }

            </div>
        </CustomModal>
    );
};

export default QuestionModal;
