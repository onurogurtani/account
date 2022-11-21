import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPageHeader, errorDialog, successDialog, Text } from '../../../components';
import { addVideo, onChangeActiveKey } from '../../../store/slice/videoSlice';
import AddGeneralInformation from './generalInformation';
import '../../../styles/videoManagament/addVideo.scss';
import { useHistory } from 'react-router-dom';
import AddDocument from './document';
import AddVideoQuestion from './question';

const AddVideo = () => {
  const { TabPane } = Tabs;

  const dispatch = useDispatch();
  const history = useHistory();

  const { activeKey, kalturaVideoId, kalturaIntroVideoId } = useSelector((state) => state?.videos);

  const [generalInformationData, setGeneralInformationData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    return () => {
      dispatch(onChangeActiveKey('0')); // video editlerken kullanıldığı için sayfadan ayrılırsa sıfırlıyoruz
    };
  }, []);

  useEffect(() => {
    if (Object.keys(questionData).length > 0) {
      onFinish();
    }
  }, [questionData]);

  const onFinish = async () => {
    console.log('generalInformationData', generalInformationData);
    console.log('documentData', documentData);
    console.log('questionData', questionData);
    if (!kalturaVideoId) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Video Henüz Yüklenmedi',
        onOk: () => {
          dispatch(onChangeActiveKey('0'));
        },
      });
      return;
    }
    if (generalInformationData.introVideo && !kalturaIntroVideoId) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Intro Video Henüz Yüklenmedi',
        onOk: () => {
          dispatch(onChangeActiveKey('0'));
        },
      });
      return;
    }
    if (generalInformationData.introVideo) {
      generalInformationData.introVideo.kalturaIntroVideoId = kalturaIntroVideoId;
    }
    generalInformationData.kalturaVideoId = kalturaVideoId;

    console.log({
      ...generalInformationData,
      videoFiles: documentData,
      videoQuestions: questionData,
    });

    const body = {
      entity: {
        ...generalInformationData,
        videoFiles: documentData,
        videoQuestions: questionData,
      },
    };
    console.log(body);
    const action = await dispatch(addVideo(body));
    if (addVideo.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload.message,
        onOk: async () => {
          dispatch(onChangeActiveKey('0'));
          history.push('/video-management/list');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };

  const generalInformationValue = (value) => {
    console.log(value);
    setGeneralInformationData(value);
  };

  const documentValue = (value) => {
    console.log(value);
    setDocumentData(value);
  };

  const questionValue = (value) => {
    console.log(value);
    setQuestionData(value);
  };

  return (
    <CustomPageHeader title="Video Ekle" showBreadCrumb routes={['Video Yönetimi']}>
      <div className="addVideo-wrapper">
        <Tabs
          type="card"
          // activeKey={activeKey}
          onTabClick={(newKey, e) => {
            const isTriggeredByClick = e;
            if (isTriggeredByClick) return;
          }}
        >
          <TabPane tab="Genel Bilgiler" key="0">
            <AddGeneralInformation sendValue={generalInformationValue} />
          </TabPane>
          <TabPane tab="Doküman" key="1">
            <AddDocument sendValue={documentValue} />
          </TabPane>
          <TabPane tab="Konu İle İlgili Tüm Sorular" key="2">
            <AddVideoQuestion sendValue={questionValue} />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default AddVideo;
