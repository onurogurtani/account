import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, Option } from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { videoTimeValidator } from '../../../../utils/formRule';

const LessonsSectionForm = ({ form }) => {
  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId, lessonSubjectId, setLessonSubjectId } =
    useAcquisitionTree();

  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { allClassList } = useSelector((state) => state?.classStages);

  const [videoBrackets, setVideoBrackets] = useState([]);
  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    form.resetFields(['lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonSubSubjectsSelect = (_, option) => {
    setVideoBrackets((prev) => [
      ...prev,
      { bracketTime: '', header: option.children, lessonSubSubjectId: option.value },
    ]);
  };

  const onLessonSubSubjectsDeselect = (_, option) => {
    setVideoBrackets((prev) => prev.filter((item) => item.lessonSubSubjectId !== option.value));
  };

  return (
    <>
      <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
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
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
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
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Ünite"
        name="lessonUnitId"
      >
        <CustomSelect onChange={onUnitChange} placeholder="Ünite">
          {lessonUnits
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
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
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
        <CustomSelect
          onSelect={onLessonSubSubjectsSelect}
          onDeselect={onLessonSubSubjectsDeselect}
          showArrow
          mode="multiple"
          placeholder="Alt Başlık"
        >
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

      {videoBrackets.length > 0 && (
        <CustomFormItem className="requiredFieldLabelMark" label="Ayraç">
          <div className="header-mark">
            <div className="title-mark">Başlık</div>
            <div className="time-mark">Dakika</div>
          </div>
          {videoBrackets.map((i, index) => (
            <div key={index} className="video-mark">
              <CustomFormItem name={['videoBrackets', index, 'header']} style={{ flex: 2 }}>
                <CustomInput disabled placeholder={i.header} />
              </CustomFormItem>

              <CustomFormItem
                name={['videoBrackets', index, 'bracketTime']}
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: 'Zorunlu Alan' },
                  { validator: videoTimeValidator, message: 'Lütfen Boş Bırakmayınız' },
                ]}
              >
                <CustomMaskInput mask={'999:99'}>
                  <CustomInput placeholder="000:00" />
                </CustomMaskInput>
              </CustomFormItem>

              <CustomFormItem
                name={['videoBrackets', index, 'lessonSubSubjectId']}
                style={{ display: 'none' }}
                initialValue={i.lessonSubSubjectId}
              >
                <CustomInput disabled />
              </CustomFormItem>
            </div>
          ))}
        </CustomFormItem>
      )}
    </>
  );
};

export default LessonsSectionForm;
