import dayjs from 'dayjs';
import React, { useState } from 'react';
import { CustomCollapseCard, Text } from '../../../../components';

const announcementPublicationPlacesEnum = {
  1: 'Anasayfa',
  2: 'Anketler Sayfası',
  3: 'Bildirimler',
  4: 'Pop-up',
};
const ShowAnnouncementCard = ({ showData }) => {
  const [imageSrc, setImageSrc] = useState(
    showData?.file?.thumbUrl
      ? showData?.file?.thumbUrl
      : `data:${showData?.file?.contentType};base64,${showData?.file?.file}`,
  );
  return (
    <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
      <ul className="announcement-show">
        <li>
          <Text t="Başlık" /> : <span>{showData?.headText}</span>
        </li>
        <li>
          <Text t="Duyuru Tipi" /> : <span>{showData?.announcementType?.name}</span>
        </li>
        <li style={{ height: 'auto' }} className="content-text-container">
          <Text t="İçerik" /> :
          <div className="announcement-content-text" dangerouslySetInnerHTML={{ __html: showData?.content }}></div>
        </li>
        <li>
          <Text t="Duyuru Anasayfa Metni" /> : <span>{showData?.homePageContent}</span>
        </li>
        <li>
          <Text t="Duyuru İkonu" /> : <img src={imageSrc} alt="Duyuru ikonu" width="100" />
        </li>
        {showData?.buttonName && showData?.buttonUrl && (
          <>
            <li>
              <Text t="Duyuru Detay Sayfası Buton Adı" /> : <span>{showData?.buttonName}</span>
            </li>
            <li>
              <Text t="Duyuru Yönlendirileceği Link" /> : <span>{showData?.buttonUrl}</span>
            </li>
          </>
        )}
        <li>
          <Text t="Başlangıç Tarihi" /> : <span>{dayjs(showData?.startDate)?.format('YYYY-MM-DD HH:mm')}</span>
        </li>
        <li>
          <Text t="Bitiş Tarihi" /> : <span>{dayjs(showData?.endDate)?.format('YYYY-MM-DD HH:mm')}</span>
        </li>
        <li>
          <div className="roleListContainer">
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
        </li>
        <li>
          <div className="roleListContainer">
            <Text t="Duyuru Yayınlanma Yeri" /> :{' '}
            {showData?.announcementPublicationPlaces && (
              <ul className="rolesList">
                {showData?.announcementPublicationPlaces?.map((p) => (
                  <li key={p} className="roles">
                    {announcementPublicationPlacesEnum[p]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li>
          <Text t="Yayınlanma Durumu" /> :{' '}
          <span>
            {showData?.publishStatus == 1 ? (
              <span>Yayında</span>
            ) : showData?.publishStatus == 2 ? (
              <span>Yayında Değil</span>
            ) : (
              <span>Taslak</span>
            )}
          </span>
        </li>
      </ul>
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
    </CustomCollapseCard>
  );
};

export default ShowAnnouncementCard;
