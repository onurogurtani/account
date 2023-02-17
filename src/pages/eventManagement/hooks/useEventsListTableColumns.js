import { RightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { participantGroupTypes } from '../../../constants/settings/participantGroups';
import { dateTimeFormat } from '../../../utils/keys';

const useEventsListTableColumns = () => {
  const { sorterObject } = useSelector((state) => state?.events);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'id' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Etkinlik Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return (
          <div>
            {record.isActive ? (
              <Tag color="green" key={1}>
                Aktif
              </Tag>
            ) : (
              <Tag color="red" key={2}>
                Pasif
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'description' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Etkinlik Türü',
      dataIndex: 'eventTypeOfEvents',
      key: 'eventTypeOfEvents',
      render: (_, record) => (
        <>
          {record.eventTypeOfEvents?.map((item, id) => {
            return (
              <Tag className="m-1" color="red" key={id}>
                {item.eventType.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Anahtar Kelime',
      dataIndex: 'keyWords',
      key: 'keyWords',
      render: (text, record) => (
        <>
          {text?.split(',').map((item, id) => {
            return (
              <Tag className="m-1" color="cyan" key={id}>
                {item}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Başlangıç Tarihi ve Saati',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'startDate' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{dayjs(text)?.format(dateTimeFormat)}</div>;
      },
    },
    {
      title: 'Bitiş Tarihi ve Saati',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'endDate' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{dayjs(text)?.format(dateTimeFormat)}</div>;
      },
    },
    {
      title: 'Katılıımcı Türü',
      dataIndex: 'participantTypeOfEvents',
      key: 'participantTypeOfEvents',
      render: (_, record) => (
        <>
          {record.participantTypeOfEvents?.map((item, id) => {
            return (
              <Tag className="m-1" color="orange" key={id}>
                {participantGroupTypes[item.participantType - 1].value}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Katılıımcı Grubu',
      dataIndex: 'participantGroups',
      key: 'participantGroups',
      render: (_, record) => (
        <>
          {record.participantGroups?.map((item, id) => {
            return (
              <Tag className="m-1" color="blue" key={id}>
                {item.participantGroup.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Yayınlanma Durumu',
      dataIndex: 'isPublised',
      width: 20,
      key: 'isPublised',
      render: (text, record) => {
        return (
          <div>
            {record.isDraft ? (
              <Tag color="yellow" key={2}>
                Taslak
              </Tag>
            ) : record.isPublised ? (
              <Tag color="green" key={1}>
                Yayınlandı
              </Tag>
            ) : (
              <Tag color="red" key={2}>
                Yayından Kaldırıldı
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      render: (text, record) => {
        return <RightOutlined style={{ fontSize: '25px' }} />;
      },
    },
  ];
  return columns;
};
export default useEventsListTableColumns;
