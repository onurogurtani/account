import { Form, List, Progress, Upload } from 'antd';
import React, { useRef, useState } from 'react';
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
  Option,
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
let title = [
  { id: '1', value: 'başlık1' },
  { id: '2', value: 'başlık2' },
  { id: '3', value: 'başlık3' },
  { id: '4', value: 'başlık4' },
  { id: '5', value: 'başlık5' },
];

const GeneralInformation = () => {
  const [form] = Form.useForm();
  const [parentForm] = Form.useForm();
  //   const [formIntro] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [stepProgressIntroVideo, setStepProgressIntroVideo] = useState();
  const [isErrorProgressIntroVideo, setIsErrorProgressIntroVideo] = useState();
  const [introVideoFile, setIntroVideoFile] = useState();
  const [selectedSurveyOption, setSelectedSurveyOption] = useState([]);
  const [isErrorVideoUpload, setIsErrorVideoUpload] = useState();

  const showAddIntroModal = () => {
    setOpen(true);
  };

  const onFinish = (values) => {
    // console.log('Finish:', values);
  };

  const handleChangeTitle = (value) => {
    console.log(`selected ${value}`);
    // setSelectedTitle(value);
  };
  const selectBoxCountValidator = async (field, value) => {
    try {
      if (!value || value.length <= 3) {
        return Promise.resolve();
      }
      return Promise.reject(new Error());
    } catch (e) {
      return Promise.reject(new Error());
    }
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
      introVideoObj: { videoname: 'deneme' },
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
  const cancelFileUpload = useRef(null);
  const introFormFinish = (values) => {
    dummyRequest();
    parentForm.setFieldsValue({
      introVideoObj: values,
    });
    setOpen(false);
  };

  const dummyRequest = async () => {
    setIsErrorProgressIntroVideo();

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setStepProgressIntroVideo(Math.round((loaded / total) * 100).toFixed(2));
          // onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
        }
      },
      cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
      headers: {
        authorization:
          'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlBlcnNvbiIsIm5iZiI6MTY2NTA0OTY2MiwiZXhwIjoxNzI1MDQ5NjAyLCJpc3MiOiJ3d3cua2d0ZWtub2xvamkuY29tIiwiYXVkIjoid3d3LmtndGVrbm9sb2ppLmNvbSJ9.RcuOlH7q7pX1G9zMmjXTQRZ9eq13TMdyzhAZKLbY2qg',
      },
    };
    const formData = new FormData();
    console.log(introVideoFile?.name);
    formData.append(introVideoFile?.name, introVideoFile);
    const action = 'http://167.71.77.240:6001/api/Schools/uploadSchoolExcel';

    await axios
      .post(action, formData, options)
      .then(({ data: response }) => {
        // onSuccess(response, file);
        setStepProgressIntroVideo(100);
      })
      .catch((err) => {
        // onError(err);
        if (isCancel(err)) {
          setIsErrorProgressIntroVideo();
          setStepProgressIntroVideo();
          return;
        }
        setStepProgressIntroVideo();
        setIsErrorProgressIntroVideo('Dosya yüklenemedi yeniden deneyiniz');
      });

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  const cancelIntroVideoUpload = () => {
    if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
  };
  const uploadVideo = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setIsErrorVideoUpload();
    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('image', file);
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', fmData, config);
      onSuccess('Ok');
      console.log('server res: ', res);
    } catch (err) {
      setIsErrorVideoUpload('Dosya yüklenemedi yeniden deneyiniz');
      onError({ err });
    }
  };
  return (
    <div className="general-information-wrapper">
      <Form.Provider
        onFormFinish={(name, { forms, values }) => {
          console.log(values);
          console.log(form.getFieldsValue());
          // if (name === 'introForm') {
          //   const { parentForm } = forms;
          //   // const videoname = parentForm.getFieldValue('deneme');
          // }
        }}
      >
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
                name="category"
              >
                <CustomSelect placeholder="Video Kategorisi">
                  <Option key={1}>Konu Anlatım Videoları</Option>
                  <Option key={2}>Soru Çözüm Videoları</Option>
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
                name="relatedPacket"
              >
                <CustomSelect showArrow mode="multiple" placeholder="Bağlı Olduğu Paket">
                  <Option key={1}>4.Sınıf</Option>
                  <Option key={2}>5.Sınıf</Option>
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
                name="lesson"
              >
                <CustomSelect placeholder="Ders">
                  <Option key={1}>4.Sınıf</Option>
                  <Option key={2}>5.Sınıf</Option>
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
                name="unit"
              >
                <CustomSelect placeholder="Ünite">
                  <Option key={1}>4.Sınıf</Option>
                  <Option key={2}>5.Sınıf</Option>
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
                name="subject"
              >
                <CustomSelect placeholder="Konu">
                  <Option key={1}>4.Sınıf</Option>
                  <Option key={2}>5.Sınıf</Option>
                </CustomSelect>
              </CustomFormItem>

              <CustomFormItem
                rules={[
                  { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                  {
                    validator: selectBoxCountValidator,
                    message: 'En fazla 15 adet alt başlık seçebilirsiniz.',
                  },
                ]}
                label="Alt Başlık"
                name="subtitle"
              >
                <CustomSelect
                  showArrow
                  onChange={handleChangeTitle}
                  mode="multiple"
                  placeholder="Alt Başlık"
                >
                  {title.map((item) => (
                    <Option key={item.value}>{item.value}</Option>
                  ))}
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
                name="status"
              >
                <CustomSelect placeholder="Durum">
                  <Option key={1}>4.Sınıf</Option>
                  <Option key={2}>5.Sınıf</Option>
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
                  name="video"
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
                    customRequest={uploadVideo}
                    // beforeUpload={beforeUpload}
                    // accept="video/*"
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
                                {introVideoObj.videoname}
                              </span>
                              <span className="ant-upload-list-item-card-actions">
                                <CustomButton
                                  className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                                  onClick={showAddIntroModal}
                                >
                                  <EditOutlined style={{ color: '#70b186' }} />
                                </CustomButton>
                                <CustomButton
                                  className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                                  onClick={() => {
                                    cancelIntroVideoUpload();
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
                    </>
                  );
                }}
              </CustomFormItem>

              <CustomFormList
                initialValue={[
                  { first: '', last: '' },
                  { first: '', last: '' },
                ]}
                name="marks"
              >
                {(fields, { add, remove }) => (
                  <>
                    <CustomFormItem label="Ayraç">
                      <CustomButton
                        type="dashed"
                        onClick={() => {
                          if (fields.length <= 4) add();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Ekle
                      </CustomButton>
                    </CustomFormItem>
                    <div className="header-mark">
                      <div className="title-mark">Başlık</div>
                      <div className="time-mark">Dakika</div>
                    </div>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="video-mark">
                        <CustomFormItem
                          {...restField}
                          name={[name, 'first']}
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
                          name={[name, 'last']}
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
                name="keyword"
              >
                <CustomSelect mode="tags" placeholder="Anahtar Kelimeler"></CustomSelect>
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
            <CustomButton type="primary" htmlType="submit" className="submit-btn">
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
        setIntroVideoFile={setIntroVideoFile}
      />
    </div>
  );
};

export default GeneralInformation;
