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
  addWorkPlan,
  resetAllData,
} from '../../../store/slice/workPlanSlice';

const CopyWorkPlan = () => {
  const { TabPane } = Tabs;

  const [subjectForm] = Form.useForm();
  const [outQuestionForm] = Form.useForm();
  const [practiceForm] = Form.useForm();

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const showData = location?.state?.data;
  const [isExit, setIsExit] = useState(false);
  const [count, setCount] = useState(0);

  console.log('showData :>> ', showData);
  const {
    activeKey,
    subjectChooseTab,
    evaluationTab,
    outQuestionTab,
    practiceQuestionTab,
  } = useSelector((state) => state?.workPlan);

  useEffect(() => {
    const unblock = history.block((location) => {
      if (isExit) {
        return true;
      }

      // Konu seçimi sekmesinde ise
      if (activeKey === '0') {
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
            setCount(count + 1);

            try {
              setIsExit(true);
              if (Object.keys(subjectChooseTab.selectedRowVideo).length === 0) {
                throw 'error';
              }
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
        asEvId: evaluationTab.selectedRowData.id,
        workPlanQuestionOfExams: [],
        workPlanVideos: [],
        workPlanLessonSubSubjects: [],
      },
    };

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
    <CustomPageHeader title='Çalışma Planı Kopyala' showBreadCrumb routes={['Çalışma Planları']}>
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
            <SubjectChoose subjectForm={subjectForm} outQuestionForm={outQuestionForm} practiceForm={practiceForm}
                           isEdit={true} />
          </TabPane>
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

export default CopyWorkPlan;
