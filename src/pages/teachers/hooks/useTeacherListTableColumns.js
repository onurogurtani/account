import { Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { CustomButton, DeleteButton, SetStatusButton, Text } from '../../../components';
// import { deleteTeacher, setTeacherStatus } from '../../../store/slice/teacherSlice';

const useTeacherListTableColumns = (sorterObject) => {
  const history = useHistory();

  const editTeacher = (id) => history.push({ pathname: `/teachers/edit/${id}` });

  const columns = [
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a?.name.localeCompare(b?.name, 'tr', { numeric: true }),
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Soyad',
      dataIndex: 'surName',
      key: 'surName',
      sorter: {
        compare: (a, b) => a?.surName.localeCompare(b?.surName, 'tr', { numeric: true }),
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'surName' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'E-Posta',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => a?.email.localeCompare(b?.email, 'tr', { numeric: true }),
        multiple: 3,
      },
      sortOrder: sorterObject?.columnKey === 'email' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    // TODO: 'Bağlı Olduğu Okul' ve  'Sınıf / Şube' eklenecek
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return (
          <Text type={text ? "success" : "danger"} key={1} strong>
            {text ? 'Aktif' : 'Pasif'}
          </Text>
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
            <Space>
              <SetStatusButton record={record} statusAction={function setTeacherStatus(){}} />
              <CustomButton className="btn detail-btn" onClick={() => editTeacher(record?.id)}>
                DÜZENLE
              </CustomButton>
              <DeleteButton id={record?.id} deleteAction={function deleteTeacher(){}} />
            </Space>
          </div>
        );
      },
    },
  ];
  return columns;
};
export default useTeacherListTableColumns;
