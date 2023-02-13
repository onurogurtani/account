import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { Tabs } from 'antd';
import { CustomCollapseCard, Text } from '../../../../components';
import '../../../../styles/temporaryFile/asEvGeneral.scss';
import AsEvForm from '../form/AsEvForm';
import AsEvQuestions from './AsEvQuestions';
import ChangeQuestionForm from './ChangeQuestionForm';
const { TabPane } = Tabs;

const AddAsEv = () => {
  const [step, setStep] = useState('1');
  const [disabled, setDisabled] = useState(true);
  return (
    <Tabs defaultActiveKey={'1'} activeKey={step} onChange={(key) => setStep(key)}>
      <TabPane tab="Genel Bilgiler" key="1">
        <AsEvForm step={step} setStep={setStep} disabled={disabled} setDisabled={setDisabled} />
      </TabPane>
      {/* //TODO DİSABLED AYARLANMASI LAZIM */}

      <TabPane disabled={disabled} tab="Sorular" key="2">
        {/* TODO SORU ESÇİMİ KONTROL EMEK LAZIM */}
        <CustomCollapseCard cardTitle={<Text t="Soru Seçimi" />}>
          <AsEvQuestions />
        </CustomCollapseCard>{' '}
      </TabPane>
    </Tabs>
  );
};

export default AddAsEv;
