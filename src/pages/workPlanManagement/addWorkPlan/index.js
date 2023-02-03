import { Form, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CustomPageHeader } from '../../../components';
import '../../../styles/workPlanManagement/addWorkPlan.scss';
import SubjectChoose from './subject';
import ReinforcementTest from './reinforcement';
import EvaluationTest from './evaluation';
import OutQuestion from './outQuestions';
import PracticeQuestion from './practiceQuestion';

const AddWorkPlan = () => {
  const { TabPane } = Tabs;

  const [subjectForm] = Form.useForm();
  const [outQuestionForm] = Form.useForm();
  const [practiceForm] = Form.useForm();

  const {
    activeKey,
    subjectChooseTab,
  } = useSelector((state) => state?.workPlan);


  useEffect(() => {
    console.log('subjectChooseTabEffect', subjectChooseTab);
  }, [subjectChooseTab]);

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
