import { Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  CustomButton,
  CustomImage,
  CustomModal,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import {
  editVideo,
  getByVideoId,
  onChangeActiveKey,
  setKalturaIntroVideoId,
} from '../../../store/slice/videoSlice';
import '../../../styles/videoManagament/editVideo.scss';
import EditDocument from './document';
import EditGeneralInformation from './generalInformation';
import EditVideoQuestion from './question';
import modalSuccessIcon from '../../../assets/icons/icon-modal-success.svg';

const EditVideo = () => {
  const { TabPane } = Tabs;

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { currentVideo, activeKey, kalturaVideoId, kalturaIntroVideoId } = useSelector(
    (state) => state?.videos,
  );

  const [generalInformationData, setGeneralInformationData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [questionData, setQuestionData] = useState({});
  const [open, setOpen] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(onChangeActiveKey('0')); // video eklerkende kullanıldığı için sayfadan ayrılırsa sıfırlıyoruz
    };
  }, []);

  useEffect(() => {
    if (currentVideo.id !== Number(id)) {
      loadVideo(id);
    }
  }, []);

  const loadVideo = useCallback(
    async (id) => {
      const action = await dispatch(getByVideoId(id));
      if (!getByVideoId.fulfilled.match(action)) {
        if (action?.payload?.message) {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
          history.push('/video-management/list');
        }
      }
    },
    [dispatch],
  );

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
      video: {
        ...generalInformationData,
        videoFiles: documentData,
        videoQuestions: questionData,
        id: Number(id),
      },
    };
    console.log(body);
    const action = await dispatch(editVideo(body));
    if (editVideo.fulfilled.match(action)) {
      setOpen(true);
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
    <CustomPageHeader title="Video Düzenle" showBreadCrumb routes={['Video Yönetimi']}>
      <div className="editVideo-wrapper">
        <Tabs
          type="card"
          activeKey={activeKey}
          onTabClick={(newKey, e) => {
            const isTriggeredByClick = e;
            if (isTriggeredByClick) return;
          }}
        >
          <TabPane tab="Genel Bilgiler" key="0">
            <EditGeneralInformation sendValue={generalInformationValue} />
          </TabPane>
          <TabPane tab="Doküman" key="1">
            <EditDocument sendValue={documentValue} />
          </TabPane>
          <TabPane tab="Konu İle İlgili Tüm Sorular" key="2">
            <EditVideoQuestion sendValue={questionValue} />
          </TabPane>
        </Tabs>
      </div>
      <CustomModal
        maskClosable={false}
        footer={false}
        title={
          <>
            <CustomImage src={modalSuccessIcon} /> <span>Kayıt Güncellendi</span>
          </>
        }
        visible={open}
        closable={false}
        className="success-finish-update-video-modal"
      >
        <p>Şimdi Ne yapmak İstersin?</p>
        <CustomButton
          type="primary"
          onClick={() =>
            history.push({
              pathname: `/video-management/show/${id}`,
            })
          }
          className="submit-btn mb-2 mt-2"
        >
          Güncellenen Kaydı Görüntüle
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={() => history.push('/video-management/list')}
          className="submit-btn"
        >
          Tüm Kayıtları Görüntüle
        </CustomButton>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default EditVideo;
