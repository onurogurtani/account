import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomForm, errorDialog, Text } from '../../../../components';
import {
  getByVideoId,
  onChangeActiveKey,
  setKalturaIntroVideoId,
} from '../../../../store/slice/videoSlice';
import BracketSection from './BracketSection';
import CategoryAndPackageSection from './CategoryAndPackageSection';
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
  const [kalturaVideoName, setKalturaVideoName] = useState();

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

    values.lessonSubSubjects = values.lessonSubSubjects.map((item) => ({
      lessonSubSubjectId: item,
    }));
    values.keyWords = values.keyWords.join();
    values.packages = values.packages.map((item) => ({
      packageId: item,
    }));
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
        labelCol={{ flex: '150px' }}
        autoComplete="off"
        layout="horizontal"
        className="general-information-edit-form"
        form={form}
        name="form"
        onFinish={onFinish}
      >
        <div className="general-information-edit-form-content">
          <div className="left-form">
            <CategoryAndPackageSection form={form} />
            <LessonsSectionForm form={form} />
            <StatusAndVideoTextSection form={form} />
          </div>
          <div className="right-form">
            <VideoSection
              form={form}
              kalturaVideoName={kalturaVideoName}
              setKalturaVideoName={setKalturaVideoName}
            />
            <IntroVideoSection
              form={form}
              introVideoFile={introVideoFile}
              setIntroVideoFile={setIntroVideoFile}
            />
            <BracketSection form={form} />
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
