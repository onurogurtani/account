import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import useOnchangeTable from '../../../hooks/useOnchangeTable';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { getByFilterPagedUsers } from '../../../store/slice/userListSlice';
import useUserListTableColumns from './hooks/useUserListTableColumns';

const UserListTable = () => {
  const columns = useUserListTableColumns();

  const { usersList, tableProperty, filterObject } = useSelector((state) => state?.userList);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedUsers });

  return (
    <CustomTable
      dataSource={usersList}
      onChange={onChangeTable}
      // className="user-table-list"
      columns={columns}
      pagination={paginationProps}
      rowKey={(record) => `user-list-${record?.id}`}
      scroll={{ x: false }}
    />
  );
};

export default UserListTable;
