import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomTable } from '../../components';
import useOnchangeTable from '../../hooks/useOnchangeTable';
import usePaginationProps from '../../hooks/usePaginationProps';
import { getByFilterPagedEvents, setSorterObject } from '../../store/slice/eventsSlice';
import useEventsListTableColumns from './hooks/useEventsListTableColumns';

const sortFields = {
  id: { ascend: 'IdASC', descend: 'IdDESC' },
  name: { ascend: 'NameASC', descend: 'NameDESC' },
  isActive: { ascend: 'IsActiveASC', descend: 'IsActiveDESC' },
  description: { ascend: 'DescriptionASC', descend: 'DescriptionDESC' },
  startDate: { ascend: 'StartASC', descend: 'StartDESC' },
  endDate: { ascend: 'EndASC', descend: 'EndDESC' },
};

const EventListTable = () => {
  const history = useHistory();
  const { events, tableProperty, filterObject } = useSelector((state) => state?.events);
  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedEvents, sortFields, setSorterObject });

  const columns = useEventsListTableColumns();

  const showEvent = (record) => {
    history.push({
      pathname: `/event-management/show/${record.id}`,
    });
  };

  return (
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
  );
};

export default EventListTable;
