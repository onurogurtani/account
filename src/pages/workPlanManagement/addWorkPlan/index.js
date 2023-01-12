import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPageHeader, errorDialog, successDialog, Text } from '../../../components';
import { onChangeActiveKey } from '../../../store/slice/workPlanSlice';
import '../../../styles/workPlanManagement/addWorkPlan.scss';
import { useHistory } from 'react-router-dom';
import SubjectChoose from './subject';
import ReinforcementTest from './reinforcement';
import EvaluationTest from './evaluation';
import OutQuestion from './outQuestions';
import PracticeQuestion from './practiceQuestion';

const AddWorkPlan = () => {
  const { TabPane } = Tabs;

  const dispatch = useDispatch();
  const history = useHistory();

  const { activeKey } = useSelector((state) => state?.workPlan);

  const [subjectChooseData, setSubjectChooseData] = useState({});
  const [reinforcementData, setReinforcementData] = useState({});
  const [evaluationData, setEvaluationData] = useState({});
  const [outQuestionData, setOutQuestionData] = useState({});
  const [practiceQuestionData, setPracticeQuestionData] = useState({});

  const onFinish = async () => {
    console.log('subjectChooseData', subjectChooseData);

    // if (generalInformationData.introVideo && !kalturaIntroVideoId) {
    //   errorDialog({
    //     title: <Text t="error" />,
    //     message: 'Intro Video Henüz Yüklenmedi',
    //     onOk: () => {
    //       dispatch(onChangeActiveKey('0'));
    //     },
    //   });
    //   return;
    // }


    // const action = await dispatch(addVideo(body));
    // if (addVideo.fulfilled.match(action)) {
    //   successDialog({
    //     title: <Text t="success" />,
    //     message: 'Video Başarılı Şekilde Eklendi',
    //     // message: action?.payload.message,
    //     onOk: async () => {
    //       dispatch(onChangeActiveKey('0'));
    //       history.push('/video-management/list');
    //     },
    //   });
    // } else {
    //   errorDialog({
    //     title: <Text t="error" />,
    //     message: action?.payload.message,
    //   });
    // }
  };

  const subjectValue = (value) => {
    console.log('setSubjectChooseData',value);
    setSubjectChooseData(value);
  };

  const reinforcementValue = (value) => {
    console.log('setReinforcementData');
    setReinforcementData(value);
  };

  const evaluationValue = (value) => {
    console.log('setEvaluationData');
    setEvaluationData(value);
  };

  const outQuestionValue = (value) => {
    console.log('setOutQuestionData');
    setOutQuestionData(value);
  };

  const practiceQuestionValue = (value) => {
    console.log(setPracticeQuestionData);
    setPracticeQuestionData(value);
  };


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
            <SubjectChoose sendValue={subjectValue} />
          </TabPane>
          <TabPane tab='Pekiştirme Test Ekleme' key='1'>
            <ReinforcementTest sendValue={reinforcementValue} />
          </TabPane>
          <TabPane tab='Ölçme ve Değerlendirme Testi Ekleme' key='2'>
            <EvaluationTest sendValue={evaluationValue} />
          </TabPane>
          <TabPane tab='Çıkmış Soru Ekleme' key='3'>
            <OutQuestion sendValue={outQuestionValue} />
          </TabPane>
          <TabPane tab='Alıştırma Sorusu Ekleme' key='4'>
            <PracticeQuestion sendValue={practiceQuestionValue} />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default AddWorkPlan;
