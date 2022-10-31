import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomForm } from '../../../../components';
import { onChangeActiveKey } from '../../../../store/slice/videoSlice';
import BracketSection from './BracketSection';
import CategoryAndPackageSection from './CategoryAndPackageSection';
import IntroVideoSection from './IntroVideoSection';
import LessonsSectionForm from './LessonsSectionForm';
import StatusAndVideoTextSection from './StatusAndVideoTextSection';
import SurveyAndKeywordSection from './SurveyAndKeywordSection';
import VideoSection from './VideoSection';

const AddGeneralInformation = ({ sendValue }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

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
    sendValue(values);
    dispatch(onChangeActiveKey('1'));
  };

  return (
    <>
      <CustomForm
        labelCol={{ flex: '150px' }}
        autoComplete="off"
        layout="horizontal"
        className="general-information-add-form"
        form={form}
        name="form"
        onFinish={onFinish}
      >
        <div className="general-information-add-form-content">
          <div className="left-form">
            <CategoryAndPackageSection form={form} />
            <LessonsSectionForm form={form} />
            <StatusAndVideoTextSection form={form} />
          </div>
          <div className="right-form">
            <VideoSection form={form} setKalturaVideoName={setKalturaVideoName} />
            <IntroVideoSection
              form={form}
              introVideoFile={introVideoFile}
              setIntroVideoFile={setIntroVideoFile}
            />
            <BracketSection form={form} />
            <SurveyAndKeywordSection form={form} />
          </div>
        </div>
        <div className="general-information-add-form-footer">
          <CustomButton
            type="primary"
            onClick={() => history.push('/video-management/list')}
            className="back-btn"
          >
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
