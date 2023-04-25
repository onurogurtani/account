import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton, CustomCollapseCard, CustomPageHeader,
  errorDialog,
  successDialog,
  Text
} from '../../../components';
import { deleteAsEv} from '../../../store/slice/asEvSlice';
import '../../../styles/temporaryFile/asEv.scss';
import AsEvInfo from './AsEvInfo';
import ShowAsEvQuestions from './ShowAsEvQuestions';

const { TabPane } = Tabs;

const ShowAsEv = () => {
  const location = useLocation();
  const history = useHistory();
  const showData = location?.state?.data;
  const [currentAsEv, setCurrentAsEv] = useState(showData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentAsEv]);

  const dispatch = useDispatch();
  
  const handleBack = () => {
    history.push('/test-management/assessment-and-evaluation/list');
  };
  const onDelete = async () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        const action = await dispatch(deleteAsEv(currentAsEv?.id));
        if (deleteAsEv.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: 'Ölçme değerlendirme test başarıyla silinmiştir.',
          });
          history.push('/test-management/assessment-and-evaluation/list');
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };

  const onUpdate = async () => {
    history.push({
      pathname: '/test-management/assessment-and-evaluation/edit',
      state: { data: { ...currentAsEv } },
    });
  };
  return (
    <>
      <CustomPageHeader
        title={<Text t="Ölçme Değerlendirme Test Görüntüleme" />}
        showBreadCrumb
        showHelpButton
        routes={['Testler', 'Ölçme Değerlendirme']}
      ></CustomPageHeader>
      <div className="show-btn-group">
        <CustomButton type="primary" htmlType="submit" className="back-btn" onClick={handleBack}>
          Geri
        </CustomButton>
        <CustomButton type="primary" htmlType="submit" className="edit-btn" onClick={onUpdate}>
          Düzenle
        </CustomButton>
        <CustomButton type="primary" htmlType="submit" className="delete-btn" onClick={onDelete} danger>
          Sil
        </CustomButton>
      </div>
      <Tabs defaultActiveKey={'1'}>
        <TabPane tab="Genel Bilgiler" key="1">
          <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
            <AsEvInfo showData={showData} />
          </CustomCollapseCard>
        </TabPane>
        <TabPane tab="Sorular" key="2">
          <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
            <ShowAsEvQuestions/>
          </CustomCollapseCard>
        </TabPane>
      </Tabs>
    </>
  );
};

export default ShowAsEv;
