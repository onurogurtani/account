import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { getByFilterPagedUsers } from '../../../store/slice/userListSlice';
import useUserListTableColumns from './hooks/useUserListTableColumns';

const UserListTable = () => {
  const dispatch = useDispatch();
  const columns = useUserListTableColumns();

  const { usersList, tableProperty, filterObject } = useSelector((state) => state?.userList);

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    // if (extra?.action === 'sort') {
    //   if (sorter?.order) {
    //     await dispatch(setSorterObject({ columnKey: sorter.columnKey, order: sorter.order }));
    //   } else {
    //     await dispatch(setSorterObject({}));
    //   }
    //   data.OrderBy = sortFields[sorter.columnKey][sorter.order];
    //   data.PageNumber = 1;
    // }

    await dispatch(getByFilterPagedUsers(data));
  };
  const paginationProps = usePaginationProps(tableProperty);

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
