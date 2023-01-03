import { Form, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import { getEducationYearAdd, getEducationYearUpdate } from '../../../store/slice/educationYearsSlice';
import { dateFormat } from '../../../utils/keys';

const AcademicYearForm = ({ educationYear, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [years, setYears] = useState([]);

  const onStartYearChange = useCallback((value) => {
    form.setFieldsValue({
      endYear: value + 1,
    });
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 11; i++) {
      years.push(currentYear + i);
    }
    setYears(years);
  }, []);

  useEffect(() => {
    if (educationYear) form.setFieldsValue(educationYear);
    if (!educationYear) form.resetFields();
  }, [educationYear]);

  const disabledStartDate = useCallback((startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') >= endDate?.startOf('day');
  }, []);

  const disabledEndDate = useCallback((endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    return endValue?.startOf('day') <= startDate?.startOf('day');
  }, []);

  //başlangıç yılı başlangıç tarihindeki yıla eşit mi?
  const isTheStartYearEqualToTheYearOfTheStartDate = useCallback(async (field, value) => {
    const { startYear } = form?.getFieldsValue(['startYear']);
    try {
      if (!startYear || value?.$y === startYear) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  }, []);

  //bitiş yılı bitiş tarihindeki yıla eşit mi?
  const isTheEndYearEqualToTheYearOfTheEndDate = useCallback(async (field, value) => {
    const { endYear } = form?.getFieldsValue(['endYear']);
    try {
      if (!endYear || value?.$y === endYear) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      values.endYear = values.startYear + 1;
      try {
        let action;
        if (educationYear?.id) {
          action = await dispatch(
            getEducationYearUpdate({ educationYear: { ...values, id: educationYear.id } }),
          ).unwrap();
        } else {
          action = await dispatch(getEducationYearAdd({ educationYear: values })).unwrap();
        }
        onCancel();
        form.resetFields();
        successDialog({ title: <Text t="success" />, message: action?.message });
      } catch (error) {
        errorDialog({ title: <Text t="error" />, message: error?.message });
      }
    },
    [educationYear],
  );

  return (
    <CustomForm form={form} autoComplete="off" layout={'horizontal'} labelCol={{ flex: '165px' }} onFinish={onSubmit}>
      <CustomFormItem label="Eğitim Öğretim Yılı" style={{ marginBottom: 0 }} className="requiredFieldLabelMark">
        <CustomFormItem
          rules={[{ required: true, message: 'Lütfen yıl seçimlerini yapınız.' }]}
          name="startYear"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <CustomSelect placeholder="Seçiniz" onChange={onStartYearChange}>
            {years.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
        <span style={{ display: 'inline-block', width: '24px', lineHeight: '52px', textAlign: 'center' }}>-</span>
        <CustomFormItem name="endYear" style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          <CustomInput disabled />
        </CustomFormItem>
      </CustomFormItem>
      <CustomFormItem
        dependencies={['startYear']}
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { validator: isTheStartYearEqualToTheYearOfTheStartDate, message: 'Lütfen tarihleri kontrol ediniz.' },
        ]}
        label="Başlangıç Tarihi"
        name="startDate"
      >
        <CustomDatePicker disabledDate={disabledStartDate} format={dateFormat} />
      </CustomFormItem>

      <CustomFormItem
        name="endDate"
        dependencies={['startYear']}
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { validator: isTheEndYearEqualToTheYearOfTheEndDate, message: 'Lütfen tarihleri kontrol ediniz.' },
        ]}
        label="Bitiş Tarihi"
      >
        <CustomDatePicker disabledDate={disabledEndDate} format={dateFormat} />
      </CustomFormItem>

      <div className="academicYearSubmit">
        <CustomFormItem>
          <Space>
            <CustomButton onClick={onCancel} type="danger">
              İptal
            </CustomButton>
            <CustomButton type="primary" htmlType="submit">
              {educationYear?.id ? 'Güncelle' : 'Kaydet'}
            </CustomButton>
          </Space>
        </CustomFormItem>
      </div>
    </CustomForm>
  );
};

export default AcademicYearForm;
