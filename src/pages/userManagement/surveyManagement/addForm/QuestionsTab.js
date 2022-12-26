import React, { useEffect, useState, useCallback } from 'react';
import classes from '../../../../styles/surveyManagement/addSurvey.module.scss';
import { CustomButton } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCollapseCard, Text } from '../../../../components';
import { addNewGroupToForm, getAllQuestionsOfForm } from '../../../../store/slice/formsSlice';
import { getLikertType } from '../../../../store/slice/questionSlice';
import QuestionGroup from './questionComponents/QuestionGroup';
import QuestionTabFooter from './questionComponents/QuestionTabFooter';

const QuestionsTab = ({ setStep, step }) => {
  const [addFirstShow, setAddFirstShow] = useState(true);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const { currentForm, questionsOfForm, showFormObj } = useSelector((state) => state?.forms);

  useEffect(() => {
    if (currentForm) {
      dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
      dispatch(getLikertType());
    }
  }, []);

  

  return (
    <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
      <p>Bilgilendirme yazısı olabilir burada...</p>

      {questionsOfForm?.groupQuestions.map((group, idx) => (
        <QuestionGroup
          preview={preview}
          setPreview={setPreview}
          surveyData={currentForm}
          key={idx}
          groupKnowledge={group}
          questionsOfForm={questionsOfForm}
        />
      ))}
      {(!addFirstShow || showFormObj.id != undefined) && (
        <QuestionTabFooter
          preview={preview}
          setPreview={setPreview}
          setStep={setStep}
          step={step}
          currentForm={currentForm}
          questionsOfForm={questionsOfForm}
        />
      )}
    </CustomCollapseCard>
  );
};

export default QuestionsTab;
