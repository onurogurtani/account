import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/videoSlice';
import CategorySection from './CategorySection';
import IntroVideoSection from './IntroVideoSection';
import LessonsSectionForm from './LessonsSectionForm';
import StatusAndVideoTextSection from './StatusAndVideoTextSection';
import SurveyAndKeywordSection from './SurveyAndKeywordSection';
import UrlAndPdfSection from './UrlAndPdfSection';
import VideoSection from './VideoSection';

const EditGeneralInformation = ({ sendValue }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [introVideoFile, setIntroVideoFile] = useState();

  const onFinish = (values) => {
    const introVideoObj = form.getFieldValue('introVideoObj');
    console.log(introVideoObj);
    if (!introVideoObj) {
      form.setFields([
        {
          name: 'addIntroVideo',
          errors: ['Lütfen Intro Video Ekleyiniz.'],
        },
      ]);
      return;
    }

    values.lessonAcquisitions = values.lessonAcquisitions.map((item) => ({
      lessonAcquisitionId: item,
    }));
    values.lessonBrackets = values.videoBrackets.map((item) => ({
      lessonBracketId: item?.lessonBracketId,
      bracketTime: item?.bracketTime,
    }));
    values.keyWords = values.keyWords.join();
    values.beforeEducationSurvey = values?.survey === 'before' ? true : false;
    values.afterEducationSurvey = values?.survey === 'after' ? true : false;
    delete values.survey;

    if (introVideoFile) {
      values.introVideo = introVideoObj; //yeni intro video ekledi ise
    } else {
      values.introVideoId = introVideoObj.id; //İntro video kayıtlılardan seçti ise
    }

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
    }

    sendValue(values);
    dispatch(onChangeActiveKey('1'));
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '165px' }}
        autoComplete="off"
        layout="horizontal"
        className="general-information-edit-form"
        form={form}
        name="form"
        onFinish={onFinish}
      >
        <div className="general-information-edit-form-content">
          <div className="left-form">
            <CategorySection form={form} />
            <LessonsSectionForm form={form} />
            <StatusAndVideoTextSection form={form} />
          </div>
          <div className="right-form">
            <VideoSection form={form} />
            <IntroVideoSection form={form} introVideoFile={introVideoFile} setIntroVideoFile={setIntroVideoFile} />

            <SurveyAndKeywordSection form={form} />
            <UrlAndPdfSection form={form} />
          </div>
        </div>
        <div className="general-information-form-footer">
          <CustomButton
            type="primary"
            // htmlType="submit"
            onClick={() => history.push(`/video-management/show/${id}`)}
            className="back-btn"
          >
            Geri
          </CustomButton>

          <CustomButton
            type="primary"
            // htmlType="submit"
            onClick={() => form.submit()}
            className="next-btn"
          >
            İlerle
          </CustomButton>
        </div>
      </CustomForm>
    </>
  );
};

export default EditGeneralInformation;
