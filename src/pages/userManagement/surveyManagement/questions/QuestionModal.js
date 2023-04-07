import { CustomImage, CustomModal } from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import React, { useCallback, useState } from 'react';
import '../../../../styles/myOrders/paymentModal.scss';
import OpenEndedQuestion from '../questions/questiontypes/OpenEndedQuestion';
import OneChoiseQuestion from '../questions/questiontypes/OneChoiseQuestion';
import MultipleChoiseQuestion from '../questions/questiontypes/MultipleChoiseQuestion';
import FillInTheBlankQuestion from '../questions/questiontypes/FillInTheBlankQuestion';
import LikertQuestion from '../questions/questiontypes/LikertQuestion';
import { Form } from 'antd';
import '../../../../styles/surveyManagement/surveyStyles.scss';
import { addQuestions, updateQuestions } from '../../../../store/slice/questionSlice';

const QuestionModal = ({
    modalVisible,
    selectedQuestionType,
    setSelectedQuestionType,
    selectedQuestion,
    setSelectedQuestion,
    isEdit,
    setIsEdit,
    setQuestionModalVisible,
    currentForm,
    groupKnowledge,
    questionKnowledge,
    currentQuestion,
    setCurrentQuestion,
}) => {
    // const [selectedQuestionType, setSelectedQuestionType] = useState('Tek Seçimli Soru');
    const [form] = Form.useForm();

    const handleClose = () => {
        setQuestionModalVisible(false);
        form.resetFields();
    };
    return (
        <CustomModal
            className="survey-modal"
            maskClosable={false}
            footer={false}
            setQuestionModalVisible={setQuestionModalVisible}
            title={`${selectedQuestionType} Ekle`}
            visible={modalVisible}
            // visible={true}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className="survey-container">
                {selectedQuestionType === 'Açık Uçlu Soru' && (
                    <OpenEndedQuestion
                        setQuestionModalVisible={setQuestionModalVisible}
                        setSelectedQuestionType={setSelectedQuestionType}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                        currentForm={currentForm}
                        groupKnowledge={groupKnowledge}
                        questionKnowledge={questionKnowledge}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        form={form}
                    />
                )}
                {selectedQuestionType === 'Tek Seçimli Soru' && (
                    <OneChoiseQuestion
                        setQuestionModalVisible={setQuestionModalVisible}
                        setSelectedQuestionType={setSelectedQuestionType}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                        currentForm={currentForm}
                        groupKnowledge={groupKnowledge}
                        questionKnowledge={questionKnowledge}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        form={form}
                    />
                )}
                {selectedQuestionType === 'Çok Seçimli Soru' && (
                    <MultipleChoiseQuestion
                        setQuestionModalVisible={setQuestionModalVisible}
                        setSelectedQuestionType={setSelectedQuestionType}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                        currentForm={currentForm}
                        groupKnowledge={groupKnowledge}
                        questionKnowledge={questionKnowledge}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                )}
                {selectedQuestionType === 'Boşluk Doldurma Sorusu' && (
                    <FillInTheBlankQuestion
                        setQuestionModalVisible={setQuestionModalVisible}
                        setSelectedQuestionType={setSelectedQuestionType}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                        currentForm={currentForm}
                        groupKnowledge={groupKnowledge}
                        questionKnowledge={questionKnowledge}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                )}
                {selectedQuestionType === 'Likert Tipi Soru' && (
                    <LikertQuestion
                        setQuestionModalVisible={setQuestionModalVisible}
                        setSelectedQuestionType={setSelectedQuestionType}
                        selectedQuestion={selectedQuestion}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        setSelectedQuestion={setSelectedQuestion}
                        currentForm={currentForm}
                        groupKnowledge={groupKnowledge}
                        questionKnowledge={questionKnowledge}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                )}
            </div>
        </CustomModal>
    );
};

export default QuestionModal;
