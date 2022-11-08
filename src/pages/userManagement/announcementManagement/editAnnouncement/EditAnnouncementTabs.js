import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditAnnouncementInfo from './EditAnnouncementInfo';
import EditAnnouncementRole from './EditAnnouncementRole';

const { TabPane } = Tabs;

const EditAnnouncementTabs = ({ step, setStep, setUpdated, updated }) => {
  const location = useLocation();
  const [announcementInfoData, setAnnouncementInfoData] = useState({});
  const [formData, setFormData] = useState(true);
  const [selectedRole, setSelectedRole] = useState(location?.state?.data.roles);
  const [updateId, setUpdateId] = useState('');

  return (
    <Tabs defaultActiveKey={'1'} activeKey={step} onChange={(key) => setStep(key)}>
      <TabPane tab="Genel Bilgiler" key="1">
        <EditAnnouncementInfo
          selectedRole={selectedRole}
          setStep={setStep}
          setAnnouncementInfoData={setAnnouncementInfoData}
          announcementInfoData={announcementInfoData}
          setFormData={setFormData}
          setUpdateId={setUpdateId}
          updated={updated}
          setUpdated={setUpdated}
        />
      </TabPane>
      <TabPane tab="Roller" disabled={location?.state?.justDateEdit} key="2">
        <EditAnnouncementRole
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          setStep={setStep}
          announcementInfoData={announcementInfoData}
          formData={formData}
          updated={updated}
          setUpdated={setUpdated}
        />
      </TabPane>
    </Tabs>
  );
};

export default EditAnnouncementTabs;
