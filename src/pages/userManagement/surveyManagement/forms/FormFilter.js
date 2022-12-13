import React from 'react';
import { Form } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomImage,
  useText,
  Text,
  CustomSelect,
  Option,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
} from '../../../../components';
import { getFilteredPagedForms,getFormCategories  } from '../../../../store/slice/formsSlice';
import iconSearchWhite from '../../../../assets/icons/icon-white-search.svg';
import '../../../../styles/surveyManagement/surveyFilter.scss';
import dayjs from 'dayjs';

const publishSituation = [
  { id: 1, value: 'Yayında'},
  { id: 2,  value: 'Yayında değil'},
  { id: 3,  value: 'Taslak'},

];
const publishEnum={
  'Yayında':1,
  'Yayında değil':2,
  'Taslak':3
}
const publishEnumReverse={
  1:'Yayında',
  2:'Yayında değil',
  3:'Taslak'
}

const FormFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { filterObject, formList, formCategories } = useSelector((state) => state?.forms);

  useEffect(() => {
    dispatch(getFilteredPagedForms(filterObject));
    dispatch(getFormCategories());
  }, [dispatch]);
  

  const handleClear = useCallback(async () => {
    form.resetFields();
    form.resetFields(['CategoryId']);
    const body = {
      name: '',
      Status: [],
      CategoryId: [],
      InsertEndDate: '',
      InsertStartDate: '',
    };
    await dispatch(
      getFilteredPagedForms({
        ...filterObject,
        ...body,
      }),
    );
  }, [dispatch, form]);

  const handleSearch = useCallback(async () => {
    try {
      const values = await form.validateFields();
      console.log(values);

      const body = {
        Name: values?.name || null,
        PublishStatus:publishEnum[values.status],
        CategoryId: values.categoryId || null,
        StartDate: values?.startDate
          ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00')
          : undefined,
        EndDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
      };
      console.log(body)

      await dispatch(getFilteredPagedForms({ ...filterObject, ...body }));
    } catch (e) {
    }
  }, [dispatch, filterObject, form]);

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    if (!startValue || !endDate) {
      return false;
    }
    return startValue?.startOf('day') > endDate?.startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);
    if (!endValue || !startDate) {
      return false;
    }
    return endValue?.startOf('day') < startDate?.startOf('day');
  };

  return (
    <>
      <div className="form-filter-card">
        <CustomForm name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
          <div className="filter-form">
            <CustomFormItem
              label={
                <div>
                  <Text t="Anket Adı" />
                </div>
              }
              name="name"
              className="filter-item"
            >
              <CustomSelect
                showSearch
                className="form-filter-item"
                placeholder="Anket Adı Seçiniz..."
                value={formList.Name}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
                }
              >
                {formList?.map((form) => (
                  <Option key={form.id} value={form.name}>
                    {form.name}
                  </Option>
                ))}
                <Option key={11111} value={undefined}>
                  Hepsi
                </Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
              label={
                <div>
                  <Text t="Yayınlanma Durumu" />
                  <span>:</span>
                </div>
              }
              name="status"
              className="filter-item"
            >
              <CustomSelect className="form-filter-item" placeholder={useText('Seçiniz')}>
                {publishSituation?.map(({ id,value}) => (
                  <Option key={id} value={value}>
                    {value}
                  </Option>
                ))}
                <Option key={111} value={undefined}>
                  <Text t="Hepsi" />
                </Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
              label={
                <div>
                  <Text t="Kategori" />
                  <span>:</span>
                </div>
              }
              name="categoryId"
              className="filter-item"
            >
              <CustomSelect className="form-filter-item" placeholder={useText('choose')}>
                {formCategories?.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
                <Option key={112} value={undefined}>
                  <Text t="Hepsi" />
                </Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
              label={
                <div>
                  <Text t="Başlangıç Tarihi" />
                </div>
              }
              name="startDate"
              className="filter-item filter-date"
            >
              <CustomDatePicker
                className="form-filter-item"
                placeholder={'Tarih Seçiniz'}
                disabledDate={disabledStartDate}
              />
            </CustomFormItem>
            <CustomFormItem
              label={
                <div>
                  <Text t="Bitiş Tarihi" />
                </div>
              }
              name="endDate"
              className="filter-item filter-date"
            >
              <CustomDatePicker
                className="form-filter-item"
                placeholder={'Tarih Seçiniz'}
                disabledDate={disabledEndDate}
              />
            </CustomFormItem>
          </div>

          <div className="action-buttons">
            <CustomButton data-testid="clear" className="clear-btn" onClick={handleClear}>
              <Text t="Temizle" />
            </CustomButton>
            <CustomButton data-testid="search" className="search-btn" onClick={handleSearch}>
              <CustomImage className="icon-search" src={iconSearchWhite} /> <Text t="Ara" />
            </CustomButton>
          </div>
        </CustomForm>
      </div>
    </>
  );
};

export default FormFilter;
