import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import AddSurveyTabs from './AddSurveyTabs';
import { setShowFormObj, setCurrentForm } from '../../../../store/slice/formsSlice';

const AddSurvey = () => {
  const dispatch = useDispatch();
  const { formCategories, formPackages, currentForm, showFormObj } = useSelector((state) => state?.forms);

  const [updateForm, setUpdateForm] = useState(currentForm.id != undefined ? true : false);

  const [pageName, setPageName] = useState(showFormObj?.name != undefined ? 'Anket Güncelleme' : 'Yeni Anket');
  useEffect(() => {
    dispatch(setCurrentForm({ ...showFormObj }));
  }, [showFormObj]);

  const history = useHistory();
  const [step, setStep] = useState('1');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    history.push('/user-management/survey-management');
    dispatch(setShowFormObj({}));
    setUpdateForm(false);
  };
  return (
    <>
      <CustomPageHeader
        title={<Text t={pageName} />}
        showBreadCrumb
        showHelpButton
        routes={['Kullanıcı Yönetimi', 'Anketler']}
      ></CustomPageHeader>
      <CustomButton type="primary" htmlType="submit" className="submit-btn" onClick={handleBackButton}>
        Geri
      </CustomButton>
      <AddSurveyTabs step={step} setStep={setStep} />
    </>
  );
};

export default AddSurvey;
