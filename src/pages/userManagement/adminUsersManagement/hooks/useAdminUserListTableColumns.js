import { Tag } from 'antd';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { CustomButton, DeleteButton, SetStatusButton } from '../../../../components';
import { adminTypes } from '../../../../constants/adminUsers';
import { deleteAdminUser, setAdminUserStatus } from '../../../../store/slice/adminUserSlice';
import { dateTimeFormat } from '../../../../utils/keys';
import { maskedPhone } from '../../../../utils/utils';

const useAdminUserListTableColumns = () => {
    const history = useHistory();

    const editAdminUser = (id) => history.push({ pathname: `/admin-users-management/edit/${id}` });

    const columns = [
        {
            title: 'T.C. Kimlik No',
            dataIndex: 'citizenId',
            key: 'citizenId',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Ad',
            dataIndex: 'name',
            key: 'name',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Soyad',
            dataIndex: 'surName',
            key: 'surName',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'userName',
            key: 'userName',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'E-Posta',
            dataIndex: 'email',
            key: 'email',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Cep Telefonu',
            dataIndex: 'mobilePhones',
            key: 'mobilePhones',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{maskedPhone(text)}</div>;
            },
        },
        {
            title: 'Admin Tipi',
            dataIndex: 'userType',
            key: 'userType',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{adminTypes[text]?.label}</div>;
            },
        },
        {
            title: 'Rol',
            dataIndex: 'roles',
            key: 'roles',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
            render: (text, record) => {
                return (
                    <div>
                        {text?.map((item) => (
                            <Tag color="green" key={item?.id}>
                                {item?.name}
                            </Tag>
                        ))}
                    </div>
                );
            },
        },

        {
            title: 'Son Giriş Tarihi',
            dataIndex: 'lastLoginDate',
            key: 'lastLoginDate',
            // sorter: true,
            // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
            render: (text, record) => {
                return <div>{text && dayjs(text)?.format(dateTimeFormat)}</div>;
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
                        <SetStatusButton record={record} statusAction={setAdminUserStatus} />
                        <CustomButton className="btn detail-btn" onClick={() => editAdminUser(record?.id)}>
                            DÜZENLE
                        </CustomButton>
                        <DeleteButton id={record?.id} deleteAction={deleteAdminUser} />
                    </div>
                );
            },
        },
    ];
    return columns;
};
export default useAdminUserListTableColumns;
