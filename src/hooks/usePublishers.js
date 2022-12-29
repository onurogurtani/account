import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublisherList, getBookList } from '../store/slice//questionFileSlice';

const usePublishers = () => {
  const dispatch = useDispatch();
  const { publisherList } = useSelector((state) => state?.questionManagement);
  const [publisherId, setPublisherId] = useState();

  useEffect(() => {
    if (!publisherList.length) loadPublishers();
  }, []);

  useEffect(() => {
    if (!publisherId) return false;
    loadBooks([
      {
        field: 'publisherId',
        value: publisherId,
        compareType: 0,
      },
    ]);
  }, [publisherId]);

  const loadPublishers = useCallback(async () => {
    await dispatch(getPublisherList());
  }, [dispatch]);

  const loadBooks = useCallback(
    async (data) => {
      dispatch(getBookList(data));
    },
    [dispatch],
  );

  return {
    publisherId,
    setPublisherId,
  };
};

export default usePublishers;
