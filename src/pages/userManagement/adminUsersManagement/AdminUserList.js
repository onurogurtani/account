import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomPageHeader,
  CustomTable,
  DeleteButton,
  SetStatusButton,
} from '../../../components';
import AdminUserFilter from './AdminUserFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/table.scss';
import '../../../styles/adminUserManagement/adminUserList.scss';
import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { dateTimeFormat } from '../../../utils/keys';
import useLocationQuery from '../../../hooks/useLocationQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAdminUser,
  getByFilterPagedAdminUsers,
  setAdminUserStatus,
  setIsFilter,
  setSorterObject,
} from '../../../store/slice/adminUserSlice';
import { maskedPhone } from '../../../utils/utils';
import usePaginationProps from '../../../hooks/usePaginationProps';

const AdminUserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useLocationQuery();
  const [isUserFilter, setIsUserFilter] = useState(false);
  const { adminUsers, tableProperty, sorterObject, filterObject, isFilter } = useSelector((state) => state?.adminUsers);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsUserFilter(true);
      !Object.keys(adminUsers).length && loadAdminUsers(filterObject);
    } else {
      dispatch(setSorterObject({}));
      dispatch(setIsFilter(false));
      loadAdminUsers();
    }
  }, []);

  const loadAdminUsers = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedAdminUsers(data));
    },
    [dispatch],
  );
  const columns = [
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
      title: 'Rol',
      dataIndex: 'groups',
      key: 'groups',
      // sorter: true,
      // sortOrder: sorterObject?.columnKey === 'isActive' ? sorterObject?.order : null,
      render: (text, record) => {
        return (
          <div>
            {text.map((item) => (
              <Tag color="green" key={item?.id}>
                {item?.groupName}
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

  const paginationProps = usePaginationProps(tableProperty);

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    // if (extra?.action === 'sort') {
    //   if (sorter?.order) {
    //     await dispatch(setSorterObject({ columnKey: sorter.columnKey, order: sorter.order }));
    //   } else {
    //     await dispatch(setSorterObject({}));
    //   }
    //   data.OrderBy = sortFields[sorter.columnKey][sorter.order];
    //   data.PageNumber = 1;
    // }

    await dispatch(getByFilterPagedAdminUsers(data));
  };

  const addAdminUser = () => history.push('/admin-users-management/add');
  const editAdminUser = (id) => history.push({ pathname: `/admin-users-management/edit/${id}` });

  return (
    <CustomPageHeader
      title="Admin Kullanıcı Listesi"
      showBreadCrumb
      showHelpButton
      routes={['Admin Kullanıcı Yönetimi']}
    >
      <CustomCollapseCard className="admin-user-list-card" cardTitle="Admin Kullanıcı Listesi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addAdminUser}>
            YENİ EKLE
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsUserFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
        {isUserFilter && <AdminUserFilter />}
        <CustomTable
          dataSource={adminUsers}
          onChange={onChangeTable}
          // className="admin-user-table-list"
          columns={columns}
          pagination={paginationProps}
          rowKey={(record) => `admin-user-list-${record?.id}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AdminUserList;
