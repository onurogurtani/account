import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../../hooks/useLocationQuery';
import { getByFilterPagedAdminUsers, setIsFilter, setSorterObject } from '../../../../store/slice/adminUserSlice';

const useGetAdminUsers = (setIsUserFilter) => {
  let query = useLocationQuery();
  const dispatch = useDispatch();
  const { adminUsers, filterObject, isFilter } = useSelector((state) => state?.adminUsers);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsUserFilter(true);
      !adminUsers.length && loadAdminUsers(filterObject);
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
};

export default useGetAdminUsers;
