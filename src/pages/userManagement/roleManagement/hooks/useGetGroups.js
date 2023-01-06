import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../../hooks/useLocationQuery';
import { getByFilterPagedGroups, setIsFilter } from '../../../../store/slice/groupsSlice';

const useGetGroups = (setIsGroupFilter) => {
    let query = useLocationQuery();
    const dispatch = useDispatch();
    const { groupsList, filterObject, isFilter } = useSelector((state) => state?.groups);

    useEffect(() => {
        if (query.get('filter')) {
            isFilter && setIsGroupFilter(true);
            !groupsList.length && loadGroups(filterObject);
        } else {
            dispatch(setIsFilter(false));
            loadGroups();
        }
    }, []);

    const loadGroups = useCallback(
        async (data) => {
            await dispatch(getByFilterPagedGroups(data));
        },
        [dispatch],
    );
};

export default useGetGroups;
