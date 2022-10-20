import { Tabs } from 'antd';
import React from 'react';
import SurveyQuestions from './questions';
import SurveyForms from './forms';
const { TabPane } = Tabs;

const  SurveyTabs = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Sorular" key="1">
      <SurveyQuestions/>
    </TabPane>
    <TabPane tab="Formlar" key="2">
      <SurveyForms/>
    </TabPane>
  </Tabs>
);

export default SurveyTabs;