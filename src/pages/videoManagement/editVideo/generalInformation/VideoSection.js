import { DeleteOutlined, InboxOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { CancelToken, isCancel } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomFormItem, errorDialog, Text } from '../../../../components';
import kalturaServices from '../../../../services/kaltura.services';
import { getKalturaSessionKey, setKalturaVideoId } from '../../../../store/slice/videoSlice';

const VideoSection = ({ form }) => {
  const cancelVideoFileUpload = useRef(null);
  const dispatch = useDispatch();

  const { currentVideo } = useSelector((state) => state?.videos);

  const [isError, setIsError] = useState();
  const [kalturaSessionKey, setKalturaSessionKey] = useState();
  const [videoUploadToken, setVideoUploadToken] = useState();
  const [kalturaVideoName, setKalturaVideoName] = useState();

  useEffect(() => {
    return () => {
      dispatch(setKalturaVideoId()); // kalturavideoid video eklerkende kullanıldığı için sayfadan ayrılırsa temizliyoruz
    };
  }, []);

  useEffect(() => {
    setKalturaVideoName(currentVideo?.kalturaVideoName || 'Dosya ismi api düzelince sil');
    // TODO:Sil
    dispatch(setKalturaVideoId(currentVideo?.kalturaVideoId));
  }, [currentVideo]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const cancelVideoUpload = () => {
    if (cancelVideoFileUpload.current)
      cancelVideoFileUpload.current('User has canceled the file upload.');
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
      setVideoUploadToken(upload_token);
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Kaltura Token Id Alınamadı.',
      });
    }
  };

  const beforeVideoUpload = async (file) => {
    cancelVideoUpload();
    await dispatch(setKalturaVideoId());
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

    if (!videoUploadToken) {
      await getUploadToken(ks);
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

  const attachKalturaEntry = async (entryId) => {
    try {
      const data = {
        resource: { objectType: 'KalturaUploadedFileTokenResource', token: videoUploadToken },
        entryId: entryId,
      };
      const res = await kalturaServices.attachKalturaEntry(data, kalturaSessionKey);
      return res;
    } catch (err) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Yüklenen dosya entry eklenemedi.',
      });
    }
  };

  const uploadVideo = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setIsError();

    const onUploadProgress = (progressEvent) => {
      onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
    };
    const cancelToken = new CancelToken((cancel) => (cancelVideoFileUpload.current = cancel));

    const formData = new FormData();
    formData.append('fileData', file);

    try {
      const res = await kalturaServices.uploadFile(
        formData,
        onUploadProgress,
        cancelToken,
        kalturaSessionKey,
        videoUploadToken,
      );
      const entryId = await newEntryKaltura(file);
      const kalturaID = await attachKalturaEntry(entryId);
      setVideoUploadToken();
      dispatch(setKalturaVideoId(kalturaID?.data?.id));
      onSuccess('Ok');
    } catch (err) {
      if (isCancel(err)) {
        setIsError();
        dispatch(setKalturaVideoId());
        return;
      }
      dispatch(setKalturaVideoId());
      setIsError('Dosya yüklenemedi yeniden deneyiniz');
      form.resetFields(['kalturaVideoId']);
      onError({ err });
    }
  };

  const handleDelete = () => {
    setKalturaVideoName();
    dispatch(setKalturaVideoId());
  };

  return (
    <>
      <CustomFormItem label="Video Ekle">
        {kalturaVideoName ? (
          <div className="ant-upload-list ant-upload-list-text">
            <div className="ant-upload-list-text-container">
              <div className="ant-upload-list-item-info">
                <span className="ant-upload-span">
                  <div className="ant-upload-text-icon">
                    {
                      <PaperClipOutlined
                        style={{ color: isError ? 'red' : 'rgba(0, 0, 0, 0.45)' }}
                      />
                    }
                  </div>
                  <span
                    className="ant-upload-list-item-name"
                    style={{ color: isError ? 'red' : 'rgba(0, 0, 0, 0.45)' }}
                  >
                    {kalturaVideoName}
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
            </div>
          </div>
        ) : (
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
              maxCount={1}
              showUploadList={{
                showRemoveIcon: true,
                removeIcon: (
                  <DeleteOutlined style={{ color: 'red' }} onClick={(e) => cancelVideoUpload()} />
                ),
              }}
              customRequest={uploadVideo}
              beforeUpload={beforeVideoUpload}
              accept="video/*"
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
        )}

        {isError && <div className="ant-form-item-explain-error">{isError}</div>}
      </CustomFormItem>
    </>
  );
};

export default VideoSection;
