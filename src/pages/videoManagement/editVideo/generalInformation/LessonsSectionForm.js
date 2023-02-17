import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, Option } from '../../../../components';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { videoTimeValidator } from '../../../../utils/formRule';

const LessonsSectionForm = ({ form }) => {
  const { classroomId, setClassroomId, setLessonId, setUnitId, setLessonSubjectId } = useAcquisitionTree();

  const { currentVideo } = useSelector((state) => state?.videos);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

  const { lessonUnits } = useSelector((state) => state?.lessonUnits);

  const { allClassList } = useSelector((state) => state?.classStages);

  const [videoBrackets, setVideoBrackets] = useState([]);

  const [currentLessonId, setCurrentLessonId] = useState();
  const [currentUnitId, setCurrentUnitId] = useState();
  const [currentLessonSubjectId, setCurrentLessonSubjectId] = useState();

  useEffect(() => {
    if (Object.keys(currentVideo).length) {
      setClassroomId(currentVideo?.classroomId);
      setLessonId(currentVideo.lessonId);
      setUnitId(currentVideo.lessonUnitId);
      setLessonSubjectId(currentVideo.lessonSubjectId);
      setCurrentLessonId(currentVideo.lessonId);
      setCurrentUnitId(currentVideo.lessonUnitId);
      setCurrentLessonSubjectId(currentVideo.lessonSubjectId);
      setVideoBrackets(
        currentVideo?.lessonSubSubjects?.map((item) => ({
          bracketTime: item?.bracketTime,
          header: item?.lessonSubSubject?.name,
          lessonSubSubjectId: item?.lessonSubSubject?.id,
        })),
      );

      form.setFields(
        currentVideo?.lessonSubSubjects?.map((item, index) => ({
          name: ['videoBrackets', index, 'bracketTime'],
          value: item?.bracketTime,
        })),
      );

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
    form.resetFields(['lessonId', 'lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    setCurrentLessonId(value);
    form.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    setCurrentUnitId(value);
    form.resetFields(['lessonSubjectId', 'lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    setCurrentLessonSubjectId(value);
    form.resetFields(['lessonSubSubjects', 'videoBrackets']);
    setVideoBrackets([]);
  };

  const onLessonSubSubjectsSelect = (_, option) => {
    setVideoBrackets((prev) => [
      ...prev,
      { bracketTime: '', header: option?.children, lessonSubSubjectId: option?.value },
    ]);
  };

  const onLessonSubSubjectsDeselect = (_, option) => {
    const filteredVideoBrackets = videoBrackets.filter((item) => item.lessonSubSubjectId !== option.value);
    setVideoBrackets(filteredVideoBrackets);
    form.resetFields(['videoBrackets']);
    form.setFields(
      filteredVideoBrackets.map((item, index) => ({
        name: ['videoBrackets', index, 'bracketTime'],
        value: item?.bracketTime,
      })),
    );
    form.setFields(
      filteredVideoBrackets.map((item, index) => ({
        name: ['videoBrackets', index, 'lessonSubSubjectId'],
        value: item?.lessonSubSubjectId,
      })),
    );
  };

  const onBracketTimeValueChange = (e, index) => {
    setVideoBrackets((prev) => prev.map((item, i) => (index === i ? { ...item, bracketTime: e.target.value } : item)));
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
            ?.filter((item) => item.lessonId === currentLessonId)
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
            ?.filter((item) => item.lessonUnitId === currentUnitId)
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
        <CustomSelect
          onSelect={onLessonSubSubjectsSelect}
          onDeselect={onLessonSubSubjectsDeselect}
          showArrow
          mode="multiple"
          placeholder="Alt Başlık"
        >
          {lessonSubSubjects
            ?.filter((item) => item.lessonSubjectId === currentLessonSubjectId)
            .map((item) => {
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
                <CustomMaskInput onChange={(e) => onBracketTimeValueChange(e, index)} mask={'999:99'}>
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
