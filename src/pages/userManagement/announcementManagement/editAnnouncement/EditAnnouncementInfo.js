import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CustomCollapseCard, Text } from '../../../../components';

import '../../../../styles/announcementManagement/addAnnouncementInfo.scss';
import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';

const AddAnnouncementInfo = ({
  setStep,
  setAnnouncementInfoData,
  selectedRole,
  announcementInfoData,
  setFormData,
}) => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (!location?.state?.data) {
      history.push('/user-management/announcement-management');
    }
  }, []);

  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <div className="addAnnouncementInfo-container">
        <AnnouncementInfoForm
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          history={history}
          initialValues={location?.state?.data}
          selectedRole={selectedRole}
          announcementInfoData={announcementInfoData}
          setFormData={setFormData}
        />
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementInfo;