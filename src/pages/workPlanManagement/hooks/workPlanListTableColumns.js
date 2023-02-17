import { Tag } from 'antd';
import { CustomButton, DeleteButton } from '../../../components';
import { deleteUser, setUserStatus } from '../../../store/slice/userListSlice';

const workPlanListTableColumns = () => {

  const columns = [
    {
      title: 'Çalışma Planı Adı',
      dataIndex: 'userType',
      key: 'userType',
      render: (text, record) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Tag color={text ? 'green' : 'red'} key={1}>
            {text ? 'Aktif' : 'Pasif'}
          </Tag>
        );
      },
    },
    {
      title: 'Sınıf Seviyesi',
      dataIndex: 'citizenId',
      key: 'citizenId',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Ders Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Konu',
      dataIndex: 'surName',
      key: 'surName',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Kazanım',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Eğitim Öğretim Yılı',
      dataIndex: 'isPackages',
      key: 'isPackages',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Kullanım Durumu',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Tag color={text ? 'green' : 'orange'} key={1}>
            {text ? 'Kullanımda' : 'Taslak'}
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
          <div className='action-btns'>
            <CustomButton className='btn detail-btn'>
              DÜZENLE
            </CustomButton>
            <DeleteButton id={record?.id} deleteAction={deleteUser} />
            <CustomButton className='btn copy-btn'>
              KOPYALA
            </CustomButton>
          </div>
        );
      },
    },
  ];
  return columns;
};
export default workPlanListTableColumns;
