import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';
import { getAllQuestionsOfForm } from '../../../../../store/slice/formsSlice';
import SingleQuestion from './SingleQuestion';

const PreviewGroup = ({ groupKnowledge, questionsOfForm, preview, setPreview, currentForm }) => {
    const dispatch = useDispatch();

    const loadData = async () => {
        await dispatch(getAllQuestionsOfForm({ formId: currentForm.id }));
    };

    useEffect(() => {
        if (currentForm) {
            loadData();
        }
    }, [currentForm]);

    return (
        <>
            <div className={classes.previewGroupContainer}>
                {groupKnowledge?.name != '1.Grup Sorular' && (
                    <h1 className={classes.groupHeader}>{groupKnowledge?.name}</h1>
                )}

                {groupKnowledge?.questions?.length == 0 ? (
                    <h5 style={{ color: 'red' }}>Bu gruba Soru eklenmemiştir</h5>
                ) : (
                    groupKnowledge?.questions.map((question, index) => (
                        <SingleQuestion
                            key={index}
                            preview={preview}
                            setPreview={setPreview}
                            questionsOfForm={questionsOfForm}
                            groupKnowledge={groupKnowledge}
                            questionKnowledge={question}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default PreviewGroup;
