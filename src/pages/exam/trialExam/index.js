import { Form, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomCheckbox,
  CustomCollapseCard,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomPageHeader,
  CustomSelect,
  Option,
} from '../../../components';
import { getAllClassStages } from '../../../store/slice/classStageSlice';
import { getLessonsQuesiton } from '../../../store/slice/lessonsSlice';
import { getLessonSubjectsList } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjectsList } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnitsList } from '../../../store/slice/lessonUnitsSlice';
import { getTrialTypeList } from '../../../store/slice/trialTypeSlice';
import '../../../styles/exam/trialExam.scss';
import { dateFormat } from '../../../utils/keys';

const TrialExam = () => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState('0');
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { trialTypeList } = useSelector((state) => state.trialType);
  const { allClassList } = useSelector((state) => state.classStages);
  const { lessons } = useSelector((state) => state.lessons);
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const disabledEndDate = useCallback(
    (endValue) => {
      const { startDate } = form?.getFieldsValue(['startDate']);
      return endValue?.startOf('day') <= startDate?.startOf('day');
    },
    [form],
  );
  const isTheEndYearEqualToTheYearOfTheEndDate = useCallback(
    async (field, value) => {
      const { endYear } = form?.getFieldsValue(['endYear']);
      try {
        if (!endYear || value?.$y === endYear) {
          return Promise.resolve();
        }
        return Promise.reject(new Error());
      } catch (e) {
        return Promise.reject(new Error());
      }
    },
    [form],
  );

  useEffect(() => {
    dispatch(getTrialTypeList({ testExamTypeDetailSearch: { pageNumber: 1, pageSize: 200 } }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllClassStages());
  }, [dispatch]);

  return (
    <div className=" trial-exam-add">
      <CustomPageHeader>
        <CustomCollapseCard cardTitle={'Deneme Sınavı Ekle'}>
          <div className="trial-exam-add-content">
            <Tabs
              onChange={(e) => {
                setActiveKey(e);
              }}
              activeKey={activeKey}
            >
              <TabPane tab="Genel Bilgiler" key={'0'}>
                <CustomForm form={form} className="form">
                  <CustomFormItem name={'testExamTypeId'} label="Deneme Türü">
                    <CustomSelect>
                      {trialTypeList?.items?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'name'} label="Sınav Adı">
                    <CustomInput />
                  </CustomFormItem>
                  <CustomFormItem name={'classroomId'} label="Sınıf">
                    <CustomSelect>
                      {allClassList?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'difficulty'} label="Zorluk">
                    <CustomSelect
                      options={[
                        {
                          value: '1',
                          label: '1',
                        },
                        {
                          value: '2',
                          label: '2',
                        },
                        {
                          value: '3',
                          label: '3',
                        },
                        {
                          value: '4',
                          label: '4',
                        },
                        {
                          value: '5',
                          label: '5',
                        },
                      ]}
                    />
                  </CustomFormItem>
                  <CustomFormItem name={'startDate'} label="Başlangıç Tarihi">
                    <CustomDatePicker />
                  </CustomFormItem>
                  <CustomFormItem
                    rules={[
                      { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                      {
                        validator: isTheEndYearEqualToTheYearOfTheEndDate,
                        message: 'Lütfen tarihleri kontrol ediniz.',
                      },
                    ]}
                    name={'finishDate'}
                    label="Bitiş Tarihi"
                  >
                    <CustomDatePicker disabledDate={disabledEndDate} format={dateFormat} />
                  </CustomFormItem>
                  <CustomFormItem name={'dependLecturingVideo'}>
                    <CustomCheckbox>Konu anlatım vidosunda bağlı oluştur</CustomCheckbox>
                  </CustomFormItem>
                  <CustomFormItem name={'classId'} label="Sınıf">
                    <CustomSelect
                      onChange={(e) => {
                        dispatch(getLessonsQuesiton([{ field: 'classroomId', value: e, compareType: 0 }]));
                      }}
                    >
                      {allClassList?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'lessonId'} label="Ders">
                    <CustomSelect
                      onChange={(e) => {
                        dispatch(getUnitsList([{ field: 'lessonId', value: e, compareType: 0 }]));
                      }}
                    >
                      {lessons?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'lessonUnitId'} label="Ünite">
                    <CustomSelect
                      onChange={(e) => {
                        dispatch(getLessonSubjectsList([{ field: 'lessonUnitId', value: e, compareType: 0 }]));
                      }}
                    >
                      {lessonUnits?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'lessonSubjectId'} label="Konu">
                    <CustomSelect
                      onChange={(e) => {
                        dispatch(getLessonSubSubjectsList([{ field: 'lessonSubjectId', value: e, compareType: 0 }]));
                      }}
                    >
                      {lessonSubjects?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                  <CustomFormItem name={'lessonSubSubjectId'} label="Alt Başlık">
                    <CustomSelect
                      onChange={(e) => {
                        //   dispatch(getLessonSubSubjectsList([{ field: 'lessonSubSubjectId', value: e, compareType: 0 }]));
                      }}
                    >
                      {lessonSubSubjects?.map((item, index) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </CustomSelect>
                  </CustomFormItem>
                </CustomForm>
              </TabPane>
              <TabPane tab="Soru Seçimi" key={'1'}>
                sadasdasda
              </TabPane>
            </Tabs>
          </div>
        </CustomCollapseCard>
      </CustomPageHeader>
    </div>
  );
};

export default TrialExam;
