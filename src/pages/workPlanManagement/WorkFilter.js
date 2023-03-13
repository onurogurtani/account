import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomForm,
  CustomFormItem, CustomImage,
  CustomSelect,
  Option,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedWorkPlans, setIsFilter, getWorkPlanNamesQuery } from '../../store/slice/workPlanSlice';
import { getListFilterParams, removeFromArray, turkishToLower } from '../../utils/utils';
import { getEducationYears } from '../../store/slice/questionFileSlice';
import { getAllClassStages } from '../../store/slice/classStageSlice';
import useAcquisitionTree from '../../hooks/useAcquisitionTree';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import { Form } from 'antd';
import '../../styles/tableFilter.scss';

const WorkFilter = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState(getListFilterParams('isActive', true));
  const { isFilter, workPlanNamesListData, workPlanDetailSearch } = useSelector((state) => state?.workPlan);
  const { educationYears } = useSelector((state) => state?.questionManagement);

  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

  const { allClassList, classroomId, setClassroomId, setLessonId, setUnitId, setLessonSubjectId } =
    useAcquisitionTree(true);

  const lessonIds = Form.useWatch('LessonIds', form) || [];
  const lessonUnitIds = Form.useWatch('LessonUnitIds', form) || [];
  const lessonSubjectIds = Form.useWatch('LessonSubjectIds', form) || [];
  const lessonSubSubjectIds = Form.useWatch('LessonSubSubjectIds', form) || [];


  useEffect(() => {
    dispatch(getEducationYears());
    dispatch(getWorkPlanNamesQuery());
    dispatch(getAllClassStages(activeFilter));
  }, []);


  useEffect(() => {
    if (isFilter) {
      form.setFieldsValue(workPlanDetailSearch);
    }
  }, []);

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['LessonIds', 'LessonUnitIds', 'LessonSubjectIds', 'LessonSubSubjectIds']);
  };

  const onLessonChange = (value) => {
    setLessonId(value.at(-1));
  };

  const onLessonDeselect = (value) => {
    onDeselectControl('Lesson', value);
  };

  const onUnitDeselect = (value) => {
    onDeselectControl('Unit', value);
  };

  const onLessonSubjectDeselect = (value) => {
    onDeselectControl('Subject', value);
  };

  const onDeselectControl = (key, value) => {
    const findUnitIds = lessonUnits.filter((i) => i.lessonId === value).map((item) => item.id);

    const findSubjectIds = lessonSubjects
      .filter((i) => (key === 'Unit' ? i.lessonUnitId === value : findUnitIds.includes(i.lessonUnitId)))
      .map((item) => item.id);

    const findSubSubjectIds = lessonSubSubjects
      .filter((i) =>
        key === 'Subject' ? i.lessonSubjectId === value : findSubjectIds.includes(i.lessonSubjectId),
      )
      .map((item) => item.id);

    form.setFieldsValue({
      LessonSubSubjectIds: removeFromArray(lessonSubSubjectIds, ...findSubSubjectIds),
    });
    if (key === 'Subject') return false;

    form.setFieldsValue({
      LessonSubjectIds: removeFromArray(lessonSubjectIds, ...findSubjectIds),
    });

    if (key === 'Unit') return false;

    form.setFieldsValue({
      LessonUnitIds: removeFromArray(lessonUnitIds, ...findUnitIds),
    });
  };

  const onUnitChange = (value) => {
    setUnitId(value.at(-1));
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value.at(-1));
  };

  const handleFilter = () => {
    form.submit();
  };

  const onFinish = useCallback(
    async (values) => {
      try {
        const body = {
          ...workPlanDetailSearch,
          body: values,
          PageNumber: 1,
        };
        await dispatch(getByFilterPagedWorkPlans(body));
        await dispatch(setIsFilter(true));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, workPlanDetailSearch],
  );

  const handleReset = async () => {
    form.resetFields();
    await dispatch(getByFilterPagedWorkPlans({
      PageSize: workPlanDetailSearch?.PageSize,
      OrderBy: workPlanDetailSearch?.OrderBy,
    }));
    await dispatch(setIsFilter(false));
  };

  return (
    <div className='table-filter'>
      <CustomForm
        name='filterForm'
        className='filter-form'
        autoComplete='off'
        layout='vertical'
        form={form}
        onFinish={onFinish}
      >
        <div className='form-item'>
          <CustomFormItem label='Çalışma Planı Adı' name='name'>
            <CustomSelect
              showSearch
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              placeholder='Seçiniz'
              height={36}
              allowClear
            >
              {workPlanNamesListData
                ?.map((item, key) => {
                  return (
                    <Option key={key} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Sınıf Seviyesi' name='classroomIds'>
            <CustomSelect
              onChange={onClassroomChange}
              placeholder='Seçiniz'
              height={36}
              showArrow
            >
              {allClassList
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Ders' name='LessonIds'>
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode='multiple'
              onDeselect={onLessonDeselect}
              onChange={onLessonChange}
              placeholder='Seçiniz'
              height={36}
            >
              {lessons
                // ?.filter((item) => item.isActive)
                ?.filter((item) => item.classroomId === classroomId)
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Ünite' name='LessonUnitIds'>
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode='multiple'
              placeholder='Seçiniz'
              onChange={onUnitChange}
              onDeselect={onUnitDeselect}
              height={36}
            >
              {lessonUnits
                // ?.filter((item) => item.isActive)
                ?.filter((item) => lessonIds.includes(item.lessonId))
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Konu' name='LessonSubjectIds'>
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode='multiple'
              placeholder='Seçiniz'
              onChange={onLessonSubjectsChange}
              onDeselect={onLessonSubjectDeselect}
              height={36}
            >
              {lessonSubjects
                ?.filter((item) => lessonUnitIds.includes(item.lessonUnitId))
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Kazanım' name='LessonSubSubjectIds'>
            <CustomSelect
              filterOption={(input, option) =>
                turkishToLower(option.children).includes(turkishToLower(input))
              }
              showArrow
              mode='multiple'
              placeholder='Seçiniz'
              height={36}
            >
              {lessonSubSubjects
                ?.filter((item) => lessonSubjectIds.includes(item.lessonSubjectId))
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Durum' name='recordStatus'>
            <CustomSelect placeholder='Seçiniz' height={36}>
              <Option key={0} value={null}>
                Hepsi
              </Option>
              <Option key={1} value={1}>
                Aktif
              </Option>
              <Option key={2} value={0}>
                Pasif
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Eğitim Öğretim Yılı' name='educationYearIds'>
            <CustomSelect
              height={36}
              allowClear
              placeholder='Seçiniz'
              mode='multiple'
            >
              {educationYears.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.startYear} - {item.endYear}
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label='Kullanım Durumu' name='publishStatus'>
            <CustomSelect placeholder='Seçiniz' height={36}>
              <Option key={0} value={1}>
                Kullanımda
              </Option>
              <Option key={1} value={2}>
                Kullanımda Değil
              </Option>
              <Option key={2} value={3}>
                Taslak
              </Option>
            </CustomSelect>
          </CustomFormItem>
        </div>
        <div className='form-footer'>
          <div className='action-buttons'>
            <CustomButton className='clear-btn' onClick={handleReset}>
              Temizle
            </CustomButton>
            <CustomButton className='search-btn' onClick={handleFilter}>
              <CustomImage className='icon-search' src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default WorkFilter;
