import { CustomImage, CustomModal, CustomButton } from '../../../../../components';
import modalClose from '../../../../../assets/icons/icon-close.svg';
import React, { useCallback, useState } from 'react';
import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';
import PreviewList from './PreviewList';

const SurveyPreviewModal = ({
  previewModalVisible,
  setPreviewModalVisible,
  currentForm,
  questionsOfForm,
  handleClose,
  preview,
  setPreview,
}) => {
  return (
    <CustomModal
      className={classes.previewModal}
      maskClosable={false}
      footer={false}
      setPreviewModalVisible={setPreviewModalVisible}
      title={<h2 style={{ textAlign: 'center' }}>{`${currentForm?.name} Önizlemesi`}</h2>}
      visible={previewModalVisible}
      onCancel={handleClose}
      closeIcon={<CustomImage src={modalClose} />}
    >
      <PreviewList
        previewModalVisible={previewModalVisible}
        setPreviewModalVisible={setPreviewModalVisible}
        currentForm={currentForm}
        questionsOfForm={questionsOfForm}
        handleClose={handleClose}
        preview={preview}
        setPreview={setPreview}
      />
    </CustomModal>
  );
};

export default SurveyPreviewModal;
