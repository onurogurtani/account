import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomButton } from '../../../../components';
import '../../../../styles/temporaryFile/asEv.scss';
import ChangeQuestionForm from './ChangeQuestionForm';
import QuestionKnowledgeList from './QuestionKnowledgeList';

const QuestionSideBar = ({ setSelectnewQuestion, currentSlideIndex, data }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="question-filter-container">
      <div className="button-container">
        {openForm && (
          <CustomButton
            className="question-change-button"
            //  onClick={() => setOpenForm(false)}
          >
            Soru Değiştir
          </CustomButton>
        )}
        {!openForm && (
          <CustomButton className="question-change-button" onClick={() => setOpenForm(true)}>
            Yeni Soru Getir
          </CustomButton>
        )}
      </div>

      {/* // TODO AŞAĞIDAKİ DATAI KONTROL ETM LAZIM */}
      {!openForm && (
        <div
          style={{
            // border: '2px solid pink',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <QuestionKnowledgeList data={data} currentSlideIndex={currentSlideIndex} />
        </div>
      )}

      {openForm && <ChangeQuestionForm />}
    </div>
  );
};

export default QuestionSideBar;
