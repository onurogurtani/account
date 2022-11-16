import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomPageHeader,
  CustomTable,
} from '../../components';
import iconFilter from '../../assets/icons/icon-filter.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getByFilterPagedEvents,
  setIsFilter,
  setSorterObject,
} from '../../store/slice/eventsSlice';
import '../../styles/table.scss';
import '../../styles/eventsManagement/listEvent.scss';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { RightOutlined } from '@ant-design/icons';
import EventFilter from './EventFilter';
import { dateTimeFormat } from '../../utils/keys';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EventList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let query = useQuery();

  const { events, tableProperty, sorterObject, filterObject, isFilter } = useSelector(
    (state) => state?.events,
  );
  const [isEventFilter, setIsEventFilter] = useState(false);
  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsEventFilter(true);
      loadEvents(filterObject);
    } else {
      dispatch(setSorterObject({}));
      dispatch(setIsFilter(false));
      loadEvents();
    }
  }, []);

  const loadEvents = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedEvents(data));
    },
    [dispatch],
  );

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    position: 'bottomRight',
    total: tableProperty?.totalCount,
    current: tableProperty?.currentPage,
    pageSize: tableProperty?.pageSize,
  };

  const sortFields = {
    id: { ascend: 'IdASC', descend: 'IdDESC' },
    name: { ascend: 'NameASC', descend: 'NameDESC' },
    isActive: { ascend: 'IsActiveASC', descend: 'IsActiveDESC' },
    description: { ascend: 'DescriptionASC', descend: 'DescriptionDESC' },
    startDate: { ascend: 'StartASC', descend: 'StartDESC' },
    endDate: { ascend: 'EndASC', descend: 'EndDESC' },
  };

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    if (extra?.action === 'sort') {
      if (sorter?.order) {
        await dispatch(setSorterObject({ columnKey: sorter.columnKey, order: sorter.order }));
      } else {
        await dispatch(setSorterObject({}));
      }
      data.OrderBy = sortFields[sorter.columnKey][sorter.order];
      data.PageNumber = 1;
    }

    await dispatch(getByFilterPagedEvents(data));
  };

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
  const addEvent = () => {
    history.push('/event-management/add');
  };

  const showEvent = (record) => {
    history.push({
      pathname: `/event-management/show/${record.id}`,
    });
  };
  return (
    <CustomPageHeader
      title="Etkinlikler"
      showBreadCrumb
      showHelpButton
      routes={['Etkinlik Yönetimi']}
    >
      <CustomCollapseCard className="video-list" cardTitle="Etkinlikler">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addEvent}>
            YENİ ETKİNLİK EKLE
          </CustomButton>
          <CustomButton
            data-testid="search"
            className="search-btn"
            onClick={() => setIsEventFilter((prev) => !prev)}
          >
            <CustomImage src={iconFilter} />
          </CustomButton>
        </div>
        {isEventFilter && <EventFilter />}
        <CustomTable
          dataSource={events}
          onChange={onChangeTable}
          className="event-table-list"
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => showEvent(record),
            };
          }}
          pagination={paginationProps}
          rowKey={(record) => `event-list-${record?.id}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default EventList;
