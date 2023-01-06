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
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';
import React, { useCallback, useEffect, useState } from 'react';
import '../../../styles/draftOrder/draftList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsList, deleteGroup, getByFilterPagedGroups } from '../../../store/slice/groupsSlice';
import RoleFormModal from './RoleFormModal';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import RoleFilter from './RoleFilter';
import usePaginationProps from '../../../hooks/usePaginationProps';
import useOnchangeTable from '../../../hooks/useOnchangeTable';
import useGetGroups from './hooks/useGetGroups';

const RoleList = () => {
  const dispatch = useDispatch();

  const { groupsList, filterObject, tableProperty } = useSelector((state) => state?.groups);
  useGetGroups((data) => setIsGroupFilter(data));

  const [roleFormModalVisible, setRoleFormModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(false);
  const [isGroupFilter, setIsGroupFilter] = useState(false);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: getByFilterPagedGroups });


  const addFormModal = () => {
    setSelectedRole(false);
    setRoleFormModalVisible(true);
  };

  const handleDeleteRole = async (record) => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Kaydı silmek istediğinizden emin misiniz?',
      okText: <Text t="delete" />,
      cancelText: 'Vazgeç',
      onOk: async () => {
        let data = {
          id: record.id,
        };
        const action = await dispatch(deleteGroup(data));
        if (deleteGroup.fulfilled.match(action)) {
          successDialog({
            title: <Text t="successfullySent" />,
            message: action?.payload?.message,
            onOk: () => {
              getByFilterPagedGroups();
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

  const editFormModal = (record) => {
    setSelectedRole(record);
    setRoleFormModalVisible(true);
  };

  const columns = [
    {
      title: 'ROL ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 35,
    },
    {
      title: 'ROL ADI',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 400,
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
            <CustomButton className="detail-btn" onClick={() => editFormModal(record)}>
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

  return (
    <CustomCollapseCard className="draft-list-card" cardTitle={<Text t="Rol Listesi" />}>
      <div className="number-registered-drafts">
        <CustomButton className="add-btn" onClick={addFormModal}>
          YENİ ROL EKLE
        </CustomButton>
        <div className="drafts-count-title">
          <CustomImage src={cardsRegistered} />
          Kayıtlı Rol Sayısı: <span>{groupsList?.length}</span>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsGroupFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
      </div>
      {isGroupFilter && <RoleFilter />}
      <CustomTable
        dataSource={groupsList}
        onChange={onChangeTable}
        pagination={paginationProps}
        columns={columns}
        rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
        scroll={{ x: false }}
      />
      <RoleFormModal
        modalVisible={roleFormModalVisible}
        handleModalVisible={setRoleFormModalVisible}
        selectedRole={selectedRole}
      />
    </CustomCollapseCard>
  );
};

export default RoleList;
