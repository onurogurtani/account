import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  Option,
  CustomSelect,
  Text,
} from '../../../components';
import '../../../styles/announcementManagement/announcementFilter.scss';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import { Form } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getByFilterPagedAnnouncements,
  getByFilterPagedAnnouncementTypes,
} from '../../../store/slice/announcementSlice';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const AnnouncementFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { filterObject, announcementTypes, announcements } = useSelector((state) => state?.announcement);


  useEffect(() => {
    form.resetFields();
    dispatch(getByFilterPagedAnnouncementTypes());    
  }, [dispatch]);

  const handleClear = useCallback(async () => {
    form.resetFields();
    const body = {
      HeadText: '',
      AnnouncementType: '', // BUNU DÜZELTMEM GEREKEBİLİR
      StartDate: '',
      EndDate: '',
    };
    await dispatch(
      getByFilterPagedAnnouncements({
        ...filterObject,
        ...body,
      }),
    );
  }, [dispatch, form]);

  const handleSearch = useCallback(async () => {
    try {
      const values = await form.validateFields();

      if (values.announcementType == null || values.announcementType == undefined) {
        var announcementType= null
      }else{
        var announcementType = values.announcementType}

      const body = {
        headText: values?.headText || undefined,
        announcementType,
        startDate: values?.startDate
          ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00')
          : undefined,
        endDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
      };
      await dispatch(getByFilterPagedAnnouncements({ ...filterObject, ...body }));

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
    <div className="announcement-filter-card">
      <CustomForm name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
        <div className="filter-form">
        <CustomFormItem
              label={
                <div>
                  <Text t="Duyuru Başlığı" />
                </div>
              }
              name="headText"
              className="filter-item"
            >
              <CustomSelect
              className="form-filter-item"
              placeholder={'Duyuru Adı Seçiniz...'}
              style={{
                width: '100%',
              }}
                showSearch
               
               
                //value={announcements.Name}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
                }
              >
                {announcements?.map(({id, headText}) => (
                  <Option key={id} value={headText}>
                    {headText}
                  </Option>
                ))}
                <Option key={11111} value={null}>
                  Hepsi
                </Option>
              </CustomSelect>
            </CustomFormItem>
          {/* <CustomFormItem
            label={
              <div>
                <Text t="Duyuru Başlığı" />
              </div>
            }
            name="headText"
            className="filter-item"
          >
            <CustomInput
              style={{
                width: '100%',
              }}
              className="form-filter-item"
              autoComplete="off"
              placeholder={'Duyuru Başlığı'}
            />
          </CustomFormItem> */}
          <CustomFormItem
            label={
              <div>
                <Text t="Duyuru Tipi" />
              </div>
            }
            name="announcementType"
            className="filter-item"
            onClick={ (value)=>{ return value==''; } }
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
            >
              {announcementTypes?.map(({ id, name }, index) => (
                <Option id={id} key={index} value={id}>
                  <Text t={name} />
                </Option>
              ))}
              <Option key={null} value={null}>
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
            className="filter-item"
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
            className="filter-item"
          >
            <CustomDatePicker
              className="form-filter-item"
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledEndDate}
            />
          </CustomFormItem>
        </div>

        <div className="form-footer">
          <div className="action-buttons">
            <CustomButton data-testid="clear" className="clear-btn" onClick={handleClear}>
              <Text t="Temizle" />
            </CustomButton>
            <CustomButton data-testid="search" className="search-btn" onClick={handleSearch}>
              <CustomImage className="icon-search" src={iconSearchWhite} /> <Text t="Ara" />
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default AnnouncementFilter;
