import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  CustomFormItem,
  CustomInput,
  CustomSelect,
  errorDialog,
  Option,
  Text,
} from '../../../components';
import {
  getSurveyListWithSelectedSurveyCategory,
  setSurveyListWithSelectedSurveyCategory,
} from '../../../store/slice/eventsSlice';
import { getByFilterPagedSubCategories } from '../../../store/slice/subCategorySlice ';
import { turkishToLower } from '../../../utils/utils';
import DateSection from './DateSection';
import ParticipantGroupsSection from './ParticipantGroupsSection';

const EventForm = ({ form }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { subCategories } = useSelector((state) => state?.subCategory);
  const { surveyListWithSelectedSurveyCategory } = useSelector((state) => state?.events);

  useEffect(() => {
    loadSurveyCategories();
  }, []);

  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  const loadSurveyCategories = useCallback(async () => {
    await dispatch(getByFilterPagedSubCategories({ id: 24 })); //24 anket kategorilerinin id
  }, [dispatch]);

  const surveyCategroyChange = async (value) => {
    form.resetFields(['formId']);
    if (!value) {
      dispatch(setSurveyListWithSelectedSurveyCategory([])); //Anket Kategorisi seçmekten vazgeçerse anket listesi sıfırla
      return false;
    }

    const action = await dispatch(getSurveyListWithSelectedSurveyCategory(value));
    if (getSurveyListWithSelectedSurveyCategory.fulfilled.match(action)) {
      const surveyList = action?.payload?.data?.items;
      if (!surveyList.length) {
        errorDialog({
          title: <Text t="error" />,
          message: 'Seçtiğiniz Kategoriye Ait Kayıtlı Anket Bulunamadı',
        });
      }
    } else {
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

      {/* <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Durum"
        name="isActive"
      >
        <CustomSelect disabled={isDisableAllButDate} placeholder="Durum">
          <Option key={1} value={true}>
            Aktif
          </Option>
          <Option key={2} value={false}>
            Pasif
          </Option>
        </CustomSelect>
      </CustomFormItem> */}

      <CustomFormItem label="Anket Kategorisi" name="subCategoryId">
        <CustomSelect
          filterOption={(input, option) =>
            turkishToLower(option.children).includes(turkishToLower(input))
          }
          disabled={isDisableAllButDate}
          showArrow
          showSearch
          onChange={surveyCategroyChange}
          placeholder="Anket Kategorisi Seçiniz"
        >
          <Option key={false} value={false}>
            Anket Kategorisi Seçiniz
          </Option>
          {subCategories
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
          filterOption={(input, option) =>
            turkishToLower(option.children).includes(turkishToLower(input))
          }
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
    </>
  );
};

export default EventForm;
