import React, { useState, useEffect } from 'react';
import { CustomImage, CustomModal, CustomButton } from '../../../../../components';
import OnlyQuestion from './OnlyQuestions';
import PreviewGroup from './PreviewGroup';
import QuestionGroup from './QuestionGroup';
import SingleQuestion from './SingleQuestion';
import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';

const PreviewList = ({
  previewModalVisible,
  setPreviewModalVisible,
  currentForm,
  questionsOfForm,
  handleClose,
  preview,
  setPreview,
}) => {
  const [questions, setQuestions] = useState();
  const [maxIndex, setMaxIndex] = useState(questionsOfForm.groupQuestions.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (questionsOfForm?.groupQuestions) {
      setQuestions(questionsOfForm.groupQuestions);
    }
  }, [questionsOfForm]);
  useEffect(() => {}, [questions]);

  return (
    <>
      <PreviewGroup
        currentForm={currentForm}
        questionsOfForm={questionsOfForm}
        preview={preview}
        setPreview={setPreview}
        groupKnowledge={questionsOfForm?.groupQuestions[currentIndex]}
      />
      <h6 style={{ textAlign: 'center' }}>{`${currentIndex + 1}/${maxIndex + 1}`}</h6>
      <div className={classes.previewFooter}>
        {currentIndex != 0 && (
          <CustomButton
            onClick={() => {
              setCurrentIndex((prev) => prev - 1);
            }}
            className={classes.backButton}
          >
            Geri
          </CustomButton>
        )}
        {currentIndex != maxIndex && (
          <CustomButton
            onClick={() => {
              setCurrentIndex((prev) => prev + 1);
            }}
            className={classes.nextButton}
          >
            İleri
          </CustomButton>
        )}

        {currentForm.onlyComletedWhenFinish ? (
          currentIndex == maxIndex && (
            <CustomButton className={classes.finishButton}>Anketi Bitir</CustomButton>
          )
        ) : (
          <CustomButton className={classes.finishButton} onClick={handleClose}>
            Anketi Bitir
          </CustomButton>
        )}
      </div>
    </>
  );
};

export default PreviewList;
