import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomSelect,
  Option,
} from '../../components';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllVideoKeyword,
  getByFilterPagedVideos,
  getVideoCategoryList,
  setIsFilter,
} from '../../store/slice/videoSlice';
import { getPackageList } from '../../store/slice/packageSlice';
import {
  getLessons,
  getLessonSubjects,
  getLessonSubSubjects,
  getUnits,
} from '../../store/slice/lessonsSlice';
import { turkishToLower } from '../../utils/utils';

const VideoFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { categories, keywords, filterObject, isFilter } = useSelector((state) => state?.videos);
  const { packages } = useSelector((state) => state?.packages);
  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector(
    (state) => state?.lessons,
  );

  useEffect(() => {
    loadLessons();
    loadVideoCategories();
    loadPackages();
    loadUnits();
    loadLessonSubjects();
    loadLessonSubSubjects();
    loadAllKeyword();
  }, []);

  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(filterObject);
    }
  }, []);

  const loadVideoCategories = useCallback(async () => {
    await dispatch(getVideoCategoryList());
  }, [dispatch]);

  const loadPackages = useCallback(async () => {
    await dispatch(getPackageList());
  }, [dispatch]);

  const loadLessons = useCallback(async () => {
    await dispatch(getLessons());
  }, [dispatch]);

  const loadUnits = useCallback(async () => {
    await dispatch(getUnits());
  }, [dispatch]);

  const loadLessonSubjects = useCallback(async () => {
    await dispatch(getLessonSubjects());
  }, [dispatch]);

  const loadLessonSubSubjects = useCallback(async () => {
    await dispatch(getLessonSubSubjects());
  }, [dispatch]);

  const loadAllKeyword = useCallback(async () => {
    await dispatch(getAllVideoKeyword());
  }, [dispatch]);

  const handleFilter = () => {
    form.submit();
  };

  const onFinish = useCallback(
    async (values) => {
      try {
        const body = {
          ...filterObject,
          ...values,
          KeyWords: values.KeyWords?.toString(),
          IsActive: values?.IsActive === 0 ? undefined : values?.IsActive,
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedVideos(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, filterObject],
  );

  const handleReset = async () => {
    form.resetFields();
    await dispatch(
      getByFilterPagedVideos({ PageSize: filterObject?.PageSize, OrderBy: filterObject?.OrderBy }),
    );
    await dispatch(setIsFilter(false));
  };

  return (
    <div className="table-filter">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <div className="form-item">
          <CustomFormItem label="Video Kategorisi" name="CategoryIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Video Kategorisi"
            >
              {categories
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

          <CustomFormItem label="Bağlı Olduğu Paket" name="PackageIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Bağlı Olduğu Paket"
            >
              {packages
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

          <CustomFormItem label="Ders" name="LessonIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Ders"
            >
              {lessons
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

          <CustomFormItem label="Ünite" name="LessonUnitIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Ünite"
            >
              {units
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

          <CustomFormItem label="Konu" name="LessonSubjectIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Konu"
            >
              {lessonSubjects
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

          <CustomFormItem label="Alt Başlık" name="LessonSubSubjectIds">
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode="multiple"
              placeholder="Alt Başlık"
            >
              {lessonSubSubjects
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

          <CustomFormItem label="Durum" name="IsActive">
            <CustomSelect placeholder="Durum">
              <Option key={0} value={0}>
                Hepsi
              </Option>
              <Option key={1} value={true}>
                Aktif
              </Option>
              <Option key={2} value={false}>
                Pasif
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Anahtar Kelimeler" name="KeyWords">
            <CustomSelect showArrow mode="multiple" placeholder="Anahtar Kelimeler">
              {keywords?.map((item) => {
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>

          <div className="form-footer">
            <div className="action-buttons">
              <CustomButton className="clear-btn" onClick={handleReset}>
                Temizle
              </CustomButton>
              <CustomButton className="search-btn" onClick={handleFilter}>
                <CustomImage className="icon-search" src={iconSearchWhite} />
                Filtrele
              </CustomButton>
            </div>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default VideoFilter;
