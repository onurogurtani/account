import dayjs from 'dayjs';
import React from 'react';
import { CustomDatePicker, CustomFormItem } from '../../../components';
import { dateValidator } from '../../../utils/formRule';
import { dateTimeFormat } from '../../../utils/keys';

const DateSection = ({ form }) => {
  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
  };

  const endDateCannotBeSelectedBeforeTheStartDate = async (field, value) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    try {
      if (!startDate || dayjs(value).startOf('minute') > startDate) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  };

  return (
    <>
      <CustomFormItem
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { validator: dateValidator, message: 'Başlangıç Tarihi Şuandan Önce Seçilemez' },
        ]}
        label="Başlangıç Tarihi ve Saati"
        name="startDate"
      >
        <CustomDatePicker disabledDate={disabledStartDate} showTime format={dateTimeFormat} />
      </CustomFormItem>

      <CustomFormItem
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { validator: dateValidator, message: 'Bitiş Tarihi Şuandan Önce Seçilemez' },
          {
            validator: endDateCannotBeSelectedBeforeTheStartDate,
            message: 'Bitiş Tarihi Başlangıç Tarihinden Önce veya Aynı Seçilemez.',
          },
        ]}
        dependencies={['startDate']}
        label="Bitiş Tarihi ve Saati"
        name="endDate"
      >
        <CustomDatePicker disabledDate={disabledEndDate} showTime format={dateTimeFormat} />
      </CustomFormItem>
    </>
  );
};

export default DateSection;
