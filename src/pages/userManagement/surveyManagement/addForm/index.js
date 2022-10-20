import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../../../../components';

const addForm = () => {

    return (
      <>
        <h1> YENİ ANKET EKLEME SAYFASI...</h1>
        <CustomButton
          type="primary"
          htmlType="submit"
          // className="submit-btn"
          // onClick={ useHistory().push('/user-management/survey-management') }
        >
          Geri
        </CustomButton>
      </>
    );

  }




export default addForm;
