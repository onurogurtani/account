import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFormCategoryList } from '../store/slice/categoryOfFormsSlice';
import { getSurveyListWithSelectedSurveyCategory } from '../store/slice/eventsSlice';
import { turkishToLower } from '../utils/utils';
import { errorDialog } from './CustomDialog';
import { CustomFormItem } from './CustomForm';
import CustomSelect, { Option } from './CustomSelect';
import Text from './Text';

const SurveyListWithSelectedSurveyCategory = ({ disabled, form, required }) => {
  const dispatch = useDispatch();
  const [formCategories, setFormCategories] = useState([]);
  const [surveyListWithSelectedSurveyCategory, setSurveyListWithSelectedSurveyCategory] = useState([]);

  const categoryOfFormIdValue = Form.useWatch('categoryOfFormId', form);

  useEffect(() => {
    loadSurveyCategories();
  }, []);

  useEffect(() => {
    surveyCategroyChange(categoryOfFormIdValue);
  }, [categoryOfFormIdValue]);

  const loadSurveyCategories = async () => {
    try {
      const action = await dispatch(getFormCategoryList()).unwrap();
      setFormCategories(action?.data?.items);
    } catch (err) {
      setFormCategories([]);
    }
  };

  const surveyCategroyChange = async (value) => {
    form.resetFields(['formId']);
    if (!value) {
      setSurveyListWithSelectedSurveyCategory([]); //Anket Kategorisi seçmekten vazgeçerse anket listesi sıfırla
      return false;
    }
    try {
      const action = await dispatch(getSurveyListWithSelectedSurveyCategory(value)).unwrap();
      setSurveyListWithSelectedSurveyCategory(action?.data?.items);
    } catch (err) {
      setSurveyListWithSelectedSurveyCategory([]);
      errorDialog({ title: <Text t="error" />, message: err?.message });
    }
  };

  return (
    <>
      <CustomFormItem
        rules={[{ required, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Anket Kategorisi"
        name="categoryOfFormId"
      >
        <CustomSelect
          filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          disabled={disabled}
          showArrow
          showSearch
          placeholder="Anket Kategorisi Seçiniz"
        >
          <Option key={false} value={false}>
            Anket Kategorisi Seçiniz
          </Option>
          {formCategories
            ?.filter((item) => item.isActive)
            ?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        rules={[{ required, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Anket Seçimi"
        name="formId"
      >
        <CustomSelect
          showArrow
          showSearch
          filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          disabled={!surveyListWithSelectedSurveyCategory.length || disabled}
          placeholder="Anket Seçiniz"
        >
          <Option key={false} value={false}>
            Anket Seçiniz
          </Option>
          {surveyListWithSelectedSurveyCategory
            // ?.filter((item) => item.isActive)
            ?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>
    </>
  );
};

export default SurveyListWithSelectedSurveyCategory;
