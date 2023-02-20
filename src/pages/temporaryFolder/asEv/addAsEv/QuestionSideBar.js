import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomButton } from '../../../../components';
import '../../../../styles/temporaryFile/asEv.scss';
import ChangeQuestionForm from './ChangeQuestionForm';
import QuestionKnowledgeList from './QuestionKnowledgeList';

const QuestionSideBar = ({ setSelectnewQuestion, currentSlideIndex, data, showAsEv }) => {
  const [openForm, setOpenForm] = useState(false);
  const { newAsEv, asEvQuestions } = useSelector((state) => state?.asEv);

  return (
    <div className="question-filter-container">
      {!showAsEv && (
        <div className="button-container">
          {openForm && <CustomButton className="question-change-button">Soru Değiştir</CustomButton>}
          {!openForm && (
            <CustomButton className="question-change-button" onClick={() => setOpenForm(true)}>
              Yeni Soru Getir
            </CustomButton>
          )}
        </div>
      )}

      {/* // TODO AŞAĞIDAKİ DATAI KONTROL ETM LAZIM */}
      {!openForm && (
        <div
          style={{
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <QuestionKnowledgeList data={data} currentSlideIndex={currentSlideIndex} />
        </div>
      )}

      {openForm && <ChangeQuestionForm setSelectnewQuestion={setSelectnewQuestion} />}
    </div>
  );
};

export default QuestionSideBar;
