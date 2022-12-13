import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';
import { getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';
import SingleQuestion from './SingleQuestion';

const PreviewGroup = ({ groupKnowledge, questionsOfForm, preview, setPreview, currentForm }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentForm) {
      dispatch(getAllQuestionsOfForm({ formId: groupKnowledge.formId }));
    }
  }, [currentForm]);
  return (
    <>
      <div className={classes.previewGroupContainer}>
        <h1 className={classes.groupHeader} >{groupKnowledge.name}</h1>
        {groupKnowledge?.questions.map((question) => (
          <SingleQuestion
            preview={preview}
            setPreview={setPreview}
            questionsOfForm={questionsOfForm}
            groupKnowledge={groupKnowledge}
            questionKnowledge={question}
          />
        ))}
      </div>
    </>
  );
};

export default PreviewGroup;
