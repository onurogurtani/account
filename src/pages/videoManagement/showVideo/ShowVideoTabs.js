import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { CustomCollapseCard } from '../../../components';
import dayjs from 'dayjs';
import ShowVideoGeneralInformation from './ShowVideoGeneralInformation';
import ShowVideoDocument from './ShowVideoDocument';
import ShowVideoQuestion from './ShowVideoQuestion';
import ModuleShowFooter from '../../../components/ModuleShowFooter';

const { TabPane } = Tabs;

const ShowVideoTabs = () => {
  const { currentVideo } = useSelector((state) => state?.videos);

  return (
    <>
      {Object.keys(currentVideo).length ? (
        <>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Genel Bilgiler" key="1">
              <CustomCollapseCard cardTitle="Genel Bilgiler">
                <ShowVideoGeneralInformation />
              </CustomCollapseCard>
            </TabPane>
            <TabPane tab="Dokümanlar" key="2">
              <CustomCollapseCard cardTitle="Dokümanlar">
                <ShowVideoDocument />
              </CustomCollapseCard>
            </TabPane>
            <TabPane tab="Konu İle İlgili Tüm Sorular" key="3">
              <CustomCollapseCard cardTitle="Konu İle İlgili Tüm Sorular">
                <ShowVideoQuestion />
              </CustomCollapseCard>
            </TabPane>
          </Tabs>
          <ModuleShowFooter
            insertTime={currentVideo?.insertTime}
            insertUserFullName={currentVideo?.insertUserFullName}
            updateTime={currentVideo?.updateTime}
            updateUserFullName={currentVideo?.updateUserFullName}
          />
        </>
      ) : null}
    </>
  );
};

export default ShowVideoTabs;
