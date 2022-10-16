import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CustomPageHeader } from '../../components';
import GeneralInformation from './generalInformation';
import AddDocument from './addDocument';
import VideoQuestion from './videoQuestion';
import '../../styles/videoManagament/addVideo.scss';

const AddVideo = () => {
  const { TabPane } = Tabs;
  const { activeKey } = useSelector((state) => state?.videos);

  useEffect(() => {
    return () => {
      alert('uyarı');
    };
  }, []);

  return (
    <CustomPageHeader title="Video Ekle" showBreadCrumb routes={['Video Yönetimi']}>
      <div className="addVideo-wrapper">
        <Tabs
          type="card"
          // activeKey={activeKey}
          onTabClick={(newKey, e) => {
            const isTriggeredByClick = e;
            if (isTriggeredByClick) return;
          }}
        >
          <TabPane tab="Genel Bilgiler" key="0">
            <GeneralInformation />
          </TabPane>
          <TabPane tab="Doküman" key="1">
            <AddDocument />
          </TabPane>
          <TabPane tab="Konu İle İlgili Tüm Sorular" key="2">
            <VideoQuestion />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default AddVideo;
