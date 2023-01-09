import { Col, Form, Row, Upload, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import {
  CustomButton,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import AddAnnouncementFooter from '../addAnnouncement/AddAnnouncementFooter';
import EditAnnouncementFooter from '../editAnnouncement/EditAnnouncementFooter';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { UploadFile } from 'antd/es/upload/interface';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import fileServices from '../../../../services/file.services';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AnnouncementIcon = ({
  initialValues,
  announcementInfoData,
  setFormData,
  updated,
  setUpdated,
  setFileImage,
  fileImage,
}) => {
  const [fileList, setFileList] = useState([]);
  console.log(initialValues)
  useEffect(() => {
    (initialValues?.file &&
      initialValues?.fileId) &&
      setFileList([
        {
          uid: initialValues?.fileId,
          name: initialValues?.file?.fileName,
          url: `data:${initialValues?.file?.contentType};base64,${initialValues?.file?.file}`,
          status: 'done',
        },
      ]);
  }, []);


  // FILE SHOW
  // const [previewOpen, setPreviewOpen] = useState(true);
  // const [previewImage, setPreviewImage] = useState('');
  // const [previewTitle, setPreviewTitle] = useState('');
  // const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    return false;
    // // if (!file.url && !file.preview) {
    // //   file.preview = await getBase64(file.originFileObj);
    // // }
    // setPreviewImage(file.url);
    // setPreviewOpen(true);
    // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  //FILE SHOW

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    e && setFileList(e.fileList);
    setFileList(e.fileList);
    return e && e.fileList;
  };
  // const  handleChange= ({ fileList: newFileList }) => setFileList(...newFileList);
  console.log(fileList);

  return (
    <>
      <CustomFormItem
        label={<Text t="Duyuru İkon" />}
        value={fileList}
        onChange={(e) => {
          setFileList(fileList);
        }}
        name="fileId"
        getValueFromEvent={getFile}
        rules={[
          {
            required: true,
            message: 'Lütfen İkon seçiniz!',
          },
        ]}
      >
        <Upload
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: true,
          }}
          defaultFileList={
            initialValues?.file && [
              {
                uid: initialValues?.fileId,
                name: initialValues?.file?.fileName,
                url: `data:${initialValues?.file?.contentType};base64,${initialValues?.file?.file}`,
                status: 'done',
              },
            ]
          }
          listType="picture"
          beforeUpload={(e) => {
            return false;
          }}
          onPreview={handlePreview}
          accept=".png,.jpeg,.jpg,.webp"
          onChange={async (e) => {
            console.log(e.fileList);
            // handleChange();
            // setDefaultFileList(e.fileList);
            setFileList(e.fileList);
            let data = new FormData();
            console.log(e.file,e.file.name)
            data.append('File', e.file);
            data.append('FileType', 4);
            data.append('FileName', e.file.name);
            data.append('Description', e.file.name);
            setFileImage(data);
            console.log(data);
          }}
          maxCount={1}
          onRemove={() => setFileList([])}
        >
          <CustomButton disabled={fileList.length == 1 ? true : false} icon={<UploadOutlined />}>
            Yükle
          </CustomButton>
        </Upload>
      </CustomFormItem>
      {/* <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}
    </>
  );
};

export default AnnouncementIcon;
