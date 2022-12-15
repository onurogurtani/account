import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import AdminUserFilter from './AdminUserFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/table.scss';
import '../../../styles/adminUserManagement/adminUserList.scss';
import { useHistory } from 'react-router-dom';
import AdminUserListTable from './AdminUserListTable';
import useGetAdminUsers from './hooks/useGetAdminUsers';

const AdminUserList = () => {
  const history = useHistory();
  useGetAdminUsers((data) => setIsUserFilter(data));

  const [isUserFilter, setIsUserFilter] = useState(false);

  const addAdminUser = () => history.push('/admin-users-management/add');

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
        <AdminUserListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AdminUserList;
