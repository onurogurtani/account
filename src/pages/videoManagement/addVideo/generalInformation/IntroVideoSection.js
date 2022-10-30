import { DeleteOutlined, LoadingOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Form, Progress } from 'antd';
import { CancelToken, isCancel } from 'axios';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomFormItem, errorDialog, Text } from '../../../../components';
import kalturaServices from '../../../../services/kaltura.services';
import { getKalturaSessionKey, setKalturaIntroVideoId } from '../../../../store/slice/videoSlice';
import IntroVideoModal from './IntroVideoModal';

const IntroVideoSection = ({ form, introVideoFile, setIntroVideoFile }) => {
  const [introVideoForm] = Form.useForm();
  const dispatch = useDispatch();
  const cancelIntroFileUpload = useRef(null);

  const [isError, setIsError] = useState();
  const [percent, setPercent] = useState();
  const [open, setOpen] = useState(false);
  const [isAddedIntroVideo, setIsAddedIntroVideo] = useState(false);
  const [introVideoUploadToken, setIntroVideoUploadToken] = useState();
  const [kalturaSessionKey, setKalturaSessionKey] = useState();

  const { kalturaIntroVideoId } = useSelector((state) => state?.videos);

  useEffect(() => {
    return () => {
      dispatch(setKalturaIntroVideoId()); // kalturaintrovideoid video eklerkende kullanıldığı için sayfadan ayrılırsa temizliyoruz
    };
  }, []);

  const showAddIntroModal = () => {
    setOpen(true);
  };

  const selectRecordedIntroVideo = (item) => {
    console.log(item);
    form.setFields([
      {
        name: 'addIntroVideo',
        errors: null,
      },
    ]);
    introVideoForm.resetFields();
    cancelIntroVideoUpload();
    setIntroVideoFile();
    setIsError();
    setPercent();
    form.setFieldsValue({
      introVideoObj: { ...item },
    });
    setIsAddedIntroVideo(true);
    setOpen(false);
  };

  const getUploadToken = async (kalturaSessionKey) => {
    try {
      const res = await kalturaServices.getUploadToken(kalturaSessionKey);
      if (res?.data?.code === 'INVALID_KS') {
        errorDialog({
          title: <Text t="error" />,
          message: 'Kaltura Token Id Alınamadı. INVALID_KS',
        });
        return;
      }
      const upload_token = res?.data?.id;
      setIntroVideoUploadToken(upload_token);
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Kaltura Token Id Alınamadı.',
      });
    }
  };

  const beforeIntroVideoUpload = async (file) => {
    cancelIntroVideoUpload();
    await dispatch(setKalturaIntroVideoId());
    setIntroVideoFile(file);
    const action = await dispatch(getKalturaSessionKey());
    let ks;
    if (getKalturaSessionKey.fulfilled.match(action)) {
      ks = Object.values(action?.payload?.data).join('');
      setKalturaSessionKey(ks);
      alert("vpn açın sonra tamam'a tıklayın");
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: 'Kaltura Session Key Alınamadı.',
      });
      return;
    }

    if (!introVideoUploadToken) {
      await getUploadToken(ks);
    }
    return false;
  };
  const handleDelete = () => {
    cancelIntroVideoUpload();
    setIsError();
    setIsAddedIntroVideo(false);
    dispatch(setKalturaIntroVideoId());
    form.setFieldsValue({
      introVideoObj: undefined,
    });
    introVideoForm.resetFields();
  };

  const cancelIntroVideoUpload = () => {
    if (cancelIntroFileUpload.current)
      cancelIntroFileUpload.current('User has canceled the file upload.');
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
      setIsError('Dosya yüklenemedi yeniden deneyiniz');
    }
  };

  const attachKalturaEntry = async (entryId) => {
    try {
      const data = {
        resource: { objectType: 'KalturaUploadedFileTokenResource', token: introVideoUploadToken },
        entryId: entryId,
      };
      const res = await kalturaServices.attachKalturaEntry(data, kalturaSessionKey);
      return res;
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Yüklenen dosya entry eklenemedi.',
      });
      setIsError('Dosya yüklenemedi yeniden deneyiniz');
    }
  };

  const introVideoUpload = async () => {
    setIsError();
    form.setFields([
      {
        name: 'addIntroVideo',
        errors: null,
      },
    ]);
    const onUploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        setPercent(Math.round((loaded / total) * 100).toFixed(2));
      }
    };

    const cancelToken = new CancelToken((cancel) => (cancelIntroFileUpload.current = cancel));

    const formData = new FormData();

    formData.append('fileData', introVideoFile);
    try {
      const res = await kalturaServices.uploadFile(
        formData,
        onUploadProgress,
        cancelToken,
        kalturaSessionKey,
        introVideoUploadToken,
      );

      const entryId = await newEntryKaltura(introVideoFile);
      const kalturaIntroID = await attachKalturaEntry(entryId);
      setIntroVideoUploadToken();
      dispatch(setKalturaIntroVideoId(kalturaIntroID?.data?.id));
      setPercent(100);
      setTimeout(() => {
        setPercent();
      }, 1000);
    } catch (err) {
      if (isCancel(err)) {
        setIsError();
        setPercent();
        dispatch(setKalturaIntroVideoId());
        return;
      }
      dispatch(setKalturaIntroVideoId());
      setPercent();
      setIsError('Dosya yüklenemedi yeniden deneyiniz');
      setIsAddedIntroVideo(false);
      form.setFieldsValue({
        introVideoObj: undefined,
      });
    }

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  };

  const introFormFinish = (values) => {
    if (!percent && !kalturaIntroVideoId) {
      cancelIntroVideoUpload();
      introVideoUpload();
    }
    form.setFieldsValue({
      introVideoObj: values,
    });
    setIsAddedIntroVideo(true);
    setOpen(false);
  };

  return (
    <>
      <CustomFormItem name="addIntroVideo" label="Intro Video Ekle">
        {isAddedIntroVideo ? (
          <div className="ant-upload-list ant-upload-list-text">
            <div className="ant-upload-list-text-container">
              <div className="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-text">
                <div className="ant-upload-list-item-info">
                  <span className="ant-upload-span">
                    <div className="ant-upload-text-icon">
                      {percent ? (
                        <LoadingOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                      ) : (
                        <PaperClipOutlined
                          style={{
                            color: isError ? 'red' : 'rgba(0, 0, 0, 0.45)',
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="ant-upload-list-item-name"
                      style={{
                        color: isError ? 'red' : 'rgba(0, 0, 0, 0.45)',
                      }}
                    >
                      {form.getFieldValue(['introVideoObj'])?.name}
                    </span>
                    <span className="ant-upload-list-item-card-actions">
                      <CustomButton
                        className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                        onClick={handleDelete}
                      >
                        <DeleteOutlined style={{ color: 'red' }} />
                      </CustomButton>
                    </span>
                  </span>
                </div>
                {percent && (
                  <div className="ant-upload-list-item-progress">
                    <Progress strokeWidth="2px" showInfo={false} percent={percent} />
                  </div>
                )}
                {isError && <div className="ant-form-item-explain-error">{isError}</div>}
              </div>
            </div>
          </div>
        ) : (
          <>
            <CustomButton type="primary" className="add-btn" onClick={showAddIntroModal}>
              Video Ekle
            </CustomButton>
            {isError && <div className="ant-form-item-explain-error">{isError}</div>}
          </>
        )}
      </CustomFormItem>
      <IntroVideoModal
        open={open}
        setOpen={setOpen}
        form={introVideoForm}
        selectRecordedIntroVideo={selectRecordedIntroVideo}
        introFormFinish={introFormFinish}
        beforeUpload={beforeIntroVideoUpload}
      />
    </>
  );
};

export default IntroVideoSection;
