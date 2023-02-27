import { Form, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { confirmDialog, CustomPageHeader, Text } from '../../../components';
import '../../../styles/workPlanManagement/addWorkPlan.scss';
import SubjectChoose from './subject';
import ReinforcementTest from './reinforcement';
import EvaluationTest from './evaluation';
import OutQuestion from './outQuestions';
import PracticeQuestion from './practiceQuestion';
import { useHistory } from 'react-router-dom';

const AddWorkPlan = () => {
  const { TabPane } = Tabs;

  const [subjectForm] = Form.useForm();
  const [outQuestionForm] = Form.useForm();
  const [practiceForm] = Form.useForm();
  const history = useHistory();
  const [isExit, setIsExit] = useState(false);

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

      if (activeKey === '0') {
        confirmDialog({
          title: <Text t='attention' />,
          htmlContent: 'Bu sayfadan ayrıldığınızda girmiş olduğunuz bilgiler silinecektir. Kartlarınız taslak olarak kaydetmek ister misiniz?',
          okText: 'Evet',
          cancelText: 'Hayır',
          onOk: async () => {
            setIsExit(true);
            await console.log('kaydedildi...');
            history.push(location.pathname);
          },
          onCancel: async () => {
            await console.log('kaydedilmedi...');
            history.push(location.pathname);
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
    subjectChooseTab,
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
            <EvaluationTest />
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
