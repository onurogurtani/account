import { Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomCollapseCard } from '../../../components';
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
            Anket Kategorisi: <span>{currentEvent?.subCategory?.name || 'Anket Eklenmedi'}</span>
          </li>

          <li>
            Anket: <span>{currentEvent?.form?.name || 'Anket Eklenmedi'}</span>
          </li>

          <li>
            Katılımcı Gruplar:{' '}
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
            Başlangıç Tarihi ve Saati:{' '}
            <span>{dayjs(currentEvent?.startDate)?.format(dateTimeFormat)}</span>
          </li>

          <li>
            Bitiş Tarihi ve Saati:{' '}
            <span>{dayjs(currentEvent?.endDate)?.format(dateTimeFormat)}</span>
          </li>
        </ul>
      </div>
    </CustomCollapseCard>
  );
};

export default EventShow;
