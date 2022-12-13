import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import AddSurveyTabs from './AddSurveyTabs';


const AddSurvey = () => {
  const history = useHistory();
  const [step, setStep] = useState('1');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    history.push('/user-management/survey-management');
  };
  return (
    <>
      <CustomPageHeader
        title={<Text t="Yeni Anket" />}
        showBreadCrumb
        showHelpButton
        routes={['Kullanıcı Yönetimi', 'Anketler']}
      ></CustomPageHeader>
      <CustomButton
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={handleBackButton}
      >
        Geri
      </CustomButton>
      <AddSurveyTabs step={step} setStep={setStep} />
    </>
  );
};

export default AddSurvey;

