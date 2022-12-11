import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { CustomButton, DeleteButton, SetStatusButton } from '../../../../components';
import { deleteUser, setUserStatus } from '../../../../store/slice/userListSlice';
import { maskedPhone } from '../../../../utils/utils';
import BehalfOfLogin from '../BehalfOfLogin';

const useUserListTableColumns = () => {
  const history = useHistory();

  const editUser = (id) => history.push({ pathname: `/user-management/user-list-management/edit/${id}` });

  const columns = [
    {
      title: 'Kullanıcı Türü',
      dataIndex: 'userTypeId',
      key: 'userTypeId',
      // sorter: true,
      // sortOrder: sorterObject?.columnKey === 'id' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'TC',
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
      title: 'Paket Satın Alma Durumu',
      dataIndex: 'isPackages',
      key: 'isPackages',
      // sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Yerine Giriş',
      dataIndex: 'viewMyData',
      key: 'viewMyData',
      // sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return text && <BehalfOfLogin id={record?.id} />;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      // sorter: true,
      // sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return (
          <Tag color={text ? 'green' : 'red'} key={1}>
            {text ? 'Aktif' : 'Pasif'}
          </Tag>
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
            <SetStatusButton record={record} statusAction={setUserStatus} />
            <CustomButton className="btn detail-btn" onClick={() => editUser(record?.id)}>
              DÜZENLE
            </CustomButton>
            <DeleteButton id={record?.id} deleteAction={deleteUser} />
          </div>
        );
      },
    },
  ];
  return columns;
};
export default useUserListTableColumns;
