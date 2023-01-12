import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/videoSlice';
import CategorySection from './CategorySection';
import IntroVideoSection from './IntroVideoSection';
import LessonsSectionForm from './LessonsSectionForm';
import VideoTextSection from './VideoTextSection';
import SurveyAndKeywordSection from './SurveyAndKeywordSection';
import UrlAndPdfSection from './UrlAndPdfSection';
import VideoSection from './VideoSection';

const AddGeneralInformation = ({ sendValue }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const [introVideoFile, setIntroVideoFile] = useState();
  const [kalturaVideoName, setKalturaVideoName] = useState();

  const onFinish = (values) => {
    const introVideoObj = form.getFieldValue('introVideoObj');
    if (!introVideoObj) {
      form.setFields([
        {
          name: 'addIntroVideo',
          errors: ['Lütfen Intro Video Ekleyiniz.'],
        },
      ]);
      return;
    }

    values.lessonSubSubjects = values.videoBrackets;
    values.keyWords = values.keyWords.join();
    values.isActive = true;
    values.beforeEducationSurvey = values?.survey === 'before' ? true : false;
    values.afterEducationSurvey = values?.survey === 'after' ? true : false;
    delete values.survey;
    console.log(values);

    if (introVideoFile) {
      values.introVideo = introVideoObj; //yeni intro video ekledi ise
    } else {
      values.introVideoId = introVideoObj.id; //İntro video kayıtlılardan seçti ise
    }
    values.kalturaVideoName = kalturaVideoName;
    const urlAndPdfAttach = form.getFieldValue('urlAndPdfAttach');
    if (urlAndPdfAttach) {
      let videoAttachments = [];
      urlAndPdfAttach.map((item) => {
        if (item?.uploadedFile) {
          videoAttachments = [
            ...videoAttachments,
            {
              attachmentTypeId: 1,
              fileId: item?.uploadedFile?.id,
              videoTime: item?.time,
            },
          ];
        }
        item?.urlFormList?.map((i) => {
          if (i?.url) {
            videoAttachments = [
              ...videoAttachments,
              {
                attachmentTypeId: 2,
                attachmentUrl: i.url,
                videoTime: item?.time,
              },
            ];
          }
        });
      });
      values.videoAttachments = videoAttachments;
      console.log('videoAttachments', videoAttachments);
    }

    console.log('urlAndPdfAttach', urlAndPdfAttach);
    sendValue(values);
    dispatch(onChangeActiveKey('1'));
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete="off"
        layout="horizontal"
        className="general-information-add-form"
        form={form}
        name="form"
        onFinish={onFinish}
      >
        <div className="general-information-add-form-content">
          <div className="left-form">
            <CategorySection form={form} />
            <LessonsSectionForm form={form} />
            <VideoTextSection />
          </div>
          <div className="right-form">
            <VideoSection form={form} setKalturaVideoName={setKalturaVideoName} />
            <IntroVideoSection form={form} introVideoFile={introVideoFile} setIntroVideoFile={setIntroVideoFile} />
            <SurveyAndKeywordSection form={form} />
            <UrlAndPdfSection form={form} />
          </div>
        </div>
        <div className="general-information-add-form-footer">
          <CustomButton type="primary" onClick={() => history.push('/video-management/list')} className="back-btn">
            Geri
          </CustomButton>

          <CustomButton type="primary" onClick={() => form.submit()} className="next-btn">
            İlerle
          </CustomButton>
        </div>
      </CustomForm>
    </>
  );
};

export default AddGeneralInformation;
