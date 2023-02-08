import { Form } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import TableFilter from '../../../components/TableFilter';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import { turkishToLower } from '../../../utils/utils';

const QuestionDifficultyFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = (state) => state?.difficultyLevelQuestionOfExams;
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const {
    classroomId,
    setClassroomId,
    setLessonId,
    setUnitId,
    setLessonSubjectId,
    allClassList,
    lessonId,
    unitId,
    lessonSubjectId,
  } = useAcquisitionTree(true);

  const onFinish = useCallback(
    async (values) => {
      for (const [key, value] of Object.entries(values)) {
        values[key] = [value];
      }
      console.log(values);

      //   console.log(values);
      //   try {
      //     const action = await dispatch(
      //       getByFilterPagedOrganisations({ ...organisationDetailSearch, pageNumber: 1, body: values }),
      //     ).unwrap();

      //     if (action?.data?.items?.length === 0) {
      //       warningDialog({
      //         title: <Text t="error" />,
      //         message: 'Aradığınız kriterler uygun bilgiler bulunmamaktadır.',
      //       });
      //     }
      //   } catch (e) {
      //     console.log(e);
      //   }
    },
    [dispatch],
  );

  const reset = async () => {
    setClassroomId();
    setLessonId();
    setUnitId();
    setLessonSubjectId();
    // await dispatch(getByFilterPagedOrganisations({ ...organisationDetailSearch, pageNumber: 1, body: {} }));
  };
  const tableFilterProps = { onFinish, reset, state, extra: [form] };

  const onClassroomChange = (value) => {
    setClassroomId(value);
    form.resetFields(['LessonIds', 'LessonUnitIds', 'LessonSubjectIds', 'LessonSubSubjectIds']);
  };

  const onLessonChange = (value) => {
    setLessonId(value);
    form.resetFields(['LessonUnitIds', 'LessonSubjectIds', 'LessonSubSubjectIds']);
  };
  const onUnitChange = (value) => {
    setUnitId(value);
    form.resetFields(['LessonSubjectIds', 'LessonSubSubjectIds']);
  };

  const onLessonSubjectsChange = (value) => {
    setLessonSubjectId(value);
    form.resetFields(['LessonSubSubjectIds']);
  };
  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Sınıf Seviyesi" name="classroomIds">
          <CustomSelect showSearch onChange={onClassroomChange} placeholder="Sınıf Seviyesi">
            {allClassList?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem tooltip={'Öncelikle sınıf seviyesi seçimi yapınız'} label="Ders" name="lessonIds">
          <CustomSelect
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            showArrow
            showSearch
            placeholder="Ders"
            disabled={!classroomId}
            onChange={onLessonChange}
          >
            {lessons
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

        <CustomFormItem label="Ünite" name="unitIds" tooltip={'Öncelikle  ders seçimi yapınız'}>
          <CustomSelect
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            showArrow
            showSearch
            placeholder="Ünite"
            disabled={!lessonId}
            onChange={onUnitChange}
          >
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

        <CustomFormItem label="Konu" name="subjectIds" tooltip={'Öncelikle ünite seçimi yapınız'}>
          <CustomSelect
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            showArrow
            showSearch
            placeholder="Konu"
            disabled={!unitId}
            onChange={onLessonSubjectsChange}
          >
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

        <CustomFormItem label="Kazanım" name="subSubjectIds" tooltip={'Öncelikle konu seçimi yapınız'}>
          <CustomSelect
            filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
            showArrow
            showSearch
            disabled={!lessonSubjectId}
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
      </div>
    </TableFilter>
  );
};

export default QuestionDifficultyFilter;
