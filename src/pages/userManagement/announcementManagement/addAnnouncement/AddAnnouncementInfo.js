import React from 'react';
import { CustomCollapseCard, Text } from '../../../../components';

import '../../../../styles/asEvTest/asEvGeneral.scss';
import AnnouncementInfoForm from '../forms/AnnouncementInfoForm';

const AddAnnouncementInfo = ({ setAnnouncementInfoData }) => {
  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <div className="form-container">
        <AnnouncementInfoForm setAnnouncementInfoData={setAnnouncementInfoData} />
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementInfo;
