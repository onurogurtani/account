import React, { useState, useContext, useEffect, useCallback, useMemo, Children } from 'react';
import { CustomModal, CustomTable } from '../../../../components';
import '../../../../styles/temporaryFile/asEvSwiper.scss';

const NewQuestionModal = ({ isVisible, setIsVisible, children }) => {
  const onOk = async () => {
    //TODO BURADA BE TARAFINDA İSTEK ATIP yeni SORULARI ÇEKMEK LAZIM
    setIsVisible(false);
    // setDisabled(false);
    // setStep('2');
  };
  const onCancel = async () => {
    setIsVisible(false);
  };
  return (
    <CustomModal
      visible={isVisible}
      //   title={selectedAnnouncementTypeId ? 'Duyuru Tipi Güncelle' : 'Yeni Duyuru Tipi Ekleme'}
      title={false}
      okText={'Soruları Göster'}
      cancelText={'Vazgeç'}
      onCancel={onCancel}
      onOk={onOk}
      footer={false}
      className="new-question-modal"
    >
      {' '}
      {children}
    </CustomModal>
  );
};

export default NewQuestionModal;
