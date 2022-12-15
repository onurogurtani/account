import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import useOnchangeTable from '../../../hooks/useOnchangeTable';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { getByFilterPagedAdminUsers } from '../../../store/slice/adminUserSlice';
import useAdminUserListTableColumns from './hooks/useAdminUserListTableColumns';

const AdminUserListTable = () => {
  const columns = useAdminUserListTableColumns();

  const { adminUsers, tableProperty, sorterObject, filterObject } = useSelector((state) => state?.adminUsers);
  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedAdminUsers });

  return (
    <CustomTable
      dataSource={adminUsers}
      onChange={onChangeTable}
      // className="admin-user-table-list"
      columns={columns}
      pagination={paginationProps}
      rowKey={(record) => `admin-user-list-${record?.id}`}
      scroll={{ x: false }}
    />
  );
};

export default AdminUserListTable;
