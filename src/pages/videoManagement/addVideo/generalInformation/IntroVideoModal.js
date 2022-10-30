import { CheckOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { List, Upload } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  Option,
} from '../../../../components';
import { getAllIntroVideoList } from '../../../../store/slice/videoSlice';

const IntroVideoModal = ({
  open,
  setOpen,
  form,
  selectRecordedIntroVideo,
  introFormFinish,
  beforeUpload,
}) => {
  const { introVideos } = useSelector((state) => state?.videos);
  const dispatch = useDispatch();
  useEffect(() => {
    loadAllIntroVideo();
  }, []);

  const loadAllIntroVideo = useCallback(async () => {
    await dispatch(getAllIntroVideoList());
  }, [dispatch]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <CustomModal
      title="Intro Video Ekle"
      visible={open}
      className="intro-video-modal"
      onOk={() => form.submit()}
      okText="Kaydet"
      cancelText="Vazgeç"
      onCancel={() => setOpen(false)}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
      width={600}
    >
      <div className="intro-video-list">
        <List
          itemLayout="horizontal"
          dataSource={introVideos}
          key="intro-video-list"
          renderItem={(item) => (
            <List.Item
              actions={[
                <CustomButton
                  style={{ marginRight: 'auto' }}
                  type="primary"
                  className="add-btn"
                  height="42"
                  onClick={() => selectRecordedIntroVideo(item)}
                >
                  <CheckOutlined /> Seç
                </CustomButton>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileOutlined style={{ fontSize: '32px' }} />}
                title={item.name}
                // description="İntro video açıklama"
              />
            </List.Item>
          )}
        />
      </div>
      <CustomCollapseCard
        defaultActiveKey={['0']}
        className="add-intro-video-collapse"
        cardTitle="Yeni Ekle"
      >
        <CustomForm form={form} onFinish={introFormFinish} layout="vertical" name="introForm">
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Video Adı"
            name="name"
          >
            <CustomInput placeholder="Video Adı" />
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Video Türü"
            name="videoType"
          >
            <CustomSelect placeholder="Video Türü">
              <Option key={1} value={1}>
                Canlı
              </Option>
              <Option key={2} value={1}>
                Asenkron
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label=" Intro Video Ekle">
            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen dosya seçiniz.',
                },
              ]}
              name="kalturaIntroVideoId"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="filesintro"
                maxCount={1}
                accept="video/*"
                beforeUpload={beforeUpload}
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
          </CustomFormItem>
        </CustomForm>
      </CustomCollapseCard>
    </CustomModal>
  );
};

export default IntroVideoModal;
