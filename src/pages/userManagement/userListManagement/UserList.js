import React, { useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import UserFilter from './UserFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import { useHistory } from 'react-router-dom';
import UserListTable from './UserListTable';
import useGetUsers from './hooks/useGetUsers';
import '../../../styles/userManagement/userList.scss';
import '../../../styles/table.scss';

const UserList = () => {
  const history = useHistory();
  useGetUsers((data) => setIsUserFilter(data));

  const [isUserFilter, setIsUserFilter] = useState(false);
  const addUser = () => history.push('/user-management/user-list-management/add');

  return (
    <CustomPageHeader title="Üye Listesi" showBreadCrumb showHelpButton routes={['Üye Yönetimi']}>
      <CustomCollapseCard className="user-list-card" cardTitle="Üye Listesi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addUser}>
            YENİ EKLE
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsUserFilter((prev) => !prev)}>
            <CustomImage src={iconSearchWhite} />
          </CustomButton>
        </div>
        {isUserFilter && <UserFilter />}
        <UserListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default UserList;
