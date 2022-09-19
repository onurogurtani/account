import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditAnnouncementInfo from './EditAnnouncementInfo';
import EditAnnouncementRole from './EditAnnouncementRole';

const { TabPane } = Tabs;

const EditAnnouncementTabs = ({ step, setStep }) => {
  const location = useLocation();
  const [announcementInfoData, setAnnouncementInfoData] = useState({});
  const [formData, setFormData] = useState(true);
  const [selectedRole, setSelectedRole] = useState(location?.state?.data.groups);

  return (
    <Tabs defaultActiveKey={'1'} activeKey={step} onChange={(key) => setStep(key)}>
      <TabPane tab="Genel Bilgiler" key="1">
        <EditAnnouncementInfo
          selectedRole={selectedRole}
          setStep={setStep}
          setAnnouncementInfoData={setAnnouncementInfoData}
          announcementInfoData={announcementInfoData}
          setFormData={setFormData}
        />
      </TabPane>
      <TabPane tab="Roller" disabled={location?.state?.justDateEdit} key="2">
        <EditAnnouncementRole
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          setStep={setStep}
          announcementInfoData={announcementInfoData}
          formData={formData}
        />
      </TabPane>
    </Tabs>
  );
};

export default EditAnnouncementTabs;
