import dayjs from 'dayjs';
import { sanitize } from 'dompurify';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCollapseCard, Text } from '../../../../components';
import { getParticipantGroupsList, resetParticipantGroupsList } from '../../../../store/slice/eventsSlice';
import '../../../../styles/announcementManagement/showAnnouncement.scss';

const announcementPublicationPlacesEnum = {
    1: 'Anasayfa',
    2: 'Anketler Sayfası',
    3: 'Bildirimler',
    4: 'Pop-up',
};
const ShowAnnouncementCard = ({ showData }) => {
    const dispatch = useDispatch();

    const loadData = async () => {
        dispatch(
            getParticipantGroupsList({
                params: {
                    'ParticipantGroupDetailSearch.PageSize': 100000000,
                },
            }),
        );
    };

    useEffect(() => {
        loadData();

        return () => {
            dispatch(resetParticipantGroupsList());
        };
    }, []);

    const { participantGroupsList } = useSelector((state) => state?.events);

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
                    <div
                        className="announcement-content-text"
                        dangerouslySetInnerHTML={{ __html: sanitize(showData?.content) }}
                    ></div>
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
                    <Text t="Başlangıç Tarihi" /> :{' '}
                    <span>{dayjs(showData?.startDate)?.format('YYYY-MM-DD HH:mm')}</span>
                </li>
                <li>
                    <Text t="Bitiş Tarihi" /> : <span>{dayjs(showData?.endDate)?.format('YYYY-MM-DD HH:mm')}</span>
                </li>
                <li>
                    <div className="roleListContainer">
                        <Text t="Katılımcı Tipi" /> :
                        <ul className="rolesList">
                            {showData?.participantType?.name?.split(',').map((text, index) => (
                                <li key={index} className="roles">
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="roleListContainer">
                        <Text t="Katılımcı Grubu" /> :
                        <ul className="rolesList">
                            {showData?.participantGroup?.name?.split(',').map((text, index) => (
                                <li key={index} className="roles">
                                    {text}
                                </li>
                            ))}
                        </ul>
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
                {showData?.insertTime && (
                    <li>
                        <Text t="Oluşturma Tarihi" /> :{' '}
                        <span>{dayjs(showData?.insertTime)?.format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                )}
                {showData?.insertName && (
                    <li>
                        <Text t="Oluşturan" /> : <span>...</span>
                    </li>
                )}
                {showData?.updateTime && (
                    <li>
                        <Text t="Güncelleme Tarihi" /> :{' '}
                        <span>{dayjs(showData?.updateTime)?.format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                )}
                {showData?.updateName && (
                    <li>
                        <Text t="Güncelleyen" /> : <span>...</span>
                    </li>
                )}
            </ul>
        </CustomCollapseCard>
    );
};

export default ShowAnnouncementCard;
