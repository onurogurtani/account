import React, { useState } from 'react';
import { CustomButton, CustomInput, CustomModal } from '../../../components';

const AddQuestion = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="add-question-trial">
      <div className=" header-add-question">
        <div className="add-part">
          <div>
            <CustomInput />
          </div>
          <div>
            <CustomButton>Bölüm Ekle</CustomButton>
          </div>
        </div>
        <div>
          <CustomButton>Önizleme</CustomButton>
        </div>
      </div>
      <div
        onClick={() => {
          setModalShow(true);
        }}
        className="add-question-button"
      >
        <CustomButton>Soru Ekle</CustomButton>
      </div>

      <CustomModal
        onCancel={() => {
          setModalShow(false);
        }}
        width={1000}
        title="Soru Ekle"
        visible={modalShow}
      >
        ssasasa
      </CustomModal>
    </div>
  );
};

export default AddQuestion;
