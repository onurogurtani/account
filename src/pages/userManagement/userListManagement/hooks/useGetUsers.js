import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../../hooks/useLocationQuery';
import { getByFilterPagedUsers, setIsFilter, setSorterObject } from '../../../../store/slice/userListSlice';
import { getByFilterPagedWorkPlans } from '../../../../store/slice/workPlanSlice';

const useGetUsers = (setIsUserFilter) => {
  let query = useLocationQuery();
  const dispatch = useDispatch();
  const { usersList, filterObject, isFilter } = useSelector((state) => state?.userList);

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
      await dispatch(getByFilterPagedWorkPlans());
    },
    [dispatch],
  );
};

export default useGetUsers;
