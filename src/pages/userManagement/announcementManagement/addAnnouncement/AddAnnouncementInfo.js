import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomCollapseCard, Text } from '../../../../components';

import '../../../../styles/announcementManagement/addAnnouncementInfo.scss';
import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';

const AddAnnouncementInfo = ({ setStep, setAnnouncementInfoData }) => {
  const history = useHistory();

  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <div className="addAnnouncementInfo-container">
        <AnnouncementInfoForm
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          history={history}
        />
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementInfo;
