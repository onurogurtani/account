import { Space, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { CustomButton, DeleteButton, SetStatusButton } from '../../../components';
import { maskedPhone } from '../../../utils/utils';
// import { deleteTeacher, setTeacherStatus } from '../../../store/slice/teacherSlice';

const useTeacherListTableColumns = (sorterObject) => {
  const history = useHistory();

  const editTeacher = (id) => history.push({ pathname: `/teachers/edit/${id}` });

  const columns = [
    {
      title: 'T.C. Kimlik No',
      dataIndex: 'citizenId',
      key: 'citizenId',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Soyad',
      dataIndex: 'surName',
      key: 'surName',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Cep Telefonu',
      dataIndex: 'mobilePhones',
      key: 'mobilePhones',
      render: (text, record) => {
        return <div>{text ? maskedPhone(text) : ""}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Tag color={text ? 'green' : 'red'} key={1} strong>
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
