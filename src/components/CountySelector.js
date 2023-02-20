import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountys } from '../store/slice/citysCountysSlice';
import { turkishToLower } from '../utils/utils';
import { CustomFormItem } from './CustomForm';
import CustomSelect, { Option } from './CustomSelect';

const CountySelector = ({ onChange, cityId, name, label, style, rules }) => {
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
    <CustomFormItem name={name} label={label} style={style} rules={rules}>
      <CustomSelect
        placeholder="Seçiniz"
        optionFilterProp="children"
        showSearch
        allowClear
        filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
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
    </CustomFormItem>
  );
};

export default CountySelector;
