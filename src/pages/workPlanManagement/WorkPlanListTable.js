import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTable } from '../../components';
import useOnchangeTable from '../../hooks/useOnchangeTable';
import usePaginationProps from '../../hooks/usePaginationProps';
import { getByFilterPagedUsers } from '../../store/slice/userListSlice';
import workPlanListTableColumns from './hooks/workPlanListTableColumns';

const WorkPlanListTable = () => {
  const columns = workPlanListTableColumns();

  const { usersList, tableProperty, filterObject } = useSelector((state) => state?.userList);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedUsers });

  return (
    <CustomTable
      dataSource={usersList}
      onChange={onChangeTable}
      columns={columns}
      pagination={paginationProps}
      rowKey={(record) => `work-plan-list-${record?.id}`}
      scroll={{ x: false }}
    />
  );
};

export default WorkPlanListTable;
