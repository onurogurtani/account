import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { CustomCollapseCard, Text } from '../../../../components';

const { TabPane } = Tabs;

const ShowAnnouncementTabs = ({ showData }) => {
  return (
    <Tabs defaultActiveKey={'1'}>
      <TabPane tab="Genel Bilgiler" key="1">
        <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
          <ul className="announcement-show">
            <li>
              <Text t="Başlık" /> : <span>{showData?.headText}</span>
            </li>
            <li>
              <Text t="Anasayfa Başlığı" /> : <span>{showData?.homePageContent}</span>
            </li>
            <li style={{ height: 'auto' }} className='content-text-container' >
              <Text t="İçerik" /> :
              <div
                className="announcement-content-text"
                dangerouslySetInnerHTML={{ __html: showData?.content }}
              ></div>
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
            <li>
              <Text t="Arşivlendi mi?" /> :{' '}
              <span>
                {showData?.isActive ? (
                  <span className="status-text-active">Hayır</span>
                ) : (
                  <span className="status-text-passive">Evet</span>
                )}
              </span>
            </li>
          </ul>
        </CustomCollapseCard>
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
          <div className="announcement-show">
          <div className='roleListContainer'>
                <Text t="Roller" /> :{' '}
                {showData.roles && (
                  <ul className="rolesList">
                    {showData.roles.map((r) => (
                      <li key={r.id} className="roles">
                        {r.groupName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </div>
        </CustomCollapseCard>
      </TabPane>
    </Tabs>
  );
};

export default ShowAnnouncementTabs;
