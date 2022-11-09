import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomFormItem,
  CustomInput,
  CustomSelect,
  errorDialog,
  Option,
  Text,
} from '../../../components';
import { getSurveyWithFilterSurveyCategory } from '../../../store/slice/eventsSlice';
import { getByFilterPagedSubCategories } from '../../../store/slice/subCategorySlice ';
import { turkishToLower } from '../../../utils/utils';
import DateSection from './DateSection';
import ParticipantGroupsSection from './ParticipantGroupsSection';

const EventForm = ({ form }) => {
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state?.subCategory);
  const [isSelectedSurveyCategory, setIsSelectedSurveyCategory] = useState(false);
  const [surveyList, setSurveyList] = useState([]);

  useEffect(() => {
    loadSurveyCategories();
  }, []);

  const loadSurveyCategories = useCallback(async () => {
    await dispatch(getByFilterPagedSubCategories({ id: 24 })); //24 anket kategorilerinin id
  }, [dispatch]);

  const surveyCategroyChange = async (value) => {
    form.resetFields(['formId']);
    if (!value) {
      setSurveyList([]);
      setIsSelectedSurveyCategory(false);
      return false;
    }
    const action = await dispatch(getSurveyWithFilterSurveyCategory(value));
    if (getSurveyWithFilterSurveyCategory.fulfilled.match(action)) {
      const surveyList = action?.payload?.data?.items;
      if (surveyList.length) {
        setSurveyList(surveyList);
      } else {
        setIsSelectedSurveyCategory(false);
        errorDialog({
          title: <Text t="error" />,
          message: 'Seçtiğiniz Kategoriye Ait Kayıtlı Anket Bulunamadı',
        });
      }
    } else {
      setSurveyList([]);
      setIsSelectedSurveyCategory(false);
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
    !isSelectedSurveyCategory && setIsSelectedSurveyCategory(true);
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
        <CustomInput placeholder="Etkinlik Adı" />
      </CustomFormItem>

      <CustomFormItem
        label="Açıklama"
        name="description"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <CustomInput placeholder="Açıklama" />
      </CustomFormItem>

      <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Durum"
        name="isActive"
      >
        <CustomSelect placeholder="Durum">
          <Option key={1} value={true}>
            Aktif
          </Option>
          <Option key={2} value={false}>
            Pasif
          </Option>
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem label="Anket Kategorisi" name="subCategoryId">
        <CustomSelect
          filterOption={(input, option) =>
            turkishToLower(option.children).includes(turkishToLower(input))
          }
          showArrow
          showSearch
          onChange={surveyCategroyChange}
          placeholder="Anket Kategorisi Seçiniz"
        >
          {subCategories
            ?.filter((item) => item.isActive)
            ?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          <Option key={undefined} value={undefined}>
            Yok
          </Option>
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem label="Anket Seçimi" name="formId">
        <CustomSelect
          showArrow
          showSearch
          filterOption={(input, option) =>
            turkishToLower(option.children).includes(turkishToLower(input))
          }
          disabled={!isSelectedSurveyCategory}
          placeholder="Anket Seçiniz"
        >
          {surveyList
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
