import { useDispatch } from 'react-redux';

const useOnchangeTable = (props) => {
  const { filterObject, action, sortFields, setSorterObject, callback } = props;

  const dispatch = useDispatch();

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    if (extra?.action === 'sort') {
      if (sorter?.order) {
        await dispatch(setSorterObject({ columnKey: sorter.columnKey, order: sorter.order }));
      } else {
        await dispatch(setSorterObject({}));
      }
      data.OrderBy = sortFields[sorter.columnKey][sorter.order];
      data.PageNumber = 1;
    }

    const res = await dispatch(action(data));

    callback && callback(res);
  };
  return onChangeTable;
};

export default useOnchangeTable;
