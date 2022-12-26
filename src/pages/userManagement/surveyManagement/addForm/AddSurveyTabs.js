import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import SurveyInfo from './SurveyInfo';
import QuestionsTab from './QuestionsTab';
import { useSelector, useDispatch } from 'react-redux';
import QuestionModal from '../questions/QuestionModal';
import { getGroupsOfForm, addNewGroupToForm, deleteGroupOfForm } from '../../../../store/slice/formsSlice';

const { TabPane } = Tabs;

const AddSurveyTabs = ({ step, setStep }) => {
  const [permitNext, setPermitNext] = useState(false);
  const { currentForm, showFormObj } = useSelector((state) => state?.forms);
  const [surveyData, setSurveyData] = useState(currentForm);
  useEffect(() => {
    setSurveyData(currentForm);
  }, [currentForm]);

  return (
    <>
      <Tabs defaultActiveKey={'1'} activeKey={step} onChange={(key) => setStep(key)}>
        <TabPane tab="Genel Bilgiler" key="1">
          <SurveyInfo
            permitNext={permitNext}
            setPermitNext={setPermitNext}
            setStep={setStep}
            step={step}
            setSurveyData={setSurveyData}
            surveyData={surveyData}
          />
        </TabPane>
        <TabPane
          disabled={currentForm.id != undefined || showFormObj.id != undefined ? false : true}
          tab="Sorular"
          key="2"
        >
          <QuestionsTab setStep={setStep} step={step} surveyData={surveyData} setSurveyData={setSurveyData} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AddSurveyTabs;
