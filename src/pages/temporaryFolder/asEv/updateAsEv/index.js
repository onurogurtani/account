import dayjs from 'dayjs';
import { Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
  CustomCollapseCard,
} from '../../../../components';
import { deleteAsEv } from '../../../../store/slice/asEvSlice';
import '../../../../styles/temporaryFile/asEv.scss';
import AsEvQuestions from '../addAsEv/AsEvQuestions';
import AsEvForm from '../form/AsEvForm';

const { TabPane } = Tabs;

const UpdateAsEv = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const showData = location?.state?.data;
  console.log('showData :>> ', showData);
  const [currentAsEv, setCurrentAsEv] = useState(showData);
  const [step, setStep] = useState('1');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentAsEv]);

  const handleBack = () => {
    history.push('/test-management/assessment-and-evaluation/list');
  };

  return (
    <>
      <CustomPageHeader
        title={<Text t="Ölçme Değerlendirme Test Düzenleme" />}
        showBreadCrumb
        showHelpButton
        routes={['Testler', 'Ölçme Değerlendirme']}
      ></CustomPageHeader>
      <div className="show-btn-group">
        <CustomButton type="primary" htmlType="submit" className="back-btn" onClick={handleBack}>
          Geri
        </CustomButton>
      </div>
      <Tabs defaultActiveKey={'1'}>
        <TabPane tab="Genel Bilgiler" key="1">
          <AsEvForm
            step={step}
            setStep={setStep}
            disabled={disabled}
            setDisabled={setDisabled}
            initialValues={currentAsEv}
            updateAsEv={true}
          />
        </TabPane>
        <TabPane tab="Sorular" key="2">
          <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
            <AsEvQuestions initialValues={currentAsEv} updateAsEv={true} />
          </CustomCollapseCard>
        </TabPane>
      </Tabs>
    </>
  );
};

export default UpdateAsEv;
