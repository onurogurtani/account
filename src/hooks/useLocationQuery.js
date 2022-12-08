import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useLocationQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
export default useLocationQuery;
