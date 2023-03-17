import { Form, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, CustomPageHeader, errorDialog, successDialog, Text } from '../../../components';
import '../../../styles/workPlanManagement/addWorkPlan.scss';
import SubjectChoose from './subject';
import EvaluationTest from './evaluation';
import OutQuestion from './outQuestions';
import PracticeQuestion from './practiceQuestion';
import { useHistory, useLocation } from 'react-router-dom';
import {
  addWorkPlan, onChangeActiveKey,
  resetAllData, setSubjectChooseData, setSubjectChooseFilterData,
} from '../../../store/slice/workPlanSlice';
import useAcquisitionTree from '../../../hooks/useAcquisitionTree';

const EditWorkPlan = () => {
  const { TabPane } = Tabs;

  const [subjectForm] = Form.useForm();
  const [outQuestionForm] = Form.useForm();
  const [practiceForm] = Form.useForm();

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const showData = location?.state?.data;
  const [currentData, setCurrentData] = useState(showData);
  const [isExit, setIsExit] = useState(false);
  const [count, setCount] = useState(0);

  console.log('showData :>> ', showData);
  const { classroomId, setClassroomId, lessonId, setLessonId, unitId, setUnitId } =
    useAcquisitionTree();
  const {
    activeKey,
    subjectChooseTab,
    evaluationTab,
    outQuestionTab,
    practiceQuestionTab,
  } = useSelector((state) => state?.workPlan);

  useEffect(() => {
    console.log('showData',showData)
    console.log('subjectChooseTab',subjectChooseTab)
    console.log('evaluationTab',evaluationTab)
    console.log('outQuestionTab',outQuestionTab)
    console.log('practiceQuestionTab',practiceQuestionTab)
    }, [
      subjectChooseTab,
      evaluationTab,
      outQuestionTab,
      practiceQuestionTab,
    ],
  );

  useEffect(async () => {
    if (Object.keys(currentData).length > 0) {
      if(currentData.publishStatus ===3) {
        await setClassroomId(currentData.classroomId);
        await setLessonId(currentData.lessonId);
        await setUnitId(currentData.lessonUnitId);

        await subjectForm.setFieldsValue({
          educationYear: currentData.recordStatus === 1 ? currentData.educationYearId : undefined,
          ClassroomId: currentData.classroomId,
          LessonIds: currentData.lessonId,
          LessonUnitIds: currentData.lessonUnitId,
          LessonSubjectIds: currentData.lessonSubjectId,
        });
        const values = await subjectForm.validateFields(['ClassroomId', 'LessonIds', 'LessonUnitIds', 'LessonSubjectIds']);
        debugger
        dispatch(setSubjectChooseFilterData(values));

        showData.activeKey && dispatch(onChangeActiveKey(showData.activeKey));
      }
    }
    }, [currentData,subjectForm],
  );
  useEffect(() => {
    const unblock = history.block((location) => {
      if (isExit) {
        return true;
      }

      // Konu seçimi sekmesinde ise
      if (activeKey === '0') {
        confirmDialog({
          title: <Text t='attention' />,
          htmlContent: 'Taslak olarak kaydetmeden çıkmak istediğinize emin misinizs?',
          okText: 'Evet',
          cancelText: 'Hayır',
          onOk: async () => {
            setIsExit(true);
            await console.log('kaydedilmedi...');
            await dispatch(resetAllData());
            history.push(location.pathname);
          },
          onCancel: async () => {
            setCount(count + 1);

            try {
              setIsExit(true);

              console.log('evaluationTab', evaluationTab);
              console.log('outQuestionTab', outQuestionTab);
              console.log('practiceQuestionTab', practiceQuestionTab);
              const values = await subjectForm.validateFields();
              if (Object.keys(subjectChooseTab.selectedRowVideo).length === 0) {
                throw 'deneme';
              }
              console.log('val', values);
              await saveDrafted(location.pathname);

            } catch (e) {
              setIsExit(false);

              errorDialog({
                title: <Text t='error' />,
                message: 'Eğitim Öğretim Yılı seçimi ve video seçimlerini yapmalısınız',
              });
            }

          },
        });

        unblock();
      }
      // Konu seçimi sekmesi dışında ise
      else if (activeKey !== '0') {
        confirmDialog({
          title: <Text t='attention' />,
          htmlContent: 'Taslak olarak kaydetmeden çıkmak istediğinize emin misiniz?',
          okText: 'Evet',
          cancelText: 'Hayır',
          onOk: async () => {
            setIsExit(true);
            await dispatch(resetAllData());
            history.push(location.pathname);
          },
          onCancel: async () => {
            setIsExit(true);
            await saveDrafted(location.pathname);
          },
        });

        unblock();
      } else {
        return true;
      }

      return false;
    });

    return unblock;
  }, [
    activeKey,
    history,
    count,
    isExit,
    subjectChooseTab,
    evaluationTab,
    practiceQuestionTab,
    outQuestionTab,
  ]);

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  });

  const alertUser = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const saveDrafted = async (locationPathName) => {
    const body = {
      workPLan: {
        activeKey,
        videoId: subjectChooseTab.selectedRowVideo.id,
        publishStatus: 3,
        classroomId: subjectChooseTab.filterObject.ClassroomId,
        lessonUnitId: subjectChooseTab.filterObject.LessonUnitIds,
        lessonSubjectId: subjectChooseTab.filterObject.LessonSubjectIds,
        lessonId: subjectChooseTab.filterObject.LessonIds,
        educationYearId: subjectChooseTab.formData.educationYear,
        workPlanQuestionOfExams: [],
        workPlanVideos: [],
        workPlanLessonSubSubjects: [],
      },
    };

    if (activeKey === '2') {
      body.workPLan.asEvId = evaluationTab.selectedRowData.id;
    }

    if (activeKey === '3') {
      body.workPLan.asEvId = evaluationTab.selectedRowData.id;
      let arrData = [];

      outQuestionTab?.selectedRowsData.map((item) => {
        arrData.push({ questionOfExamId: item.id });
      });

      body.workPLan.workPlanQuestionOfExams = arrData;
    }

    if (activeKey === '4') {
      body.workPLan.asEvId = evaluationTab.selectedRowData.id;
      let arrOutQuestion = [];
      let arrData = [];

      outQuestionTab?.selectedRowsData.map((item) => {
        arrOutQuestion.push({ questionOfExamId: item.id });
      });

      body.workPLan.workPlanQuestionOfExams = arrOutQuestion;

      practiceQuestionTab?.selectedRowsVideo.map((item) => {
        arrData.push({ videoId: item.id });
      });

      body.workPLan.workPlanVideos = arrData;
    }

    const action = await dispatch(addWorkPlan(body));
    if (addWorkPlan?.fulfilled?.match(action)) {
      successDialog({
        title: <Text t='successfullySent' />,
        message: action.payload?.message,
        onOk: async () => {
          await dispatch(resetAllData());
          history.push(locationPathName);
        },
      });
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: action.payload?.message,
      });
    }
  };

  return (
    <CustomPageHeader title='Çalışma Planı Güncelle' showBreadCrumb routes={['Çalışma Planları']}>
      <div className='add-work-plan-wrapper'>
        <Tabs
          type='card'
          activeKey={activeKey}
          onTabClick={(newKey, e) => {
            const isTriggeredByClick = e;
            if (isTriggeredByClick) return;
          }}
        >
          <TabPane tab='Konu Seçimi' key='0'>
            <SubjectChoose subjectForm={subjectForm} outQuestionForm={outQuestionForm} practiceForm={practiceForm} isEdit={true} />
          </TabPane>
          {/*<TabPane tab='Pekiştirme Test Ekleme' key='1'>*/}
          {/*  <ReinforcementTest />*/}
          {/*</TabPane>*/}
          <TabPane tab='Ölçme ve Değerlendirme Testi Ekleme' key='2'>
            <EvaluationTest setIsExit={setIsExit} />
          </TabPane>
          <TabPane tab='Çıkmış Soru Ekleme' key='3'>
            <OutQuestion outQuestionForm={outQuestionForm} />
          </TabPane>
          <TabPane tab='Alıştırma Sorusu Ekleme' key='4'>
            <PracticeQuestion subjectForm={subjectForm} outQuestionForm={outQuestionForm} practiceForm={practiceForm}
                              setIsExit={setIsExit} />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default EditWorkPlan;
