import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitys } from '../store/slice/citysCountysSlice';
import { turkishToLower } from '../utils/utils';
import { CustomFormItem } from './CustomForm';
import CustomSelect, { Option } from './CustomSelect';

const CitySelector = ({ onChange, name, rules, label, style }) => {
  const dispatch = useDispatch();
  const { citys } = useSelector((state) => state?.citysCountys);

  useEffect(() => {
    if (!citys.length) {
      loadCitys();
    }
  }, []);

  const loadCitys = useCallback(async () => {
    dispatch(getCitys());
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
        {citys.map((item) => {
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

export default CitySelector;
