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

  const { currentVideo } = useSelector((state) => state?.videos);
  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector((state) => state?.lessons);
  const { allClassList } = useSelector((state) => state?.classStages);

  useEffect(() => {
    if (!allClassList.length) loadClassrooms();
  }, []);

  useEffect(() => {
    if (Object.keys(currentVideo).length) {
      setClassroomId(41);
      setLessonId(currentVideo.lessonId);
      setUnitId(currentVideo.lessonUnitId);
      setLessonSubjectId(currentVideo.lessonSubjectId);
      form.setFieldsValue({
        classroom: 41,
        lessonId: currentVideo?.lessonId,
        lessonUnitId: currentVideo?.lessonUnitId,
        lessonSubjectId: currentVideo?.lessonSubjectId,
        lessonSubSubjects: currentVideo?.lessonSubSubjects?.map((item) => item.lessonSubSubjectId),
      });
    }
  }, [currentVideo]);

  useEffect(() => {
    if (!classroomId) return false;
    setLessonId();
    setUnitId();
    setLessonSubjectId();
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    loadLessons([
      {
        field: 'classroomId',
        value: classroomId,
        compareType: 0,
      },
    ]);
  }, [classroomId]);

  useEffect(() => {
    if (!lessonId) return false;
    setUnitId();
    setLessonSubjectId();
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
    loadUnits([
      {
        field: 'lessonId',
        value: lessonId,
        compareType: 0,
      },
    ]);
  }, [lessonId]);

  useEffect(() => {
    if (!unitId) return false;
    setLessonSubjectId();
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
    loadLessonSubjects([
      {
        field: 'lessonUnitId',
        value: unitId,
        compareType: 0,
      },
    ]);
  }, [unitId]);

  useEffect(() => {
    if (!lessonSubjectId) return false;
    form.resetFields(['lessonSubSubjects']);
    loadLessonSubSubjects([
      {
        field: 'lessonSubjectId',
        value: lessonSubjectId,
        compareType: 0,
      },
    ]);
  }, [lessonSubjectId]);

  const onClassroomChange = (value) => {
    setClassroomId(value);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
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
            ?.filter((item) => item.lessonUnitId === unitId)
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
            ?.filter((item) => item.lessonSubjectId === lessonSubjectId)
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
