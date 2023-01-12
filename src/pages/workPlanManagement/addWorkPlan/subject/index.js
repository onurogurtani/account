import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomForm, CustomFormItem, CustomSelect, CustomTable, Option } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/workPlanSlice';
import { getEducationYears } from '../../../../store/slice/questionFileSlice';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import useAcquisitionTree from '../../../../hooks/useAcquisitionTree';
import { getByFilterPagedVideos } from '../../../../store/slice/videoSlice';
import videoListTableColumn from './videoListTableColumn';

const SubjectChoose = ({ sendValue }) => {

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const columns = videoListTableColumn();

  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId, lessonSubjectId, setLessonSubjectId } =
    useAcquisitionTree();

  const { educationYears } = useSelector((state) => state?.questionManagement);
  const { allClassList } = useSelector((state) => state?.classStages);
  const { lessons } = useSelector((state) => state?.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const { videos, tableProperty, filterObject } = useSelector((state) => state?.videos);


  useEffect(() => {
    dispatch(getEducationYears());
    dispatch(getAllClassStages());
  }, []);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className='go-button'>Git</CustomButton>,
    },
    position: 'bottomRight',
    total: tableProperty?.totalCount,
    current: tableProperty?.currentPage,
    pageSize: tableProperty?.pageSize,
  };

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
  const onFinish = (values) => {
    console.log('values', values);
    sendValue(values);
    dispatch(onChangeActiveKey('1'));
  };

  // filter search videolist
  const handleSearchVideo = async () => {
    const values = await form.validateFields(['ClassroomId', 'LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
    console.log(values);

    const body = {
      ...filterObject,
      ...values,
      PageNumber: 1,
    };
    await dispatch(getByFilterPagedVideos(body));
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
            dataSource={videos}
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
