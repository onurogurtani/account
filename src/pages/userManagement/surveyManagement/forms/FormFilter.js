import React from 'react';
import { Form } from 'antd';
import { useCallback } from 'react';
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
import { getFilteredPagedForms } from '../../../../store/slice/formsSlice';
import iconSearchWhite from '../../../../assets/icons/icon-white-search.svg';
import '../../../../styles/surveyManagement/surveyFilter.scss';
import dayjs from 'dayjs';

const categoryList = [
  { id: 1, categoryName: 'Eğitimden Önce' },
  { id: 2, categoryName: 'Eğitimden Sonra' },
  { id: 3, categoryName: 'String' },
];

const situationList = [
  { id: 1, key:'isActive' , value:'true', text:'Aktif' },
  { id: 2, key:'isActive' , value:'false', text:'Pasif' },
];

const FormFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { filterObject, formList } = useSelector((state) => state?.forms);

  const handleClear = useCallback(async () => {
    console.log(filterObject);
    form.resetFields();
    form.resetFields(['CategoryId']);
    const body = {
      name: '',
      Status: [],
      CategoryId: [],
      InsertEndDate: '',
      InsertStartDate: '',
    };
    console.log(body);
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

      if(values.status!= null || values.status!= undefined){
        var Status=[values.status];
      }
      const body = {
        Name: values?.name || null,
        Status,
        CategoryId: values.categoryId || null,
        StartDate: values?.startDate
          ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00')
          : undefined,
        EndDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
      };

      console.log({...filterObject, ...body});
      await dispatch(getFilteredPagedForms({...filterObject, ...body}));
    } catch (e) {
      console.log(e);
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
              className='filter-item'
            >
              <CustomSelect
              showSearch
              className='form-filter-item' 
            
              placeholder="Anket Adı Seçiniz..."
              value={formList.Name}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
              }
            >
              {formList?.map((form) => (
                <Option key={form.id} value={form.name}>{form.name}</Option>
              ))}
              <Option key={11111} value={null}>Hepsi</Option>
            </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
              label={
                <div>
                  <Text t="Durum" />
                  <span>:</span>
                </div>
                
              }
              name="status"
              className='filter-item'
              
            >
              <CustomSelect
                className='form-filter-item' 
                placeholder={useText('Seçiniz')}
              >
                {situationList?.map(({ id, text,value, key }) => (
                  <Option id={id} key={key} value={value}>
                    {text}
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
              className='filter-item'
              
            >
              <CustomSelect
                className='form-filter-item' 
                placeholder={useText('choose')}
              >
                {categoryList?.map(({ id, categoryName }) => (
                  <Option key={id} value={id}>
                    {categoryName}
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
              className='filter-item filter-date'
             
            >
              <CustomDatePicker
                className='form-filter-item' 
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
              className='filter-item filter-date'
            
            >
              <CustomDatePicker
                 className='form-filter-item' 
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
