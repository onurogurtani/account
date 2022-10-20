import { Form, List, Progress, Upload } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {
  CustomButton,
  CustomCheckbox,
  CustomForm,
  CustomFormItem,
  CustomFormList,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  errorDialog,
  Option,
  Text,
} from '../../../components';
import { reactQuillValidator } from '../../../utils/formRule';
import axios, { CancelToken, isCancel } from 'axios';
import '../../../styles/videoManagament/generalInformation.scss';
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import IntroVideoModal from './IntroVideoModal';
import {
  getLessons,
  getUnits,
  getLessonSubjects,
  getLessonSubSubjects,
} from '../../../store/slice/lessonsSlice';
import {
  getAllVideoKeyword,
  getKalturaSessionKey,
  getVideoCategoryList,
  onChangeActiveKey,
} from '../../../store/slice/videoSlice';
import { getPackageList } from '../../../store/slice/packageSlice';

import { useDispatch, useSelector } from 'react-redux';
import kalturaServices from '../../../services/kaltura.services';
import { useHistory } from 'react-router-dom';

const GeneralInformation = ({
  sendValue,
  sendIntroVideoKalturaIdValue,
  sendVideoKalturaIdValue,
}) => {
  const [form] = Form.useForm();
  const [parentForm] = Form.useForm();
  const history = useHistory();
  //   const [formIntro] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [stepProgressIntroVideo, setStepProgressIntroVideo] = useState();
  const [isErrorProgressIntroVideo, setIsErrorProgressIntroVideo] = useState();
  const [introVideoFile, setIntroVideoFile] = useState();
  const [selectedSurveyOption, setSelectedSurveyOption] = useState([]);
  const [isErrorVideoUpload, setIsErrorVideoUpload] = useState();
  const [videoCategoryList, setVideoCategoryList] = useState([]);
  const [kalturaSessionKey, setKalturaSessionKey] = useState();

  const [kalturaIntroVideoId, setKalturaIntroVideoId] = useState();
  const [kalturaVideoId, setKalturaVideoId] = useState();

  const [videoUploadToken, setVideoUploadToken] = useState();
  const [introVideoUploadToken, setIntroVideoUploadToken] = useState();

  const [lessonId, setLessonId] = useState();
  const [unitId, setUnitId] = useState();
  const [lessonSubjectId, setLessonSubjectId] = useState();

  const dispatch = useDispatch();
  const { lessons, units, lessonSubjects, lessonSubSubjects } = useSelector(
    (state) => state?.lessons,
  );
  const { keywords } = useSelector((state) => state?.videos);

  useEffect(() => {
    loadLessons();
    loadVideoCategories();
    loadPackages();
    loadUnits();
    loadLessonSubjects();
    loadLessonSubSubjects();
    loadAllKeyword();
  }, []);

  useEffect(() => {
    sendIntroVideoKalturaIdValue(kalturaIntroVideoId);
  }, [kalturaIntroVideoId]);

  useEffect(() => {
    sendVideoKalturaIdValue(kalturaVideoId);
  }, [kalturaVideoId]);

  const onLessonChange = (value) => {
    setLessonId(value);
    parentForm.resetFields(['lessonUnitId', 'lessonSubjectId', 'lessonSubSubjects']);
  };

  const onUnitChange = (value) => {
    setUnitId(value);
    parentForm.resetFields(['lessonSubjectId', 'lessonSubSubjects']);
  };

  const onLessonSubjects = (value) => {
    setLessonSubjectId(value);
    parentForm.resetFields(['lessonSubSubjects']);
  };

  const loadLessons = useCallback(async () => {
    dispatch(getLessons());
  }, [dispatch]);

  const loadUnits = useCallback(async () => {
    dispatch(getUnits());
  }, [dispatch]);

  const loadLessonSubjects = useCallback(async () => {
    dispatch(getLessonSubjects());
  }, [dispatch]);

  const loadLessonSubSubjects = useCallback(async () => {
    dispatch(getLessonSubSubjects());
  }, [dispatch]);

  const loadAllKeyword = useCallback(async () => {
    dispatch(getAllVideoKeyword());
  }, [dispatch]);

  const { packages } = useSelector((state) => state?.packages);
  const loadPackages = useCallback(async () => {
    dispatch(getPackageList());
  }, [dispatch]);

  const loadVideoCategories = useCallback(async () => {
    const action = await dispatch(getVideoCategoryList());
    if (getVideoCategoryList.fulfilled.match(action)) {
      setVideoCategoryList(action?.payload?.data?.items);
    } else {
      setVideoCategoryList([]);
    }
  }, [dispatch]);

  const showAddIntroModal = () => {
    setOpen(true);
  };

  const onFinish = (values) => {
    const introVideoObj = parentForm.getFieldValue('introVideoObj');
    console.log(introVideoObj);
    if (!introVideoObj) {
      setIsErrorProgressIntroVideo('Lütfen Intro Video Ekleyiniz.');
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
      values.introVideo = introVideoObj;
    } else {
      values.introVideoId = introVideoObj.id;
    }
    sendValue(values);
    dispatch(onChangeActiveKey('1'));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const selectRecordedIntroVideo = (item) => {
    console.log(item);
    form.resetFields();
    cancelIntroVideoUpload();
    setIntroVideoFile();
    setIsErrorProgressIntroVideo();
    setStepProgressIntroVideo();
    parentForm.setFieldsValue({
      introVideoObj: { ...item },
    });
    setOpen(false);
  };

  function handleChangeSurveyOption(e) {
    if (e.target.value === parentForm.getFieldValue(['survey'])) {
      setSelectedSurveyOption(false);
      parentForm.setFieldsValue({
        survey: undefined,
      });
      return;
    }
    setSelectedSurveyOption(e.target.value);
    parentForm.setFieldsValue({
      survey: e.target.value,
    });
  }
  const cancelIntroFileUpload = useRef(null);
  const cancelVideoFileUpload = useRef(null);

  const introFormFinish = (values) => {
    if (!stepProgressIntroVideo && !kalturaIntroVideoId) {
      cancelIntroVideoUpload();
      introVideoUpload();
    }
    parentForm.setFieldsValue({
      introVideoObj: values,
    });
    setOpen(false);
  };
  const beforeIntroVideoUpload = async (file) => {
    cancelIntroVideoUpload();
    setKalturaIntroVideoId();
    setIntroVideoFile(file);
    const ks = await getSessionKey();
    if (!introVideoUploadToken) {
      await getUploadToken(setIntroVideoUploadToken, ks);
    }
    return false;
  };

  const introVideoUpload = async () => {
    setIsErrorProgressIntroVideo();

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setStepProgressIntroVideo(Math.round((loaded / total) * 100).toFixed(2));
        }
      },
      cancelToken: new CancelToken((cancel) => (cancelIntroFileUpload.current = cancel)),
    };
    const formData = new FormData();

    formData.append('fileData', introVideoFile);
    try {
      const res = await axios.post(
        `${process.env.KALTURA_URL}/uploadtoken/action/upload?ks=${kalturaSessionKey}&format=1&resume=false&finalChunk=true&resumeAt=-1&uploadTokenId=${introVideoUploadToken}`,
        formData,
        options,
      );
      setStepProgressIntroVideo(100);
      setTimeout(() => {
        setStepProgressIntroVideo();
      }, 1000);
      const entryId = await newEntryKaltura(introVideoFile);
      const kalturaIntroID = await attachKalturaEntry(entryId, introVideoUploadToken);
      setIntroVideoUploadToken();
      setKalturaIntroVideoId(kalturaIntroID?.data?.id);
    } catch (err) {
      if (isCancel(err)) {
        setIsErrorProgressIntroVideo();
        setStepProgressIntroVideo();
        setKalturaIntroVideoId();
        return;
      }
      setKalturaIntroVideoId();
      setStepProgressIntroVideo();
      setIsErrorProgressIntroVideo('Dosya yüklenemedi yeniden deneyiniz');
    }

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  const cancelIntroVideoUpload = () => {
    if (cancelIntroFileUpload.current)
      cancelIntroFileUpload.current('User has canceled the file upload.');
  };
  const cancelVideoUpload = () => {
    if (cancelVideoFileUpload.current)
      cancelVideoFileUpload.current('User has canceled the file upload.');
  };

  const getSessionKey = async () => {
    if (!kalturaSessionKey) {
      const action = await dispatch(getKalturaSessionKey());
      if (getKalturaSessionKey.fulfilled.match(action)) {
        const ks = Object.values(action?.payload?.data).join('');
        setKalturaSessionKey(ks);
        return ks;
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: 'Kaltura Session Key Alınamadı.',
        });
        return;
      }
    }
    return kalturaSessionKey;
  };

  const getUploadToken = async (setToken, ks) => {
    try {
      const res = await kalturaServices.getUploadToken(ks);
      if (res?.data?.code === 'INVALID_KS') {
        errorDialog({
          title: <Text t="error" />,
          message: 'Kaltura Token Id Alınamadı. INVALID_KS',
        });
        return;
      }
      const upload_token = res?.data?.id;
      setToken(upload_token);
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Kaltura Token Id Alınamadı.',
      });
    }
  };

  const newEntryKaltura = async (file) => {
    try {
      const body = {
        entry: { name: file.name, description: file.name, mediaType: 1 },
      };

      const res = await kalturaServices.newEntryKaltura(body, kalturaSessionKey);
      const entryId = res?.data?.id;
      return entryId;
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Kaltura Medya Entry Oluşturulamadı.',
      });
    }
  };

  const attachKalturaEntry = async (entryId, token) => {
    try {
      const res = await axios.post(
        `${process.env.KALTURA_URL}/media/action/addContent?ks=${kalturaSessionKey}&format=1`,
        {
          resource: { objectType: 'KalturaUploadedFileTokenResource', token: token },
          entryId: entryId,
        },
      );
      return res;
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Yüklenen dosya entry eklenemedi.',
      });
    }
  };

  const beforeVideoUpload = async (file) => {
    cancelVideoUpload();
    setKalturaVideoId();
    const ks = await getSessionKey();
    if (!videoUploadToken) {
      await getUploadToken(setVideoUploadToken, ks);
    }
    return true;
  };

  const uploadVideo = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log(file);
    setIsErrorVideoUpload();

    console.log(kalturaSessionKey);
    console.log(videoUploadToken);

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
      cancelToken: new CancelToken((cancel) => (cancelVideoFileUpload.current = cancel)),
    };
    fmData.append('fileData', file);
    try {
      const res = await axios.post(
        `${process.env.KALTURA_URL}/uploadtoken/action/upload?ks=${kalturaSessionKey}&format=1&resume=false&finalChunk=true&resumeAt=-1&uploadTokenId=${videoUploadToken}`,
        fmData,
        config,
      );
      onSuccess('Ok');
      const entryId = await newEntryKaltura(file);
      const kalturaID = await attachKalturaEntry(entryId, videoUploadToken);
      setVideoUploadToken();
      setKalturaVideoId(kalturaID?.data?.id);
      console.log('server res: ', res);
    } catch (err) {
      setKalturaVideoId();
      setIsErrorVideoUpload('Dosya yüklenemedi yeniden deneyiniz');
      onError({ err });
    }
  };
  return (
    <div className="general-information-wrapper">
      <Form.Provider>
        <CustomForm
          labelCol={{ flex: '150px' }}
          autoComplete="off"
          layout="horizontal"
          className="general-information-form"
          form={parentForm}
          name="parentForm"
          onFinish={onFinish}
        >
          <div className="general-information-form-content">
            <div className="left-form">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Video Kategorisi"
                name="videoCategoryId"
              >
                <CustomSelect placeholder="Video Kategorisi">
                  {videoCategoryList?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Bağlı Olduğu Paket"
                name="packages"
              >
                <CustomSelect showArrow mode="multiple" placeholder="Bağlı Olduğu Paket">
                  {packages?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Ders"
                name="lessonId"
              >
                <CustomSelect onChange={onLessonChange} placeholder="Ders">
                  {lessons
                    ?.filter((item) => item.isActive)
                    .map((item) => {
                      return (
                        <Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Option>
                      );
                    })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Ünite"
                name="lessonUnitId"
              >
                <CustomSelect onChange={onUnitChange} placeholder="Ünite">
                  {units
                    ?.filter((item) => item.isActive && item.lessonId === lessonId)
                    .map((item) => {
                      return (
                        <Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Option>
                      );
                    })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Konu"
                name="lessonSubjectId"
              >
                <CustomSelect onChange={onLessonSubjects} placeholder="Konu">
                  {lessonSubjects
                    ?.filter((item) => item.isActive && item.lessonUnitId === unitId)
                    .map((item) => {
                      return (
                        <Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Option>
                      );
                    })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Alt Başlık"
                name="lessonSubSubjects"
              >
                <CustomSelect showArrow mode="multiple" placeholder="Alt Başlık">
                  {lessonSubSubjects
                    ?.filter((item) => item.isActive && item.lessonSubjectId === lessonSubjectId)
                    .map((item) => {
                      return (
                        <Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Option>
                      );
                    })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Durum"
                name="isActive"
              >
                <CustomSelect placeholder="Durum">
                  <Option key={1} value={true}>
                    Aktif
                  </Option>
                  <Option key={2} value={false}>
                    Pasif
                  </Option>
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                className="editor"
                label="Video Metni"
                name="text"
                rules={[
                  { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                  {
                    validator: reactQuillValidator,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                  // {
                  //   type: 'string',
                  //   max: 2500,
                  //   message: 'En fazla 2500 karakter içermelidir.',
                  // },
                ]}
              >
                <ReactQuill theme="snow" />
              </CustomFormItem>
            </div>
            <div className="right-form">
              <CustomFormItem label="Video Ekle">
                <CustomFormItem
                  rules={[
                    {
                      required: true,
                      message: 'Lütfen dosya seçiniz.',
                    },
                  ]}
                  name="kalturaVideoId"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger
                    name="files"
                    // action="http://167.71.77.240:6001/api/Schools/uploadSchoolExcel"
                    // headers={{
                    //   authorization:
                    //     'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlBlcnNvbiIsIm5iZiI6MTY2NTA0OTY2MiwiZXhwIjoxNzI1MDQ5NjAyLCJpc3MiOiJ3d3cua2d0ZWtub2xvamkuY29tIiwiYXVkIjoid3d3LmtndGVrbm9sb2ppLmNvbSJ9.RcuOlH7q7pX1G9zMmjXTQRZ9eq13TMdyzhAZKLbY2qg',
                    // }}
                    // listType="picture"
                    maxCount={1}
                    // onError={(err) => {
                    //   parentForm.setFields([
                    //     {
                    //       name: 'video',
                    //       errors: ['Dosya yüklenemedi yeniden deneyiniz.'],
                    //     },
                    //   ]);
                    //   console.log('onError', err);
                    // }}
                    showUploadList={{
                      showRemoveIcon: true,
                      removeIcon: <DeleteOutlined onClick={(e) => cancelVideoUpload()} />,
                    }}
                    customRequest={uploadVideo}
                    beforeUpload={beforeVideoUpload}
                    accept="video/*"
                    // customRequest={dummyRequest}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.
                    </p>
                    <p className="ant-upload-hint">Sadece bir adet dosya yükleyebilirsiniz.</p>
                  </Upload.Dragger>
                </CustomFormItem>
                {isErrorVideoUpload && (
                  <div className="ant-form-item-explain-error">{isErrorVideoUpload}</div>
                )}
              </CustomFormItem>

              <CustomFormItem
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.introVideoObj !== curValues.introVideoObj
                }
                label="Intro Video Ekle"
              >
                {({ getFieldValue, setFieldsValue }) => {
                  const introVideoObj = getFieldValue('introVideoObj');
                  return introVideoObj ? (
                    <div className="ant-upload-list ant-upload-list-text">
                      <div className="ant-upload-list-text-container">
                        <div className="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-text">
                          <div className="ant-upload-list-item-info">
                            <span className="ant-upload-span">
                              <div className="ant-upload-text-icon">
                                {stepProgressIntroVideo ? (
                                  <LoadingOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                                ) : (
                                  <PaperClipOutlined
                                    style={{
                                      color: isErrorProgressIntroVideo
                                        ? 'red'
                                        : 'rgba(0, 0, 0, 0.45)',
                                    }}
                                  />
                                )}
                              </div>
                              <span
                                className="ant-upload-list-item-name"
                                style={{
                                  color: isErrorProgressIntroVideo ? 'red' : 'rgba(0, 0, 0, 0.45)',
                                }}
                              >
                                {introVideoObj.name}
                              </span>
                              <span className="ant-upload-list-item-card-actions">
                                {/* <CustomButton
                                  className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                                  onClick={showAddIntroModal}
                                >
                                  <EditOutlined style={{ color: '#70b186' }} />
                                </CustomButton> */}
                                <CustomButton
                                  className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                                  onClick={() => {
                                    cancelIntroVideoUpload();
                                    setIsErrorProgressIntroVideo();
                                    setFieldsValue({
                                      introVideoObj: undefined,
                                    });
                                    form.resetFields();
                                  }}
                                >
                                  <DeleteOutlined style={{ color: 'red' }} />
                                </CustomButton>
                              </span>
                            </span>
                          </div>
                          {stepProgressIntroVideo && (
                            <div className="ant-upload-list-item-progress">
                              <Progress
                                strokeWidth="2px"
                                showInfo={false}
                                percent={stepProgressIntroVideo}
                                // size="small"
                              />
                            </div>
                          )}
                          {isErrorProgressIntroVideo && (
                            <div className="ant-form-item-explain-error">
                              {isErrorProgressIntroVideo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <CustomButton type="primary" className="add-btn" onClick={showAddIntroModal}>
                        Video Ekle
                      </CustomButton>
                      {isErrorProgressIntroVideo && (
                        <div className="ant-form-item-explain-error">
                          {isErrorProgressIntroVideo}
                        </div>
                      )}
                    </>
                  );
                }}
              </CustomFormItem>

              <CustomFormList
                initialValue={[
                  { header: '', value: '' },
                  { header: '', value: '' },
                ]}
                name="videoBrackets"
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    <CustomFormItem label="Ayraç">
                      <CustomButton
                        type="dashed"
                        onClick={() => {
                          if (fields.length <= 4) {
                            add();
                            return;
                          }
                          parentForm.setFields([
                            {
                              name: 'videoBrackets',
                              errors: ['Maximum 5 ayraç ekleyebilirsiniz.'],
                            },
                          ]);
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Ekle
                      </CustomButton>
                      <Form.ErrorList errors={errors} />
                    </CustomFormItem>

                    <div className="header-mark">
                      <div className="title-mark">Başlık</div>
                      <div className="time-mark">Dakika</div>
                    </div>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="video-mark">
                        <CustomFormItem
                          {...restField}
                          name={[name, 'header']}
                          style={{ flex: 2 }}
                          rules={[
                            {
                              required: true,
                              message: 'Zorunlu Alan',
                            },
                          ]}
                        >
                          <CustomInput placeholder="Başlık" />
                        </CustomFormItem>
                        <CustomFormItem
                          {...restField}
                          name={[name, 'value']}
                          style={{ flex: 1 }}
                          rules={[
                            {
                              required: true,
                              message: 'Zorunlu Alan',
                            },
                          ]}
                        >
                          <CustomMaskInput mask={'999:99'}>
                            <CustomInput placeholder="000:00" />
                          </CustomMaskInput>
                        </CustomFormItem>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length >= 3) remove(name);
                            if (fields.length === 5) {
                              parentForm.setFields([
                                {
                                  name: 'videoBrackets',
                                  errors: [],
                                },
                              ]);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </CustomFormList>

              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Anahtar Kelimeler"
                name="keyWords"
              >
                <CustomSelect mode="tags" placeholder="Anahtar Kelimeler">
                  {keywords?.map((item) => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem label="Anket" name="survey">
                <CustomCheckbox
                  onChange={handleChangeSurveyOption}
                  checked={selectedSurveyOption === 'before'}
                  value="before"
                >
                  Eğitim Öncesi
                </CustomCheckbox>
                <CustomCheckbox
                  onChange={handleChangeSurveyOption}
                  checked={selectedSurveyOption === 'after'}
                  value="after"
                >
                  Eğitim Sonrası
                </CustomCheckbox>
              </CustomFormItem>
            </div>
          </div>
          <div className="general-information-form-footer">
            <CustomButton
              type="primary"
              // htmlType="submit"
              onClick={() => history.push('/video-management/list')}
              className="back-btn"
            >
              Geri
            </CustomButton>

            <CustomButton
              type="primary"
              // htmlType="submit"
              onClick={() => parentForm.submit()}
              className="next-btn"
            >
              İlerle
            </CustomButton>
          </div>
        </CustomForm>
      </Form.Provider>

      <IntroVideoModal
        open={open}
        setOpen={setOpen}
        form={form}
        selectRecordedIntroVideo={selectRecordedIntroVideo}
        introFormFinish={introFormFinish}
        beforeUpload={beforeIntroVideoUpload}
      />
    </div>
  );
};

export default GeneralInformation;
