import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../hooks/useLocationQuery';
import { getByFilterPagedWorkPlans } from '../../../store/slice/workPlanSlice';

const useGetWorkPlans = (setIsWorkPlansFilter) => {
  let query = useLocationQuery();
  const dispatch = useDispatch();
  const { workPlanList, filterObject, isFilter } = useSelector((state) => state?.workPlan);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsWorkPlansFilter(true);
      !workPlanList.length && loadWorkPlans(filterObject);
    } else {
      loadWorkPlans();
    }
  }, []);

  const loadWorkPlans = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedWorkPlans(data));
    },
    [dispatch],
  );
};

export default useGetWorkPlans;
