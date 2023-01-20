import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
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
  selectedPracticeQuestionTabRowsVideo,
} from '../../../../store/slice/workPlanSlice';
import { getEducationYears } from '../../../../store/slice/questionFileSlice';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import videoListTableColumn from './videoListTableColumn';
import useOnchangeTable from '../../../../hooks/useOnchangeTable';
import '../../../../styles/table.scss';

const SubjectChoose = ({ sendValue }) => {

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId } =
    useAcquisitionTree();

  const { subjectChooseTab } = useSelector((state) => state?.workPlan);
  const { educationYears } = useSelector((state) => state?.questionManagement);
  const { allClassList } = useSelector((state) => state?.classStages);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const columns = videoListTableColumn(dispatch, subjectChooseTab);

  const paginationSetFilteredVideoList = (res) => {
    dispatch(setSubjectChooseVideoFilteredList(res?.payload));
  };

  const onChangeTable = useOnchangeTable({
    filterObject: subjectChooseTab?.filterObject,
    action: getByFilterPagedVideos,
    callback: paginationSetFilteredVideoList,
  });


  useEffect(() => {
    dispatch(getEducationYears());
    dispatch(getAllClassStages());
    dispatch(resetSubjectChooseVideoList());
  }, []);

  // table pagination
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className='go-button'>Git</CustomButton>,
    },
    position: 'bottomRight',
    total: subjectChooseTab?.tableProperty?.totalCount,
    current: subjectChooseTab?.tableProperty?.currentPage,
    pageSize: 2,
  };

  // selects onchange
  const onChange = (value, fromEl) => {
    if (fromEl === 'classroomId') {
      setClassroomId(value);
      form.resetFields(['LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
    }
    if (fromEl === 'lessonId') {
      setLessonId(value);
      form.resetFields(['LessonUnitIds', 'LessonSubjectIds']);
    }
    if (fromEl === 'lessonUnitId') {
      setUnitId(value);
      form.resetFields(['LessonSubjectIds']);
    }
  };

  // next step
  const onFinish = async (values) => {

    dispatch(setSubjectChooseData(values));

    if (Object.keys(subjectChooseTab.selectedRowVideo).length > 0) {
      dispatch(onChangeActiveKey('1'));
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: 'Lütfen video seçiniz.',
      });
    }
  };

  // filter search videolist
  const handleSearchVideo = async () => {
    const values = await form.validateFields(['ClassroomId', 'LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
    console.log('search video filter', values);

    dispatch(selectedSubjectTabRowVideo({}));
    dispatch(selectedPracticeQuestionTabRowsVideo([]));
    dispatch(resetPracticeQuestionVideoList());
    dispatch(setSubjectChooseData(values));

    let data = {
      ...values,
      isActive: true,
      CategoryCode: 'lectureVideo',
    };
    dispatch(setSubjectChooseFilterData(data));
    console.log('subjectChooseTab.filterObject', subjectChooseTab.filterObject);

    const body = {
      ...data,
      PageNumber: 1,
    };

    const action = await dispatch(getByFilterPagedVideos(body));
    if (getByFilterPagedVideos?.fulfilled?.match(action)) {
      await dispatch(setSubjectChooseVideoFilteredList(action?.payload));

      console.log('subjectChooseTab.videos', subjectChooseTab.videos);
    }
  };

  return (
    <>
      <CustomForm
        autoComplete='off'
        layout='horizontal'
        className='subject-choose-add-form'
        form={form}
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
            {educationYears.map((item) => {
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
            label='Ünite Seçimi'
            name='LessonUnitIds'
          >
            <CustomSelect
              height={36}
              onChange={(val) => onChange(val, 'lessonUnitId')}
              placeholder='Ünite'
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

          <div className='search-btn-content'>
            <CustomButton type='primary' className='search-btn' onClick={handleSearchVideo}>
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

          <CustomButton type='primary' onClick={() => form.submit()} className='next-btn'>
            İlerle
          </CustomButton>
        </div>
      </CustomForm>

    </>
  );
};

export default SubjectChoose;
