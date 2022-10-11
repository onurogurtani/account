import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  Text,
} from '../../../components';
import '../../../styles/announcementManagement/announcementFilter.scss';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import { Form } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedAnnouncements } from '../../../store/slice/announcementSlice';
import dayjs from 'dayjs';

const AnnouncementFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { filterObject } = useSelector((state) => state?.announcement);

  const handleClear = useCallback(async () => {
    form.resetFields();
    const body = {
      HeadText: '',
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
      const body = {
        HeadText: values?.headText || undefined,
        StartDate: values?.startDate
          ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00')
          : undefined,
        EndDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
      };
      await dispatch(getByFilterPagedAnnouncements({ ...filterObject, ...body }));
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
    <div className="announcement-filter-card">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout={'vertical'}
        form={form}
      >
        <div className="form-item">
          <CustomFormItem
            label={
              <div>
                <Text t="Duyuru Başlığı" />
              </div>
            }
            name="headText"
            className="name-form-item"
          >
            <CustomInput autoComplete="off" placeholder={'Duyuru Başlığı'} />
          </CustomFormItem>
          <div className="form-date">
            <CustomFormItem
              label={
                <div>
                  <Text t="Başlangıç Tarihi" />
                </div>
              }
              name="startDate"
              className="start-date-form-item"
            >
              <CustomDatePicker placeholder={'Tarih Seçiniz'} disabledDate={disabledStartDate} />
            </CustomFormItem>
            <CustomFormItem
              label={
                <div>
                  <Text t="Bitiş Tarihi" />
                </div>
              }
              name="endDate"
              className="end-date-form-item"
            >
              <CustomDatePicker placeholder={'Tarih Seçiniz'} disabledDate={disabledEndDate} />
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
        </div>
      </CustomForm>
    </div>
  );
};

export default AnnouncementFilter;
