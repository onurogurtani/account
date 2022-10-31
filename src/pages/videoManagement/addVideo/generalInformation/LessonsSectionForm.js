import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import {
  getLessons,
  getLessonSubjects,
  getLessonSubSubjects,
  getUnits,
} from '../../../../store/slice/lessonsSlice';

const LessonsSectionForm = ({ form }) => {
  const dispatch = useDispatch();

  const [lessonId, setLessonId] = useState();
  const [unitId, setUnitId] = useState();
  const [lessonSubjectId, setLessonSubjectId] = useState();

  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector(
    (state) => state?.lessons,
  );

  useEffect(() => {
    // if (!Object.keys(lessons).length) {
    loadLessons();
    // }
    // if (!Object.keys(units).length) {
    loadUnits();
    // }
    // if (!Object.keys(lessonSubjects).length) {
    loadLessonSubjects();
    // }
    // if (!Object.keys(lessonSubSubjects).length) {
    loadLessonSubSubjects();
    // }
  }, []);

  const onLessonChange = (value) => {
    setLessonId(value);
    setUnitId();
    setLessonSubjectId();
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    setLessonSubjectId();
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    form.resetFields(['lessonSubSubjects']);
  };

  const loadLessons = useCallback(async () => {
    dispatch(getLessons());
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

  return (
    <>
      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Ders"
        name="lessonId"
      >
        <CustomSelect onChange={onLessonChange} placeholder="Ders">
          {lessons
            ?.filter((item) => item.isActive)
            .map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Ünite"
        name="lessonUnitId"
      >
        <CustomSelect onChange={onUnitChange} placeholder="Ünite">
          {units
            ?.filter((item) => item.isActive && item.lessonId === lessonId)
            .map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Konu"
        name="lessonSubjectId"
      >
        <CustomSelect onChange={onLessonSubjectsChange} placeholder="Konu">
          {lessonSubjects
            ?.filter((item) => item.isActive && item.lessonUnitId === unitId)
            .map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Alt Başlık"
        name="lessonSubSubjects"
      >
        <CustomSelect showArrow mode="multiple" placeholder="Alt Başlık">
          {lessonSubSubjects
            ?.filter((item) => item.isActive && item.lessonSubjectId === lessonSubjectId)
            .map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
        </CustomSelect>
      </CustomFormItem>
    </>
  );
};

export default LessonsSectionForm;
