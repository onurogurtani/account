import React, { useState, useEffect } from 'react';
import { CustomButton } from '../../../../../components';
import PreviewGroup from './PreviewGroup';
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
  const [questionsLength, setQuestionsLength] = useState(0);

  const findOrderOfQuestion = async () => {
    let allQuestions = [];
    let group = questionsOfForm.groupQuestions;
    for (let i = 0; i < group.length; i++) {
      allQuestions.push(group[i].questions);
    }
    let newArr = [];
    for (let i = 0; i < allQuestions.length; i++) {
      for (let b = 0; b < allQuestions[i].length; b++) {
        newArr.push(allQuestions[i][b]);
      }
    }
    setQuestionsLength(newArr.length);
  };
  useEffect(() => {
    findOrderOfQuestion();
  }, [questionsOfForm]);

  return (
    <>
      {questionsLength == 0 ? (
        <div style={{display:'flex',alignItems:'center', justifyContent:'center', padding:'1em' }} >
          <h5 style={{color:'red'}} >Ankete soru eklenmemiştir</h5>

        </div>
      ) : (
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
              currentIndex == maxIndex && <CustomButton className={classes.finishButton}>Anketi Bitir</CustomButton>
            ) : (
              <CustomButton className={classes.finishButton} onClick={handleClose}>
                Anketi Bitir
              </CustomButton>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PreviewList;
