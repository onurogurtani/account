import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsList } from '../../../../store/slice/groupsSlice';
import {
  addAnnouncement,
  getByFilterPagedAnnouncements,
} from '../../../../store/slice/announcementSlice';

import '../../../../styles/announcementManagement/addAnnouncementRole.scss';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomTable,
  errorDialog,
  successDialog,
  Text,
} from '../../../../components';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const AddAnnouncementRole = ({ setStep, announcementInfoData }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupsList } = useSelector((state) => state?.groups);

  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    (async () => {
      await loadGroupsList();
    })();
  }, []);

  useEffect(() => {
    setRole(groupsList);
  }, [groupsList]);

  useEffect(() => {
    let difference = getDifference(groupsList, selectedRole);
    setRole(difference);
  }, [selectedRole]);

  const getDifference = (array1, array2) => {
    return array1?.filter((object1) => {
      return !array2?.some((object2) => {
        return object1?.id === object2?.id;
      });
    });
  };
  const loadGroupsList = useCallback(async () => {
    await dispatch(getGroupsList());
  }, [dispatch]);

  const columnsRole = [
    {
      title: 'Seçilen Roller',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 300,
    },
    {
      dataIndex: 'addAnnouncementRoleDeleteAction',
      key: 'addAnnouncementRoleDeleteAction',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="remove-btn" onClick={() => handleDeleteRole(record?.id)}>
              <DoubleLeftOutlined />
              SİL
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const columns = [
    {
      title: 'Seçilebilecek Roller',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 300,
    },
    {
      dataIndex: 'addAnnouncementRoleDeleteAction',
      key: 'addAnnouncementRoleDeleteAction',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="detail-btn" onClick={() => handleAddRole(record?.id)}>
              EKLE
              <DoubleRightOutlined />
            </CustomButton>
          </div>
        );
      },
    },
  ];
  const handleAddRole = (id) => {
    const data = role.filter((r) => r.id === id);
    setSelectedRole([...selectedRole, ...data]);

  };
  const handleDeleteRole = (id) => {
    const data = selectedRole.filter((r) => r.id !== id);
    setSelectedRole(data);
  };

  const handleBackInfo = () => {
    setStep('1');
  };
  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/user-management/announcement-management');
      },
    });
  };
  const onFinish = async () => {
    if (selectedRole.length === 0) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Lütfen en az bir rol seçimi yapınız',
      });
      return;
    }

    announcementInfoData.roles=selectedRole;
    const action = await dispatch(addAnnouncement(announcementInfoData));

    if (addAnnouncement.fulfilled.match(action)) {
      successDialog({
              title: <Text t="success" />,
              message: action.payload?.message,
              onOk: () => {
                history.push('/user-management/announcement-management');
              },
            });
          } else {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            }) 
          };

  };
  return (
    <CustomCollapseCard className="add-announcement-role-card" cardTitle={<Text t="Roller" />}>
      <div className="add-announcement-role-table-box">
        <CustomTable
          pagination={false}
          dataSource={role}
          columns={columns}
          rowKey={(record) => `add-announcement-role-new-order-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
        <CustomTable
          pagination={false}
          dataSource={selectedRole && selectedRole}
          columns={columnsRole}
          rowKey={(record) => `add-announcement-role-new-order-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </div>
      <div className="footer-role mt-4">
        <CustomButton className="cancel-btn" onClick={onCancel}>
          İptal
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="back-btn"
          onClick={handleBackInfo}
        >
          Genel Bilgiler Sayfasına Dön
        </CustomButton>
        <CustomButton type="primary" onClick={onFinish} className="submit-btn">
          Kaydet ve Bitir
        </CustomButton>
      </div>
    </CustomCollapseCard>
  );
};

export default AddAnnouncementRole;
