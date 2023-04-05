import { Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomCollapseCard } from '../../../components';
import { declarationType } from '../../../constants';
import { eventLocations, eventTypes } from '../../../constants/events';
import { participantGroupTypes } from '../../../constants/settings/participantGroups';
import { dateTimeFormat } from '../../../utils/keys';

const EventShow = () => {
    const { currentEvent } = useSelector((state) => state?.events);

    return (
        <CustomCollapseCard cardTitle="Etkinlik Görüntüleme">
            <div>
                <ul className="list">
                    <li>
                        Etkinlik Adı: <span>{currentEvent?.name}</span>
                    </li>

                    <li>
                        Açıklama: <span>{currentEvent?.description}</span>
                    </li>

                    <li>
                        Etkinlik Türü:
                        <span>
                            {currentEvent?.eventTypeOfEvents?.map((item, id) => {
                                return (
                                    <Tag className="m-1" color="blue" key={id}>
                                        {item?.eventType?.name}
                                    </Tag>
                                );
                            })}
                        </span>
                    </li>

                    <li>
                        Etkinlik Tipi:{' '}
                        <span>{eventTypes.find((i) => i.id === currentEvent?.eventTypeEnum)?.value}</span>
                    </li>

                    <li>
                        Durum:{' '}
                        <span>
                            {currentEvent.isActive ? (
                                <Tag color="green" key={1}>
                                    Aktif
                                </Tag>
                            ) : (
                                <Tag color="red" key={2}>
                                    Pasif
                                </Tag>
                            )}
                        </span>
                    </li>

                    <li>
                        Anket Kategorisi: <span>{currentEvent?.form?.categoryOfForm?.name || 'Anket Eklenmedi'}</span>
                    </li>

                    <li>
                        Anket: <span>{currentEvent?.form?.name || 'Anket Eklenmedi'}</span>
                    </li>

                    <li>
                        Katılımcı Türü:{' '}
                        <span>
                            {currentEvent?.participantTypeOfEvents?.map((item, id) => {
                                return (
                                    <Tag className="m-1" color="orange" key={id}>
                                        {participantGroupTypes?.[item.userType]?.label}
                                    </Tag>
                                );
                            })}
                        </span>
                    </li>

                    <li>
                        Katılımcı Grubu:{' '}
                        <span>
                            {currentEvent?.participantGroups?.map((item, id) => {
                                return (
                                    <Tag className="m-1" color="blue" key={id}>
                                        {item?.participantGroup?.name}
                                    </Tag>
                                );
                            })}
                        </span>
                    </li>

                    <li>
                        Başlangıç Tarihi ve Saati: <span>{dayjs(currentEvent?.startDate)?.format(dateTimeFormat)}</span>
                    </li>

                    <li>
                        Bitiş Tarihi ve Saati: <span>{dayjs(currentEvent?.endDate)?.format(dateTimeFormat)}</span>
                    </li>

                    <li>
                        Lokasyon: <span>{eventLocations.find((i) => i.id === currentEvent?.locationType)?.value}</span>
                    </li>

                    {currentEvent?.locationType === 1 && (
                        <li>
                            Adres Bilgisi: <span>{currentEvent?.physicalAddress}</span>
                        </li>
                    )}

                    <li>
                        Anahtar Kelimeler:{' '}
                        <span>
                            {currentEvent?.keyWords?.split(',').map((item, id) => {
                                return (
                                    <Tag className="m-1" color="cyan" key={id}>
                                        {item}
                                    </Tag>
                                );
                            })}
                        </span>
                    </li>

                    {currentEvent?.declarations?.[0]?.declarationTypes?.length > 0 && (
                        <li>
                            Bildirimler:{' '}
                            <span>
                                {declarationType
                                    ?.filter((i) =>
                                        currentEvent?.declarations?.[0]?.declarationTypes?.includes(i.value),
                                    )
                                    .map((item) => item.label + ', ')}
                            </span>
                        </li>
                    )}
                    {currentEvent?.declarations?.map((item) => (
                        <li key={item.day}>Etkinlikten {item?.day} gün önce bildirim gönder</li>
                    ))}
                </ul>
            </div>
        </CustomCollapseCard>
    );
};

export default EventShow;
