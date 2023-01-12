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
  getAll,
  setPublishAnnouncements,
  getByFilterPagedAnnouncements,
  getByFilterPagedAnnouncementTypes,
} from '../../../store/slice/announcementSlice';
import { getGroupsList } from '../../../store/slice/groupsSlice';

import dayjs from 'dayjs';
import { useEffect } from 'react';
const formPublicationPlacesEnum = {
  1: 'Anasayfa',
  2: 'Anketler Sayfası',
  3: 'Pop-up',
  4: 'Bildirimler',
};

const publishStatusObj = [
  { id: 1, name: 'Yayında' },
  { id: 2, name: 'Yayında Değil' },
  { id: 3, name: 'Taslak' },
];

const AnnouncementFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { announcements, filterObject, announcementTypes } = useSelector((state) => state?.announcement);
  const loadGroupsList = useCallback(async () => {
    await dispatch(getGroupsList());
  }, [dispatch]);
  useEffect(() => {
    loadGroupsList();
  }, []);

  const { groupsList } = useSelector((state) => state?.groups);

  useEffect(() => {
    form.resetFields();
    dispatch(getByFilterPagedAnnouncementTypes());
  }, []);

  const handleClear = useCallback(async () => {
    form.resetFields();
    const body = {
      headText: '',
      announcementType: '',
      startDate: '',
      endDate: '',
      role: '',
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
      console.log(values);
      const type = values.announcementType;

      const body = {
        announcementTypeId: type,
        headText: values?.headText || undefined,
        publishStatus: values.publishStatus,
        startDate: values?.startDate ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00') : undefined,
        endDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
        role: values.role,
      };
      await dispatch(getByFilterPagedAnnouncements({ ...filterObject, ...body }));
    } catch (e) {}
    form.resetFields();
  }, [dispatch, filterObject, form, announcementTypes]);

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
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())}
            >
              {announcements?.map(({ id, headText }) => (
                <Option key={id} value={headText}>
                  {headText}
                </Option>
              ))}
              <Option key={11111} value={null}>
                Hepsi
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label={
              <div>
                <Text t="Duyuru Tipi" />
              </div>
            }
            name="announcementType"
            className="filter-item"
            onClick={(value) => {
              return value == '';
            }}
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
                <Text t="Yayınlanma Durumu" />
              </div>
            }
            name="publishStatus"
            className="filter-item"
            onClick={(value) => {
              return value == '';
            }}
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
            >
              {publishStatusObj.map(({ id, name }, index) => (
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
                <Text t="Duyuru Rolleri" />
              </div>
            }
            name="role"
            className="filter-item"
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              mode="multiple"
              showArrow
              style={{
                width: '100%',
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())}
            >
              {groupsList?.map(({ id, groupName }) => (
                <Option key={id} value={groupName}>
                  {groupName}
                </Option>
              ))}
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
