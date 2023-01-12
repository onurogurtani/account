import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditAnnouncementInfo from './EditAnnouncementInfo';


const EditAnnouncementTabs = ({ step, setStep, setUpdated, updated }) => {
  const location = useLocation();
  const [announcementInfoData, setAnnouncementInfoData] = useState({});
  const [formData, setFormData] = useState(true);
  const [selectedRole, setSelectedRole] = useState(location?.state?.data.roles);
  const [updateId, setUpdateId] = useState('');

  return (
        <EditAnnouncementInfo
          selectedRole={selectedRole}
          setStep={setStep}
          step={step}
          setAnnouncementInfoData={setAnnouncementInfoData}
          announcementInfoData={announcementInfoData}
          setFormData={setFormData}
          setUpdateId={setUpdateId}
          updated={updated}
          setUpdated={setUpdated}
        />
  );
};

export default EditAnnouncementTabs;
