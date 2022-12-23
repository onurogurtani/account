import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';

const LessonsSectionForm = ({ form }) => {
  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId, lessonSubjectId, setLessonSubjectId } =
    useAcquisitionTree();

  const { currentVideo } = useSelector((state) => state?.videos);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

  const { lessonUnits } = useSelector((state) => state?.lessonUnits);

  const { allClassList } = useSelector((state) => state?.classStages);

  useEffect(() => {
    if (Object.keys(currentVideo).length) {
      setClassroomId(currentVideo?.classroomId);
      setLessonId(currentVideo.lessonId);
      setUnitId(currentVideo.lessonUnitId);
      setLessonSubjectId(currentVideo.lessonSubjectId);
      form.setFieldsValue({
        classroomId: currentVideo?.classroomId,
        lessonId: currentVideo?.lessonId,
        lessonUnitId: currentVideo?.lessonUnitId,
        lessonSubjectId: currentVideo?.lessonSubjectId,
        lessonSubSubjects: currentVideo?.lessonSubSubjects?.map((item) => item.lessonSubSubjectId),
      });
    }
  }, [currentVideo]);

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    form.resetFields(['lessonSubSubjects']);
  };

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
        name="classroomId"
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
          {lessonUnits
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
