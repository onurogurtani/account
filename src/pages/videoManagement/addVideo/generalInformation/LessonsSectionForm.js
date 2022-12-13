import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { getLessons, getLessonSubjects, getLessonSubSubjects, getUnits } from '../../../../store/slice/lessonsSlice';

const LessonsSectionForm = ({ form }) => {
  const dispatch = useDispatch();

  const [classroomId, setClassroomId] = useState();
  const [lessonId, setLessonId] = useState();
  const [unitId, setUnitId] = useState();
  const [lessonSubjectId, setLessonSubjectId] = useState();

  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector((state) => state?.lessons);
  const { allClassList } = useSelector((state) => state?.classStages);

  useEffect(() => {
    if (!allClassList.length) loadClassrooms();
    // // if (!Object.keys(lessons).length) {
    // loadLessons();
    // // }
    // // if (!Object.keys(units).length) {
    // loadUnits();
    // // }
    // // if (!Object.keys(lessonSubjects).length) {
    // loadLessonSubjects();
    // // }
    // // if (!Object.keys(lessonSubSubjects).length) {
    // loadLessonSubSubjects();
    // // }
  }, []);

  const onClassroomChange = (value) => {
    setClassroomId(value);
    const findLessons = lessons.find((i) => i.classroomId === value);
    if (!findLessons) {
      loadLessons([
        {
          field: 'classroomId',
          value: value,
          compareType: 0,
        },
      ]);
    }

    setLessonId();
    setUnitId();
    setLessonSubjectId();
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    //state eklenen ünite ise tekrar request engelliyoruz
    const findUnits = units.find((i) => i.lessonId === value);
    if (!findUnits) {
      loadUnits([
        {
          field: 'lessonId',
          value: value,
          compareType: 0,
        },
      ]);
    }
    setUnitId();
    setLessonSubjectId();
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    //state eklenen ders başlığı ise tekrar request engelliyoruz
    const findLessonSubjects = lessonSubjects.find((i) => i.lessonUnitId === value);
    if (!findLessonSubjects) {
      loadLessonSubjects([
        {
          field: 'lessonUnitId',
          value: value,
          compareType: 0,
        },
      ]);
    }
    setLessonSubjectId();
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    //state eklenen ders alt başlığı ise tekrar request engelliyoruz
    const findLessonSubSubjects = lessonSubSubjects.find((i) => i.lessonSubjectId === value);
    if (!findLessonSubSubjects) {
      loadLessonSubSubjects([
        {
          field: 'lessonSubjectId',
          value: value,
          compareType: 0,
        },
      ]);
    }
    form.resetFields(['lessonSubSubjects']);
  };

  const loadLessons = useCallback(
    async (data) => {
      dispatch(getLessons(data));
    },
    [dispatch],
  );

  const loadUnits = useCallback(
    async (data) => {
      await dispatch(getUnits(data));
    },
    [dispatch],
  );

  const loadLessonSubjects = useCallback(
    async (data) => {
      await dispatch(getLessonSubjects(data));
    },
    [dispatch],
  );

  const loadLessonSubSubjects = useCallback(
    async (data) => {
      await dispatch(getLessonSubSubjects(data));
    },
    [dispatch],
  );

  const loadClassrooms = useCallback(async () => {
    await dispatch(getAllClassStages());
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
        label="Sınıf Seviyesi"
        name="classroom"
      >
        <CustomSelect onChange={onClassroomChange} placeholder="Sınıf Seviyesi">
          {allClassList
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
            ?.filter((item) => item.lessonId === lessonId)
            ?.map((item) => {
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
            ?.filter((item) => item.lessonUnitId === unitId)
            ?.map((item) => {
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
            ?.filter((item) => item.lessonSubjectId === lessonSubjectId)
            ?.map((item) => {
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
