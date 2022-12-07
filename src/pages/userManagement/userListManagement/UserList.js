import React, { useState } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomPageHeader,
  CustomTable,
  Text,
} from '../../../components';
import UserFilter from './UserFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/table.scss';
import '../../../styles/userManagement/userList.scss';
import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';

const UserList = () => {
  const history = useHistory();
  const [isUserFilter, setIsUserFilter] = useState(false);
  const columns = [
    {
      title: 'Kullanıcı Türü',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'id' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'TC',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Soyad',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'E-Posta',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Cep Telefonu',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paket Satın Alma Durumu',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Yerine Giriş',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'name' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: true,
      // sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return (
          <div>
            {record.isActive ? (
              <Tag color="green" key={1}>
                Aktif
              </Tag>
            ) : (
              <Tag color="red" key={2}>
                Pasif
              </Tag>
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
              <CustomButton className="btn passive-btn" onClick={changeStatus}>
                PASİF ET
              </CustomButton>
            ) : (
              <CustomButton className="btn active-btn" onClick={changeStatus}>
                AKTİF ET
              </CustomButton>
            )}
            <CustomButton className="btn detail-btn">DÜZENLE</CustomButton>
            <CustomButton className="btn delete-btn" onClick={onDelete}>
              SİL
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    position: 'bottomRight',
    // total: tableProperty?.totalCount,
    // current: tableProperty?.currentPage,
    // pageSize: tableProperty?.pageSize,
  };
  const addUser = () => history.push('/user-management/user-list-management/add');

  const onDelete = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Seçtiğiniz kaydı silmek istediğinize emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {},
    });
  };

  const changeStatus = (status) => {
    confirmDialog({
      title: <Text t="attention" />,
      message: status
        ? 'Pasifleştirmek  istediğinizden emin misiniz?'
        : 'Aktifleştirmek  istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {},
    });
  };

  return (
    <CustomPageHeader title="Üye Listesi" showBreadCrumb showHelpButton routes={['Üye Yönetimi']}>
      <CustomCollapseCard className="user-list-card" cardTitle="Üye Listesi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addUser}>
            YENİ EKLE
          </CustomButton>
          <CustomButton
            data-testid="search"
            className="search-btn"
            onClick={() => setIsUserFilter((prev) => !prev)}
          >
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
        {isUserFilter && <UserFilter />}
        <CustomTable
          dataSource={[{ name: 'deneme' }]}
          // onChange={onChangeTable}
          className="user-table-list"
          columns={columns}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => showEvent(record),
          //   };
          // }}
          pagination={paginationProps}
          rowKey={(record) => `user-list-${record?.id}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default UserList;
