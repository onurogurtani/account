import { CheckOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { List, Upload } from 'antd';
import React from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  Option,
} from '../../../components';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
];

const IntroVideoModal = ({
  open,
  setOpen,
  form,
  selectRecordedIntroVideo,
  introFormFinish,
  setIntroVideoFile,
}) => {
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
          dataSource={data}
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
                title={item.title}
                description="İntro video açıklama"
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
            name="videoname"
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
            name="introvideotype"
          >
            <CustomSelect placeholder="Video Türü">
              <Option key={1}>Canlı</Option>
              <Option key={2}>Asenkron</Option>
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
              name="introvideo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="filesintro"
                // action="http://167.71.77.240:6001/api/Schools/uploadSchoolExcel"
                // headers={{
                //   authorization:
                //     'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlBlcnNvbiIsIm5iZiI6MTY2NTA0OTY2MiwiZXhwIjoxNzI1MDQ5NjAyLCJpc3MiOiJ3d3cua2d0ZWtub2xvamkuY29tIiwiYXVkIjoid3d3LmtndGVrbm9sb2ppLmNvbSJ9.RcuOlH7q7pX1G9zMmjXTQRZ9eq13TMdyzhAZKLbY2qg',
                // }}
                // listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  setIntroVideoFile(file);
                  return false;
                }}
                // beforeUpload={beforeUpload}
                // accept="video/*"
                // customRequest={dummyRequest}
                // onProgress={(step, file) => {
                //   setStepProgressIntroVideo(Math.round(step.percent));
                //   console.log('onProgress', Math.round(step.percent), file.name);
                // }}
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
