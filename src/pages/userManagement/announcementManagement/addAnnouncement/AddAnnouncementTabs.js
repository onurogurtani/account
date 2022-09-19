import { Tabs } from 'antd';
import React, { useState } from 'react';
import AddAnnouncementInfo from './AddAnnouncementInfo';
import AddAnnouncementRole from './AddAnnouncementRole';

const { TabPane } = Tabs;

const AddAnnouncementTabs = ({ step, setStep }) => {
  const [announcementInfoData, setAnnouncementInfoData] = useState({});
  return (
    <Tabs defaultActiveKey={'1'} activeKey={step} onChange={(key) => setStep(key)}>
      <TabPane tab="Genel Bilgiler" key="1">
        <AddAnnouncementInfo setStep={setStep} setAnnouncementInfoData={setAnnouncementInfoData} />
      </TabPane>
      <TabPane disabled={true} tab="Roller" key="2">
        <AddAnnouncementRole setStep={setStep} announcementInfoData={announcementInfoData} />
      </TabPane>
    </Tabs>
  );
};

export default AddAnnouncementTabs;
