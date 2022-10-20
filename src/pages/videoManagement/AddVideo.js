import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPageHeader, errorDialog, successDialog, Text } from '../../components';
import GeneralInformation from './generalInformation';
import AddDocument from './addDocument';
import VideoQuestion from './videoQuestion';
import '../../styles/videoManagament/addVideo.scss';
import { addVideo, onChangeActiveKey } from '../../store/slice/videoSlice';
import { useHistory } from 'react-router-dom';

const AddVideo = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();

  const { activeKey } = useSelector((state) => state?.videos);
  const [generalInformationData, setGeneralInformationData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [questionData, setQuestionData] = useState({});

  const [introVideoKalturaId, setIntroVideoKalturaId] = useState();
  const [videoKalturaId, setVideoKalturaId] = useState();

  useEffect(() => {
    if (Object.keys(questionData).length > 0) {
      onFinish();
    }
  }, [questionData]);

  const onFinish = async () => {
    console.log('generalInformationData', generalInformationData);
    console.log('documentData', documentData);
    console.log('questionData', questionData);
    if (!videoKalturaId) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Video Henüz Yüklenmedi',
        onOk: () => {
          dispatch(onChangeActiveKey('0'));
        },
      });
      return;
    }
    if (generalInformationData.introVideo && !introVideoKalturaId) {
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
      generalInformationData.introVideo.kalturaIntroVideoId = introVideoKalturaId;
    }
    generalInformationData.kalturaVideoId = videoKalturaId;
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
  // useEffect(() => {
  //   return () => {
  //     alert('uyarı');
  //   };
  // }, []);

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
  const introVideoKalturaIdValue = (value) => {
    console.log(value);
    setIntroVideoKalturaId(value);
  };
  const videoKalturaIdValue = (value) => {
    console.log(value);
    setVideoKalturaId(value);
  };

  return (
    <CustomPageHeader title="Video Ekle" showBreadCrumb routes={['Video Yönetimi']}>
      <div className="addVideo-wrapper">
        <Tabs
          type="card"
          activeKey={activeKey}
          onTabClick={(newKey, e) => {
            const isTriggeredByClick = e;
            if (isTriggeredByClick) return;
          }}
        >
          <TabPane tab="Genel Bilgiler" key="0">
            <GeneralInformation
              sendValue={generalInformationValue}
              sendIntroVideoKalturaIdValue={introVideoKalturaIdValue}
              sendVideoKalturaIdValue={videoKalturaIdValue}
            />
          </TabPane>
          <TabPane tab="Doküman" key="1">
            <AddDocument sendValue={documentValue} />
          </TabPane>
          <TabPane tab="Konu İle İlgili Tüm Sorular" key="2">
            <VideoQuestion sendValue={questionValue} />
          </TabPane>
        </Tabs>
      </div>
    </CustomPageHeader>
  );
};

export default AddVideo;
