import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import { getEventTypes } from '../../../store/slice/eventTypeSlice';
import { turkishToLower } from '../../../utils/utils';

const EventTypeSection = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eventTypes } = useSelector((state) => state?.eventType);

  useEffect(() => {
    dispatch(getEventTypes({ PageSize: 999999, IsActive: true }));
  }, []);

  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  return (
    <CustomFormItem
      rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      label="Etkinlik Türü"
      name="eventTypeOfEvents"
    >
      <CustomSelect
        filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
        showArrow
        mode="multiple"
        disabled={isDisableAllButDate}
        placeholder="Lütfen Etkinlik Türü Seçiniz"
      >
        {eventTypes?.map((item) => {
          return (
            <Option key={item?.no} value={item?.no}>
              {item?.name}
            </Option>
          );
        })}
      </CustomSelect>
    </CustomFormItem>
  );
};

export default EventTypeSection;
