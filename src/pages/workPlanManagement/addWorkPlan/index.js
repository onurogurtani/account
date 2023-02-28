import { Form, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, CustomPageHeader, errorDialog, Text } from '../../../components';
import '../../../styles/workPlanManagement/addWorkPlan.scss';
import SubjectChoose from './subject';
import ReinforcementTest from './reinforcement';
import EvaluationTest from './evaluation';
import OutQuestion from './outQuestions';
import PracticeQuestion from './practiceQuestion';
import { useHistory, useLocation } from 'react-router-dom';
import { resetAllData } from '../../../store/slice/workPlanSlice';

const AddWorkPlan = () => {
  const { TabPane } = Tabs;

  const [subjectForm] = Form.useForm();
  const [outQuestionForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const history = useHistory();
  const [isExit, setIsExit] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const {
    activeKey,
    subjectChooseTab,
    evaluationTab,
    outQuestionTab,
    practiceQuestionTab,
  } = useSelector((state) => state?.workPlan);


  useEffect(() => {
      console.log('subjectChooseTabEffect', subjectChooseTab);
    }, [
      subjectChooseTab,
      evaluationTab,
      outQuestionTab,
      practiceQuestionTab],
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
              setIsExit(false);
              setCount(count +1);

              try {
                // TODO: 'Veri kaydi yapılacak ve işlem devam edecek'
                const values = await subjectForm.validateFields();
                console.log('val', values);
                console.log('kaydedildi...');
                await dispatch(resetAllData());
                history.push(location.pathname);
              } catch (e) {
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
              setIsExit(false);

              // TODO: 'Veri kaydi yapılacak ve işlem devam edecek'
              await console.log('kaydedildi...');
              await dispatch(resetAllData());
              history.push(location.pathname);
            },
          });

          unblock();
        }
        else {
          return true;
        }

        return false;
      });

      return unblock;
  }, [
    activeKey,
    history,
    count,
    isExit
  ]);

  return (
    <CustomPageHeader title='Çalışma Planı Oluşturma' showBreadCrumb routes={['Çalışma Planları']}>
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
            <SubjectChoose subjectForm={subjectForm} outQuestionForm={outQuestionForm} practiceForm={practiceForm} />
          </TabPane>
          <TabPane tab='Pekiştirme Test Ekleme' key='1'>
            <ReinforcementTest />
          </TabPane>
          <TabPane tab='Ölçme ve Değerlendirme Testi Ekleme' key='2'>
            <EvaluationTest setIsExit={setIsExit}/>
          </TabPane>
          <TabPane tab='Çıkmış Soru Ekleme' key='3'>
            <OutQuestion outQuestionForm={outQuestionForm} />
          </TabPane>
          <TabPane tab='Alıştırma Sorusu Ekleme' key='4'>
            <PracticeQuestion subjectForm={subjectForm} outQuestionForm={outQuestionForm} practiceForm={practiceForm} />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default AddWorkPlan;
