import React, { useEffect, useState, useCallback } from 'react';
import classes from '../../../../styles/surveyManagement/addSurvey.module.scss';
import { CustomButton } from '../../../../components';
import { useLocation } from 'react-router-dom';
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
  const { currentForm, questionsOfForm } = useSelector((state) => state?.forms);

  useEffect(() => {
    if (currentForm) {
      dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
      dispatch(getLikertType());
    }
  }, []);

  const newGroupData = {
    entity: {
      name: '1.Grup Sorular',
      scoringType: 2,
      formId: currentForm?.id,
    },
  };

  const addFirsGroupToForm = async () => {
    setAddFirstShow(false);
    await dispatch(addNewGroupToForm(newGroupData));
    await dispatch(getAllQuestionsOfForm({ formId: currentForm?.id }));
  };

  return (
    <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
      {addFirstShow && (
        <>
          <p>Bilgilendirme yazısı olabilir burada...</p>
          <div className={classes.addFirsContainer}>
            <CustomButton className={classes.addfirstButton} onClick={addFirsGroupToForm}>
              Anket Sorularını Oluştur
            </CustomButton>
          </div>
        </>
      )}

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
      {!addFirstShow && (
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
