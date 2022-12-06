import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountys } from '../store/slice/citysCountysSlice';
import { turkishToLower } from '../utils/utils';
import CustomSelect, { Option } from './CustomSelect';

const CountySelector = ({ onChange, cityId }) => {
  const dispatch = useDispatch();
  const { countys } = useSelector((state) => state?.citysCountys);

  useEffect(() => {
    if (!countys.length) {
      loadCountys();
    }
  }, []);

  const loadCountys = useCallback(async () => {
    dispatch(getCountys());
  }, [dispatch]);

  return (
    <CustomSelect
      placeholder="Seçiniz"
      optionFilterProp="children"
      showSearch
      allowClear
      filterOption={(input, option) =>
        turkishToLower(option.children).includes(turkishToLower(input))
      }
      onChange={onChange}
    >
      {countys
        ?.filter((item) => item?.cityId === cityId)
        .map((item) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
    </CustomSelect>
  );
};

export default CountySelector;
