import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import AddAnnouncementInfo from './AddAnnouncementInfo';

const AddAnnouncement = () => {
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
        title={<Text t="Yeni Duyuru" />}
        showBreadCrumb
        showHelpButton
        routes={['Kullanıcı Yönetimi', 'Duyurular']}
      ></CustomPageHeader>
      <CustomButton
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={handleBackButton}
        style={{ marginBottom: '1em' }}
      >
        Geri
      </CustomButton>
      <AddAnnouncementInfo />
    </>
  );
};

export default AddAnnouncement;
