import { Radio } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomFormItem, CustomRadio, CustomTextArea } from '../../../components';
import { eventLocations } from '../../../constants/events';

const EventLocationSection = () => {
  const location = useLocation();
  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  return (
    <>
      <CustomFormItem
        label="Lokasyon"
        name="locationType"
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <Radio.Group disabled={isDisableAllButDate}>
          {eventLocations.map((item) => (
            <CustomRadio key={item.id} value={item.id}>
              {item.value}
            </CustomRadio>
          ))}
        </Radio.Group>
      </CustomFormItem>

      <CustomFormItem
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.locationType !== curValues.locationType}
      >
        {({ getFieldValue }) =>
          getFieldValue('locationType') === 1 && (
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              label="Adres Bilgisi"
              name="physicalAddress"
            >
              <CustomTextArea />
            </CustomFormItem>
          )
        }
      </CustomFormItem>
    </>
  );
};

export default EventLocationSection;
