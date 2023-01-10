import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocationQuery from '../../../hooks/useLocationQuery';
import { getByFilterPagedEvents, setIsFilter, setSorterObject } from '../../../store/slice/eventsSlice';

const useGetEvents = (setIsEventFilter) => {
  let query = useLocationQuery();
  const dispatch = useDispatch();
  const { filterObject, isFilter } = useSelector((state) => state?.events);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setIsEventFilter(true);
      loadEvents(filterObject);
    } else {
      dispatch(setSorterObject({}));
      dispatch(setIsFilter(false));
      loadEvents();
    }
  }, []);

  const loadEvents = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedEvents(data));
    },
    [dispatch],
  );
};

export default useGetEvents;
