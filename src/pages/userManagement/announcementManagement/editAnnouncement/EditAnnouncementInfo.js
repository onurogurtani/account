import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CustomCollapseCard, Text } from '../../../../components';

import '../../../../styles/asEvTest/asEvGeneral.scss';
import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';

const AddAnnouncementInfo = ({
  setAnnouncementInfoData,
  announcementInfoData,

  updated,
  setUpdated,
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
      <div className="form-container">
        <AnnouncementInfoForm
          setAnnouncementInfoData={setAnnouncementInfoData}
          history={history}
          initialValues={location?.state?.data}
          announcementInfoData={announcementInfoData}
          updated={updated}
          setUpdated={setUpdated}
        />
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementInfo;
