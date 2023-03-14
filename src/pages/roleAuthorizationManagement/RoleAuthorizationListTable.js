import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../components';
import usePaginationProps from '../../hooks/usePaginationProps';
import useRoleAuthorizationListTableColumns from './hooks/useRoleAuthorizationListTableColumns';
import '../../styles/table.scss';
import { getByFilterPagedRoles } from '../../store/slice/roleAuthorizationSlice';
import { capitalizeFirstLetter } from '../../utils/utils';

const RoleAuthorizationListTable = () => {
    const dispatch = useDispatch();
    const { roles, tableProperty, roleAuthorizationDetailSearch } = useSelector((state) => state.roleAuthorization);

    const columns = useRoleAuthorizationListTableColumns();
    const paginationProps = usePaginationProps(tableProperty);

    useEffect(() => {
        dispatch(getByFilterPagedRoles());
    }, []);

    const onChangeTable = async (pagination, filters, sorter, extra) => {
        dispatch(
            getByFilterPagedRoles({
                ...roleAuthorizationDetailSearch,
                pageSize: pagination?.pageSize,
                pageNumber: pagination?.current,
                orderBy: sorter?.order
                    ? capitalizeFirstLetter(sorter?.field) + (sorter?.order === 'ascend' ? 'ASC' : 'DESC')
                    : 'UpdateTimeDESC',
            }),
        );
    };

    return (
        <CustomTable
            dataSource={roles}
            onChange={onChangeTable}
            // className="role-authorization-table-list"
            columns={columns}
            pagination={paginationProps}
            rowKey={(record) => `role-authorization-list-${record?.id}`}
            scroll={{ x: false }}
        />
    );
};

export default RoleAuthorizationListTable;
