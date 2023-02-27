import React, { useCallback, useEffect } from 'react';
import { CustomButton, CustomImage, CustomModal } from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import { useSelector } from 'react-redux';
import '../../../../styles/workPlanManagement/questionListModal.scss';

const QuestionListModal = ({ modalVisible, handleModalVisible, modalTitle }) => {
  const { evaluationTab } = useSelector((state) => state?.workPlan);

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      handleModalVisible(false);
    },
    [handleModalVisible],
  );

  useEffect(() => {
    if (evaluationTab.questionList.length > 0) {
      console.log('sorular listesi-> ', evaluationTab.questionList);
    }
  }, [evaluationTab.questionList]);

  return (
    <CustomModal
      className='question-list-modal'
      width={650}
      maskClosable={false}
      footer={false}
      title={modalTitle}
      visible={modalVisible}
      onCancel={handleClose}
      closeIcon={<CustomImage src={modalClose} />}
    >
      <div className='question-list'>
        {evaluationTab?.questionList.map((item, key) => {
          return <div className='question-list-item'>
            <span>{key + 1}- </span>
            <img
              width={450}
              alt='logo'
              src={`data:image/png;base64,${item?.questionOfExam.file?.fileBase64}`}
            />
          </div>;
        })}

        <div className='action-content'>
          <CustomButton className='edit-btn'>
            Testi Düzenle
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default QuestionListModal;
