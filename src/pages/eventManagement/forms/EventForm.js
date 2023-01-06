import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  CustomFormItem,
  CustomInput,
  CustomRadio,
  CustomSelect,
  DeclarationSection,
  errorDialog,
  Option,
  Text,
} from '../../../components';
import { eventTypes } from '../../../constants/events';
import { getFormCategoryList } from '../../../store/slice/categoryOfFormsSlice';
import {
  getSurveyListWithSelectedSurveyCategory,
  setSurveyListWithSelectedSurveyCategory,
} from '../../../store/slice/eventsSlice';
import { turkishToLower } from '../../../utils/utils';
import DateSection from './DateSection';
import EventKeywordsSection from './EventKeywordsSection';
import EventLocationSection from './EventLocationSection';
import EventTypeSection from './EventTypeSection';
import ParticipantGroupsSection from './ParticipantGroupsSection';

const EventForm = ({ form }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { surveyListWithSelectedSurveyCategory } = useSelector((state) => state?.events);
  const [formCategories, setFormCategories] = useState([]);
  useEffect(() => {
    loadSurveyCategories();
  }, []);

  const isDisableAllButDate = location?.state?.isDisableAllButDate;

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
      dispatch(setSurveyListWithSelectedSurveyCategory([])); //Anket Kategorisi seçmekten vazgeçerse anket listesi sıfırla
      return false;
    }

    const action = await dispatch(getSurveyListWithSelectedSurveyCategory(value));
    if (!getSurveyListWithSelectedSurveyCategory.fulfilled.match(action)) {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };

  return (
    <>
      <CustomFormItem
        label="Etkinlik Adı"
        name="name"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <CustomInput disabled={isDisableAllButDate} placeholder="Etkinlik Adı" />
      </CustomFormItem>

      <CustomFormItem
        label="Açıklama"
        name="description"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <CustomInput disabled={isDisableAllButDate} placeholder="Açıklama" />
      </CustomFormItem>

      <EventTypeSection />

      <CustomFormItem
        label="Etkinlik Tipi"
        name="eventTypeEnum"
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <Radio.Group disabled={isDisableAllButDate}>
          {eventTypes.map((item) => (
            <CustomRadio key={item.id} value={item.id}>
              {item.value}
            </CustomRadio>
          ))}
        </Radio.Group>
      </CustomFormItem>

      <CustomFormItem label="Anket Kategorisi" name="categoryOfFormId">
        <CustomSelect
          filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          disabled={isDisableAllButDate}
          showArrow
          showSearch
          onChange={surveyCategroyChange}
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

      <CustomFormItem label="Anket Seçimi" name="formId">
        <CustomSelect
          showArrow
          showSearch
          filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          disabled={!surveyListWithSelectedSurveyCategory.length || isDisableAllButDate}
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

      <ParticipantGroupsSection />

      <DateSection form={form} />

      <EventLocationSection />

      <EventKeywordsSection />

      <DeclarationSection />
    </>
  );
};

export default EventForm;
