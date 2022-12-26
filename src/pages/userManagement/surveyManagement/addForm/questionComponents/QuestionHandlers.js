import React, { useState, useCallback, useEffect, useRef } from 'react';
import classes from '../../../../../styles/surveyManagement/singleQuestion.module.scss';
import {
  CustomButton,
} from '../../../../../components';
import QuestionModal from '../../questions/QuestionModal';
import { deleteQuestion, getAllQuestionsOfForm,deleteQuestionFromGroup } from '../../../../../store/slice/formsSlice';
import { useDispatch, useSelector } from 'react-redux';

const typeEnum = {
  1: 'Açık Uçlu Soru',
  2: 'Tek Seçimli Soru',
  3: 'Çok Seçimli Soru',
  4: 'Boşluk Doldurma Sorusu',
  5: 'Likert Tipi Soru',
};
const QuestionHandlers = ({ questionKnowledge, groupKnowledge }) => {
  const dispatch = useDispatch();
  const { currentForm } = useSelector((state) => state?.forms);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    typeEnum[questionKnowledge.questionTypeId],
  );

  const [currentQuestion, setCurrentQuestion] = useState({});


  const upDateQuestionHandler = async (questionKnowledge) => {
    setIsEdit(!isEdit);
    setUpdateModalVisible(true);
    setCurrentQuestion(questionKnowledge);
  };
  const deleteteQuestionHandler = async () => {
    let data = { id: questionKnowledge.formQuestionId };
    let data2={id:questionKnowledge.questionGroupOfQuestionId}
    await dispatch(deleteQuestion(data));
    await dispatch(deleteQuestionFromGroup(data2))
    await dispatch(getAllQuestionsOfForm({ formId :groupKnowledge.formId }));
  };
  const setScoreHandler = (questionKnowledge) => {};
  return (
    <>
      <div className={classes.actionButtonsContainer}>
        <CustomButton className={classes.updateButton} onClick={upDateQuestionHandler}>
          Düzenle
        </CustomButton>
        <CustomButton className={classes.deleteButton} onClick={() => deleteteQuestionHandler()}>
          Sil
        </CustomButton>
      </div>
      <QuestionModal
        modalVisible={updateModalVisible}
        setQuestionModalVisible={setUpdateModalVisible}
        selectedQuestionType={selectedQuestionType}
        setSelectedQuestionType={setSelectedQuestionType}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        groupKnowledge={groupKnowledge}
        questionKnowledge={questionKnowledge}
        currentForm={currentForm}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default QuestionHandlers;
