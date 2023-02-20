import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import TableFilter from '../../../components/TableFilter';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';
import {
  getByPagedListDifficultyLevelQuestionOfExam,
  setfilterLevel,
} from '../../../store/slice/difficultyLevelQuestionOfExamSlice';
import { turkishToLower } from '../../../utils/utils';

const QuestionDifficultyFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = (state) => state?.difficultyLevelQuestionOfExams;
  const { difficultyLevelQuestionOfExamDetailSearch } = useSelector((state) => state.difficultyLevelQuestionOfExams);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
  const [selectedFilterLevel, setSelectedFilterLevel] = useState({ acquisitionTree: {}, key: '' });
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

  useEffect(() => {
    return () => {
      dispatch(setfilterLevel(''));
    };
  }, []);

  const createFilterText = () => {
    const { acquisitionTree } = selectedFilterLevel;
    let text = '';
    if (acquisitionTree.classroom) {
      text += acquisitionTree.classroom;
    } else {
      return text;
    }
    if (acquisitionTree.lesson) {
      text += ' ' + acquisitionTree.lesson + ' Dersi';
    } else {
      return text + 'ne göre filtrelenmiştir';
    }
    if (acquisitionTree.unit) {
      text += ' ' + acquisitionTree.unit + ' Ünitesi';
    } else {
      return text + 'ne göre filtrelenmiştir';
    }
    if (acquisitionTree.subject) {
      text += ' ' + acquisitionTree.subject + ' Konusu';
    } else {
      return text + 'ne göre filtrelenmiştir';
    }
    if (acquisitionTree.subSubject) {
      text += ' ' + acquisitionTree.subSubject + ' Kazanımına göre filtrelenmiştir';
    } else {
      return text + 'na göre filtrelenmiştir';
    }
  };

  const onFinish = async (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        values[key] = [value];
      }
    }
    await dispatch(
      getByPagedListDifficultyLevelQuestionOfExam({
        ...difficultyLevelQuestionOfExamDetailSearch,
        pagination: { ...difficultyLevelQuestionOfExamDetailSearch.pagination, pageNumber: 1 },
        body: values,
      }),
    );
    dispatch(setfilterLevel({ ...selectedFilterLevel, text: createFilterText() }));
  };

  const reset = async () => {
    setClassroomId();
    setLessonId();
    setUnitId();
    setLessonSubjectId();
    await dispatch(
      getByPagedListDifficultyLevelQuestionOfExam({
        ...difficultyLevelQuestionOfExamDetailSearch,
        pagination: { ...difficultyLevelQuestionOfExamDetailSearch.pagination, pageNumber: 1 },
        body: {},
      }),
    );
    dispatch(setfilterLevel(''));
  };
  const tableFilterProps = { onFinish, reset, state, extra: [form] };

  function containsOnlyNumbers(str) {
    if (/^\d+$/.test(str)) {
      return str + '. Sınıf seviyesi';
    }
    return str + ' Sınıf seviyesi';
  }

  const onClassroomChange = (value, option) => {
    setClassroomId(value);
    setSelectedFilterLevel({
      key: value ? 'lessonId' : '',
      acquisitionTree: {
        ...selectedFilterLevel?.acquisitionTree,
        classroom: option?.children && containsOnlyNumbers(option?.children),
      },
    });
    form.resetFields(['lessonIds', 'unitIds', 'subjectIds', 'subSubjectIds']);
  };

  const onLessonChange = (value, option) => {
    setLessonId(value);
    setSelectedFilterLevel({
      key: value ? 'unitId' : 'lessonId',
      acquisitionTree: {
        ...selectedFilterLevel?.acquisitionTree,
        lesson: option?.children,
      },
    });
    form.resetFields(['unitIds', 'subjectIds', 'subSubjectIds']);
  };
  const onUnitChange = (value, option) => {
    setUnitId(value);
    setSelectedFilterLevel({
      key: value ? 'subjectId' : 'unitId',
      acquisitionTree: {
        ...selectedFilterLevel?.acquisitionTree,
        unit: option?.children,
      },
    });
    form.resetFields(['subjectIds', 'subSubjectIds']);
  };

  const onLessonSubjectsChange = (value, option) => {
    setLessonSubjectId(value);
    setSelectedFilterLevel({
      key: value ? 'subSubjectId' : 'subjectId',
      acquisitionTree: {
        ...selectedFilterLevel?.acquisitionTree,
        subject: option?.children,
      },
    });
    form.resetFields(['subSubjectIds']);
  };
  const onLessonSubSubjectsChange = (value, option) => {
    setSelectedFilterLevel({
      key: value ? 'subSubjectId' : '',
      acquisitionTree: {
        ...selectedFilterLevel?.acquisitionTree,
        subSubject: option?.children,
      },
    });
  };
  return (
    <TableFilter {...tableFilterProps}>
      <div className="form-item">
        <CustomFormItem label="Sınıf Seviyesi" name="classroomIds">
          <CustomSelect allowClear showSearch onChange={onClassroomChange} placeholder="Sınıf Seviyesi">
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
            allowClear
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
            allowClear
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
            allowClear
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
            allowClear
            disabled={!lessonSubjectId}
            onChange={onLessonSubSubjectsChange}
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
