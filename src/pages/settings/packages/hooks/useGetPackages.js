import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../../hooks/useLocationQuery';
import { getByFilterPagedPackages, setIsFilter } from '../../../../store/slice/packageSlice';

const useGetPackages = (setIsPackageFilter) => {
    let query = useLocationQuery();
    const dispatch = useDispatch();
    const { packages, filterObject, isFilter } = useSelector((state) => state?.packages);

    useEffect(() => {
        if (query.get('filter')) {
            isFilter && setIsPackageFilter(true);
            !packages.length && loadPackages(filterObject);
        } else {
            dispatch(setIsFilter(false));
            loadPackages();
        }
    }, []);

    const loadPackages = useCallback(
        async (data) => {
            await dispatch(getByFilterPagedPackages(data));
        },
        [dispatch],
    );
};

export default useGetPackages;
