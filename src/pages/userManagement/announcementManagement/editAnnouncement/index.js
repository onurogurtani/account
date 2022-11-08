import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import EditAnnouncementTabs from './EditAnnouncementTabs';
import { CustomButton, Text, CustomPageHeader } from '../../../../components';
import '../../../../styles/announcementManagement/saveAndFinish.scss';

const EditAnnouncement = () => {
  const [step, setStep] = useState('1');
  const [updated, setUpdated] = useState(false);
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
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={handleBackButton}
      >
        Geri
      </CustomButton>

      <EditAnnouncementTabs
        step={step}
        setStep={setStep}
        updated={updated}
        setUpdated={setUpdated}
      />
    </>
  );
};

export default EditAnnouncement;
