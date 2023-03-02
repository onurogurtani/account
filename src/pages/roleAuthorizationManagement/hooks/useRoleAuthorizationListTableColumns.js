import { Tag } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../../../components';
import RoleAuthorizationCopy from '../RoleAuthorizationCopy';

const useRoleAuthorizationListTableColumns = () => {
    const history = useHistory();

    const columns = [
        {
            title: 'Rol Adı',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Durum',
            dataIndex: 'recordStatus',
            key: 'recordStatus',
            width: 100,
            render: (text, record) => {
                return (
                    <div>
                        {
                            <Tag color={record.recordStatus ? 'green' : 'red'}>
                                {record.recordStatus ? 'Aktif' : 'Pasif'}
                            </Tag>
                        }
                    </div>
                );
            },
        },
        {
            title: 'İŞLEMLER',
            dataIndex: 'draftDeleteAction',
            key: 'draftDeleteAction',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className="action-btns">
                        <CustomButton
                            className="update-btn"
                            onClick={() => {
                                history.push(`/role-authorization-management/edit/${record.id}`);
                            }}
                        >
                            Düzenle
                        </CustomButton>
                        <RoleAuthorizationCopy record={record} />
                    </div>
                );
            },
        },
    ];
    return columns;
};

export default useRoleAuthorizationListTableColumns;
