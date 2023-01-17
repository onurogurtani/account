import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomPageHeader, Text } from '../../../../components';
import '../../../../styles/announcementManagement/saveAndFinish.scss';
import EditAnnouncementInfo from './EditAnnouncementInfo';

const EditAnnouncement = () => {
  const [announcementInfoData, setAnnouncementInfoData] = useState({});
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
        style={{ marginBottom: '1em' }}
      >
        Geri
      </CustomButton>

      <EditAnnouncementInfo
        setAnnouncementInfoData={setAnnouncementInfoData}
        announcementInfoData={announcementInfoData}
        updated={updated}
        setUpdated={setUpdated}
      />
    </>
  );
};

export default EditAnnouncement;
