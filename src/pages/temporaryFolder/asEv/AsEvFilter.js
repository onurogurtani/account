import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomSelect,
  Option,
  Text,
  errorDialog,
} from '../../../components';
import { getCreatedNames, getFilterPagedAsEvs, getVideoNames } from '../../../store/slice/asEvSlice';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessons } from '../../../store/slice/lessonsSlice';
import '../../../styles/announcementManagement/announcementFilter.scss';

const toRFObj = [
  { id: 1, name: 'Bağlı', value: true },
  { id: 2, name: 'Bağlı Değil', value: false },
];
const AsEvFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
    dispatch(getAllClassStages());
    dispatch(getLessons());
    dispatch(getVideoNames());
    dispatch(getCreatedNames());
  }, [dispatch, form]);

  const { lessons } = useSelector((state) => state?.lessons);
  const [filteredLessons, setFilteredLessons] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    setFilteredLessons([...lessons]);
    return () => ac.abort();
  }, [lessons]);

  const { allClassList } = useSelector((state) => state?.classStages);
  const { videoNames, inserterNames } = useSelector((state) => state?.asEv);

  const handleClear = useCallback(async () => {
    form.resetFields();

    await dispatch(getFilterPagedAsEvs({}));
  }, [dispatch, form]);

  const handleSearch = useCallback(async () => {
    // TODO BURAda gönderilen filtre paramaetreleri kontrol edilecek BE İLE

    try {
      const values = await form.validateFields();
      const body = {
        classroomId: values?.classroomName,
        createdName: values?.createdName,
        isWorkPlanAttached: values?.isWorkPlanAttached,
        kalturaVideoName: values?.kalturaVideoName,
        lessonId: values?.lessonName,
        startDate: values?.startDate ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00') : undefined,
        endDate: values?.endDate ? dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59') : undefined,
      };
      await dispatch(getFilterPagedAsEvs({ ...body }));
    } catch (error) {
      errorDialog({
        title: <Text t="error" />,
        message: error?.message,
      });
    }
    form.resetFields();
  }, [dispatch, form]);

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

  const onClassRoomChange = async (value) => {
    if (value) {
      form.resetFields(['lessonName']);
      // let classId = allClassList?.filter((item) => item.id === value)[0]?.id;
      let lessonsOfClass = lessons.filter((item) => item.classroomId === value);
      console.log('lessonsOfClass :>> ', lessonsOfClass);
      setFilteredLessons(lessonsOfClass);
    } else {
      setFilteredLessons(lessons);
    }
  };
  return (
    <div className="announcement-filter-card">
      <CustomForm name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
        <div className="filter-form">
          <CustomFormItem
            label={
              <div>
                <Text t="Test Adı" />
              </div>
            }
            // TODO: BURAYI BE İLE AYNI YAP
            name="kalturaVideoName"
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
              {/* TODO  Buraya test isimleri çekilip yazılacak */}
              {videoNames?.map(({ label }, index) => (
                <Option key={index} value={label}>
                  {label}
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
                <Text t="Sınavı Oluşturan Kişi" />
              </div>
            }
            // TODO: BURAYI BE İLE AYNI YAP
            name="createdName"
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
              {/* //TODO Buraya test isimleri çekilip yazılacak */}
              {inserterNames?.map(({ label }, index) => (
                <Option key={index} value={label}>
                  {label}
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
                <Text t="Sınıf Seviyesi" />
              </div>
            }
            name="classroomName"
            className="filter-item"
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
              onChange={(value) => onClassRoomChange(value)}
            >
              {allClassList?.map(({ id, name }, index) => (
                //todo aşağıdaki value id mi olacak kontrol etm lazım
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
                <Text t="Çalışma Planı Bağlı Mı" />
              </div>
            }
            name="isWorkPlanAttached"
            className="filter-item"
            // onClick={(value) => {
            //   return value == '';
            // }}
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
            >
              {toRFObj.map(({ id, name, value }, index) => (
                <Option id={id} key={index} value={value}>
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
          <CustomFormItem
            label={
              <div>
                <Text t="Ders" />
              </div>
            }
            name="lessonName"
            className="filter-item"
            // onClick={(value) => {
            //   return value == '';
            // }}
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
              style={{
                width: '100%',
              }}
            >
              {filteredLessons?.map(({ id, name }, index) => (
                <Option id={id} key={index} value={id}>
                  <Text t={name} />
                </Option>
              ))}
              <Option key={null} value={null}>
                <Text t="Hepsi" />
              </Option>
            </CustomSelect>
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

export default AsEvFilter;
