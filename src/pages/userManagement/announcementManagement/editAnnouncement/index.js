import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import EditAnnouncementTabs from './EditAnnouncementTabs';

const EditAnnouncement = () => {
  const [step, setStep] = useState('1');
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    history.push('/user-management/announcement-management');
  };
  return (
    <>
      <CustomPageHeader
        title={<Text t="Duyuru Düzenle" />}
        showBreadCrumb
        showHelpButton
        routes={['Kullanıcı Yönetimi', 'Duyurular']}
      ></CustomPageHeader>
      <CustomButton
        height={50}
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={handleBackButton}
      >
        Geri
      </CustomButton>

      <EditAnnouncementTabs step={step} setStep={setStep} />
    </>
  );
};

export default EditAnnouncement;
