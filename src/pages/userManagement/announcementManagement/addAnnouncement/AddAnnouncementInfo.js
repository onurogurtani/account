import React from 'react';
import { CustomCollapseCard, Text } from '../../../../components';

import '../../../../styles/announcementManagement/addAnnouncementInfo.scss';
import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';

const AddAnnouncementInfo = ({ setAnnouncementInfoData }) => {

  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <div className="addAnnouncementInfo-container">
        <AnnouncementInfoForm setAnnouncementInfoData={setAnnouncementInfoData}  />
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementInfo;
