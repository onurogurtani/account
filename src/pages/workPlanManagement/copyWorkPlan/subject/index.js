import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomSelect,
  CustomTable,
  errorDialog,
  Option, Text,
} from '../../../../components';
import {
  onChangeActiveKey,
  selectedSubjectTabRowVideo, setSubjectChooseData,
  setSubjectChooseVideoFilteredList, setSubjectChooseFilterData, resetSubjectChooseVideoList,
  resetPracticeQuestionVideoList,
  selectedPracticeQuestionTabRowsVideo, setOutQuestionTabLessonSubSubjectList, resetOutQuestionTabVideoList,
  selectedOutQuestionTabRowsData,
  setSubjectChooseSchoolLevel,
  selectedEvaluationTabRowData,
  resetEvaluationDataList,
  resetEvaluationQuestionList, getUsedVideoIdsQuery, getActiveEducationYear, setIsEdited,
} from '../../../../store/slice/workPlanSlice';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import videoListTableColumn from '../../addWorkPlan/subject/videoListTableColumn';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';
import '../../../../styles/table.scss';
import { resetLessonSubSubjects } from '../../../../store/slice/lessonSubSubjectsSlice';

const SubjectChoose = ({ subjectForm, outQuestionForm, practiceForm }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const showData = location?.state?.data;
  const [currentData, setCurrentData] = useState(showData);

  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId } =
    useAcquisitionTree();

  const {
    activeKey,
    educationYearsList,
    subjectChooseTab,
    usedVideoIdsQueryListData,
  } = useSelector((state) => state?.workPlan);
  const { allClassList } = useSelector((state) => state?.classStages);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const columns = videoListTableColumn(dispatch, subjectChooseTab, usedVideoIdsQueryListData);

  const paginationSetFilteredVideoList = (res) => {
    dispatch(setSubjectChooseVideoFilteredList(res?.payload));
  };

  const onChangeTable = useOnchangeTable({
    filterObject: subjectChooseTab?.filterObject,
    action: getByFilterPagedVideos,
    callback: paginationSetFilteredVideoList,
  });


  useEffect(() => {
    dispatch(getActiveEducationYear());
    dispatch(resetSubjectChooseVideoList());
  }, []);

  useEffect(() => {
      if (Object.keys(showData).length > 0) {
        setClassroomId(showData.classroomId);
        setLessonId(showData.lessonId);
        setUnitId(showData.lessonUnitId);
      }
    }, [],
  );

  useEffect(async () => {
      if (activeKey === '0') {
        const educationYearVal = await subjectForm.getFieldValue(['educationYear']);
        await setClassroomId(currentData.classroomId);
        await setLessonId(currentData.lessonId);
        await setUnitId(currentData.lessonUnitId);

        await subjectForm.setFieldsValue({
          educationYear: educationYearVal ? educationYearVal : currentData.recordStatus === 1 ? currentData.educationYearId : undefined,
          ClassroomId: currentData.classroomId,
          LessonIds: currentData.lessonId,
          LessonUnitIds: currentData.lessonUnitId,
          LessonSubjectIds: currentData.lessonSubjectId,
        });

        dispatch(setIsEdited(true));
        const values = await subjectForm.getFieldsValue(['ClassroomId', 'LessonIds', 'LessonUnitIds', 'LessonSubjectIds', 'educationYear']);
        dispatch(setSubjectChooseData(values));
        dispatch(selectedEvaluationTabRowData({ id: currentData.asEvId }));
        currentData.workPlanQuestionOfExams?.forEach((item) => {
          dispatch(selectedOutQuestionTabRowsData(item.questionOfExam));
        });
        currentData.workPlanVideos?.forEach((item) => {
          dispatch(selectedPracticeQuestionTabRowsVideo(item.video));
        });
        await handleSearchVideo('edit');
        // showData?.activeKey && dispatch(onChangeActiveKey(showData?.activeKey));

      }
    }, [currentData, subjectForm],
  );

  // table pagination
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className='go-button'>Git</CustomButton>,
    },
    position: 'bottomRight',
    total: subjectChooseTab?.tableProperty?.totalCount,
    current: subjectChooseTab?.tableProperty?.currentPage,
    pageSize: subjectChooseTab?.tableProperty?.pageSize,
  };

  // selects onchange
  const onChange = (value, fromEl) => {
    if (fromEl === 'classroomId') {

      allClassList.map((item) => {
        if (item.id === value) {
          dispatch(setSubjectChooseSchoolLevel(item.schoolLevel));
        }
      });
      setClassroomId(value);
      subjectForm.resetFields(['LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
    }
    if (fromEl === 'lessonId') {
      setLessonId(value);
      subjectForm.resetFields(['LessonUnitIds', 'LessonSubjectIds']);
    }
    if (fromEl === 'lessonUnitId') {
      setUnitId(value);
      subjectForm.resetFields(['LessonSubjectIds']);
    }
  };

  // next step
  const onFinish = async (values) => {

    dispatch(setSubjectChooseData(values));

    if (Object.keys(subjectChooseTab.selectedRowVideo).length > 0) {
      dispatch(onChangeActiveKey('2'));
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: 'Lütfen video seçiniz.',
      });
    }
  };

  // filter search videolist
  const handleSearchVideo = async (from) => {
    const values = await subjectForm.validateFields(['ClassroomId', 'LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
    dispatch(selectedSubjectTabRowVideo({}));
    if (from === '') {
      dispatch(selectedPracticeQuestionTabRowsVideo());
      dispatch(resetPracticeQuestionVideoList());
      dispatch(setOutQuestionTabLessonSubSubjectList());
      dispatch(resetOutQuestionTabVideoList());
      dispatch(selectedOutQuestionTabRowsData());
      dispatch(resetLessonSubSubjects());
      dispatch(selectedEvaluationTabRowData({}));
      dispatch(resetEvaluationDataList());
      dispatch(resetEvaluationQuestionList());
      dispatch(setIsEdited(false));

      practiceForm.resetFields();
      outQuestionForm.resetFields();
    }

    let data = {
      ...values,
      isActive: true,
      CategoryCode: 'lectureVideo',
    };

    dispatch(setSubjectChooseFilterData(data));

    const body = {
      ...data,
      PageNumber: 1,
    };

    const action = await dispatch(getByFilterPagedVideos(body));
    if (getByFilterPagedVideos?.fulfilled?.match(action)) {
      await dispatch(setSubjectChooseVideoFilteredList(action?.payload));
      await dispatch(getUsedVideoIdsQuery());
      if (from === 'edit') {
        dispatch(selectedSubjectTabRowVideo(currentData.video));
      }
    }
  };

  return (
    <>
      <CustomForm
        autoComplete='off'
        layout='horizontal'
        className='subject-choose-add-form'
        form={subjectForm}
        name='form'
        onFinish={onFinish}
      >

        <CustomFormItem
          label='Eğitim Öğretim Yılı Seçimi'
          name='educationYear'
          rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          ]}
        >
          <CustomSelect
            height={36}
            allowClear
            placeholder='Seçiniz'
          >
            {educationYearsList.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.startYear} - {item.endYear}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <div className='filter-content'>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label='Sınıf Seviyesi Seçimi'
            name='ClassroomId'
          >
            <CustomSelect
              onChange={(val) => onChange(val, 'classroomId')}
              placeholder='Sınıf Seviyesi'
              height={36}
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

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label='Ders Seçimi'
            name='LessonIds'
          >
            <CustomSelect
              height={36}
              onChange={(val) => onChange(val, 'lessonId')}
              placeholder='Ders'
            >
              {lessons
                ?.filter((item) => item.classroomId === classroomId && item.isActive === true)
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
            label='Ünite Seçimi'
            name='LessonUnitIds'
          >
            <CustomSelect
              height={36}
              onChange={(val) => onChange(val, 'lessonUnitId')}
              placeholder='Ünite'
            >
              {lessonUnits
                ?.filter((item) => item.lessonId === lessonId && item.isActive === true)
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
            label='Konu Seçimi'
            name='LessonSubjectIds'
          >
            <CustomSelect
              height={36}
              onChange={(val) => onChange(val, 'lessonSubjectId')}
              placeholder='Konu'
            >
              {lessonSubjects
                ?.filter((item) => item.lessonUnitId === unitId && item.isActive === true)
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <div className='search-btn-content'>
            <CustomButton type='primary' className='search-btn' onClick={() => handleSearchVideo('')}>
              Videoları Listele
            </CustomButton>
          </div>
        </div>


        <div className='video-list-content'>
          <CustomTable
            dataSource={subjectChooseTab?.videos}
            onChange={onChangeTable}
            columns={columns}
            pagination={paginationProps}
            rowKey={(record) => `video-list-${record?.id || record?.headText}`}
            scroll={{ x: false }}
          />
        </div>

        <div className='subject-choose-add-form-footer form-footer'>
          <CustomButton type='primary' onClick={() => history.push('/work-plan-management/list')} className='back-btn'>
            Geri
          </CustomButton>

          <CustomButton type='primary' onClick={() => subjectForm.submit()} className='next-btn'>
            İlerle
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default SubjectChoose;
