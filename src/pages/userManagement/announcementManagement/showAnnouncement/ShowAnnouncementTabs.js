import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { CustomCollapseCard, Text } from '../../../../components';

const { TabPane } = Tabs;

const AddAnnouncementTabs = ({ showData }) => {
  console.log(showData);
  return (
    <Tabs defaultActiveKey={'1'}>
      <TabPane tab="Genel Bilgiler" key="1">
        <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
          <ul className="announcement-show">
            <li>
              <Text t="Başlık" /> : <span>{showData?.headText}</span>
            </li>
            <li>
              <Text t="İçerik" /> : <span>{showData?.text}</span>
            </li>
            <li>
              <Text t="Başlangıç Tarihi" /> :{' '}
              <span>{dayjs(showData?.startDate)?.format('YYYY-MM-DD HH:mm')}</span>
            </li>
            <li>
              <Text t="Bitiş Tarihi" /> :{' '}
              <span>{dayjs(showData?.endDate)?.format('YYYY-MM-DD HH:mm')}</span>
            </li>
            <li>
              <Text t="Yayınlandı mı?" /> :{' '}
              <span>
                {showData?.isPublished ? (
                  <span className="status-text-active">Evet</span>
                ) : (
                  <span className="status-text-passive">Hayır</span>
                )}
              </span>
            </li>
          </ul>
        </CustomCollapseCard>
        {/* //TODO:Api düzelince bilgiler eklenecek announcement-show-footer*/}
        <ul className="announcement-show-footer">
          <li>
            <Text t="Oluşturma Tarihi" /> : <span>...</span>
          </li>
          <li>
            <Text t="Oluşturan" /> : <span>...</span>
          </li>
          <li>
            <Text t="Güncelleme Tarihi" /> : <span>...</span>
          </li>
          <li>
            <Text t="Güncelleyen" /> : <span>...</span>
          </li>
        </ul>
      </TabPane>
      <TabPane tab="Roller" key="2">
        <CustomCollapseCard cardTitle={<Text t="Roller" />}>
          <div className="announcement-show-role">
            {showData?.groups?.map((group, id) => {
              return (
                <Tag color={'green'} key={id}>
                  {group.groupName.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        </CustomCollapseCard>
      </TabPane>
    </Tabs>
  );
};

export default AddAnnouncementTabs;
