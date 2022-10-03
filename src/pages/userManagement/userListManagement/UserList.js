import React, { useCallback, useEffect, useState } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomTable,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList, deleteUserList, updateUserList } from '../../../store/slice/userListSlice';
import '../../../styles/draftOrder/draftList.scss';
import { useHistory } from 'react-router-dom';
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';

const UserList = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { usersList, tableProperty } = useSelector((state) => state?.userList);

  useEffect(() => {
    (async () => {
      await loadUserList();
    })();
  }, []);

  const loadUserList = useCallback(async () => {
    dispatch(getUserList({ pageNumber: 1, pageSize: 10 }));
  }, [dispatch]);

  const editUser = (record) => {
    console.log(record);
    history.push({
      pathname: '/user-management/edit-user',
      state: { data: record },
    });
  };

  const addUser = () => {
    history.push('/user-management/add-user');
  };

  const handleStatus = useCallback(
    async (status, record) => {
      const data = {
        entity: {
          id: record?.id,
          status,
        },
      };
      const action = await dispatch(updateUserList(data));
      if (updateUserList.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            loadUserList();
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    },
    [dispatch],
  );

  const handleDeleteRole = async (record) => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Kaydı silmek istediğinizden emin misiniz?',
      okText: <Text t="delete" />,
      cancelText: 'Vazgeç',
      onOk: async () => {
        let id = record.id;
        const action = await dispatch(deleteUserList({ id }));
        if (deleteUserList.fulfilled.match(action)) {
          successDialog({
            title: <Text t="successfullySent" />,
            message: action?.payload?.message,
            onOk: () => {
              loadUserList();
            },
          });
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };

  const columns = [
    // {
    //   title: 'AD',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    // {
    //   title: 'SOYAD',
    //   dataIndex: 'surName',
    //   key: 'surName',
    // },
    {
      title: 'AD SOYAD',
      dataIndex: 'nameSurname',
      key: 'nameSurname',
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'KULLANICI ADI',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'TC KİMLİK NO',
      dataIndex: 'citizenId',
      key: 'citizenId',
    },
    {
      title: 'CEP TELEFONU',
      dataIndex: 'mobilePhones',
      key: 'mobilePhones',
    },
    /*
    {
      title: 'E-POSTA',
      dataIndex: 'email',
      key: 'email',
    },
    */
    {
      title: 'DURUM',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <div>
            {record.status ? (
              <span className="status-text-active ">Aktif</span>
            ) : (
              <span className="status-text-passive ">Pasif</span>
            )}
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
            {record.status ? (
              <CustomButton onClick={() => handleStatus(false, record)} className="passive-btn">
                PASİF ET
              </CustomButton>
            ) : (
              <CustomButton onClick={() => handleStatus(true, record)} className="active-btn">
                AKTİF ET
              </CustomButton>
            )}
            <CustomButton className="detail-btn" onClick={() => editUser(record)}>
              DÜZENLE
            </CustomButton>
            <CustomButton className="delete-btn" onClick={() => handleDeleteRole(record)}>
              SİL
            </CustomButton>
          </div>
        );
      },
    },
  ];
  const handleTableChange = async ({ pageSize, current }, filters, sorter) => {
    await dispatch(getUserList({ pageNumber: current, pageSize }));
  };
  return (
    <CustomCollapseCard className="draft-list-card" cardTitle={<Text t="Kullanıcı Listesi" />}>
      {
        <div className="number-registered-drafts">
          <CustomButton className="add-btn" onClick={addUser}>
            YENİ KULLANICI EKLE
          </CustomButton>
          <div className="drafts-count-title">
            <CustomImage src={cardsRegistered} />
            Kayıtlı Kullanıcı Sayısı: <span>{usersList?.length}</span>
          </div>
        </div>
      }

      <CustomTable
        pagination={{
          current: tableProperty?.currentPage,
          pageSize: tableProperty?.pageSize,
          total: tableProperty?.totalCount,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        dataSource={usersList}
        columns={columns}
        rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
        scroll={{ x: false }}
      />
    </CustomCollapseCard>
  );
};

export default UserList;
