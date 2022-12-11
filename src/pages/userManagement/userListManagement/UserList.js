import React, { useCallback, useEffect, useState } from 'react';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../../components';
import UserFilter from './UserFilter';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/table.scss';
import '../../../styles/userManagement/userList.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../hooks/useLocationQuery';
import { getByFilterPagedUsers, setIsFilter, setSorterObject } from '../../../store/slice/userListSlice';
import UserListTable from './UserListTable';

const UserList = () => {
  const history = useHistory();
  let query = useLocationQuery();
  const dispatch = useDispatch();
  const [isUserFilter, setIsUserFilter] = useState(false);
  const { usersList, filterObject, isFilter } = useSelector((state) => state?.userList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsUserFilter(true);
      !usersList.length && loadUsers(filterObject);
    } else {
      dispatch(setSorterObject({}));
      dispatch(setIsFilter(false));
      loadUsers();
    }
  }, []);

  const loadUsers = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedUsers(data));
    },
    [dispatch],
  );

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
