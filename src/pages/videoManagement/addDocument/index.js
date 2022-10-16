import { DeleteOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, List, Progress, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {
  confirmDialog,
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import axios, { CancelToken, isCancel } from 'axios';
import '../../../styles/videoManagament/addDocument.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVideoDocumentFile } from '../../../store/slice/videoSlice';

const AddDocument = () => {
  const [open, setOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [errorUpload, setErrorUpload] = useState();
  const [documentList, setDocumentList] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [percent, setPercent] = useState();
  const token = useSelector((state) => state?.auth?.token);

  const [form] = Form.useForm();
  const cancelFileUpload = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      alert(2);
    };
  }, []);

  const showAddDocumentModal = () => {
    setOpen(true);
  };
  const normFile = (e) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = async (file) => {
    console.log(file);
    const isValidType = [
      '.csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '.doc',
      '.docx',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
    ].includes(file.type.toLowerCase());

    const isImage = file.type.toLowerCase().includes('image');
    console.log(isImage);
    // const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isValidType && !isImage) {
      setErrorList((state) => [
        ...state,
        {
          id: errorList.length,
          message: 'İzin verilen dosyalar; Word, Excel, PDF, Görsel',
        },
      ]);
    } else {
      setErrorList([]);
    }
    return false;
  };

  const onOkModal = () => {
    form.submit();
  };
  const onFinish = async (values) => {
    console.log(values);
    if (errorList.length > 0) {
      return;
    }

    const fileData = values?.document[0]?.originFileObj;
    const data = new FormData();
    data.append('File', fileData);
    data.append('FileType', 4);
    data.append('FileName', values?.documentName);
    data.append('Description', values?.text);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setPercent(Math.round((loaded / total) * 100).toFixed(2));
        }
      },
      cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    };
    const action = `${process.env.PUBLIC_HOST_API}/Files`;
    setIsDisable(true);
    await axios
      .post(action, data, options)
      .then(({ data: response }) => {
        setPercent();
        setErrorUpload();
        setDocumentList((state) => [...state, response.data]);
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        setPercent();
        if (isCancel(err)) {
          setErrorUpload();
          return;
        }
        setErrorUpload('Dosya yüklenemedi yeniden deneyiniz');
      });
    setIsDisable(false);
  };

  const handleDelete = async (item) => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="delete" />,
      cancelText: 'Vazgeç',
      onOk: async () => {
        const action = await dispatch(deleteVideoDocumentFile({ id: item.id }));
        if (deleteVideoDocumentFile.fulfilled.match(action)) {
          setDocumentList(documentList.filter((data) => data.key !== item.key));
          successDialog({
            title: <Text t="success" />,
            message: action?.payload.message,
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload.message,
          });
        }
      },
    });
  };

  const onCancelModal = async () => {
    await form.resetFields();
    setPercent();
    cancelIntroVideoUpload();
    setErrorUpload();
    setOpen(false);
  };

  const cancelIntroVideoUpload = () => {
    if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
  };
  return (
    <div className="add-document-video">
      <CustomButton
        style={{ marginRight: 'auto' }}
        type="primary"
        className="add-btn"
        onClick={showAddDocumentModal}
      >
        Yeni Doküman Ekle
      </CustomButton>
      <CustomModal
        title="Yeni Doküman Ekle"
        visible={open}
        onOk={onOkModal}
        okText="Kaydet"
        cancelText="Vazgeç"
        onCancel={onCancelModal}
        okButtonProps={{ disabled: isDisable }}
        bodyStyle={{ overflowY: 'auto' }}
        //   width={600}
      >
        <CustomForm
          form={form}
          layout="vertical"
          name="form"
          encType="multipart/form-data"
          onFinish={onFinish}
        >
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Doküman Adı"
            name="documentName"
          >
            <CustomInput placeholder="Doküman Adı" />
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            className="editor"
            label="Açıklama"
            name="text"
          >
            <ReactQuill theme="snow" />
          </CustomFormItem>

          <CustomFormItem label="Dosya">
            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen dosya seçiniz.',
                },
              ]}
              name="document"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="files"
                maxCount={1}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: <DeleteOutlined onClick={(e) => cancelIntroVideoUpload()} />,
                }}
                beforeUpload={beforeUpload}
                accept=".csv, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, image/*"
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

            {percent && (
              <div className="ant-upload-list-item-progress">
                <Progress strokeWidth="2px" showInfo={false} percent={percent} />
              </div>
            )}
          </CustomFormItem>
          {errorList.map((error) => (
            <div key={error.id} className="ant-form-item-explain-error">
              {error.message}
            </div>
          ))}
          {errorUpload && <div className="ant-form-item-explain-error">{errorUpload}</div>}
        </CustomForm>
      </CustomModal>
      <div className="document-list">
        {console.log(documentList)}
        <List
          itemLayout="horizontal"
          header={<h5>Döküman Listesi</h5>}
          dataSource={documentList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <DeleteOutlined onClick={() => handleDelete(item)} style={{ color: 'red' }} />
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileOutlined />}
                title={item.fileName}
                description={<div dangerouslySetInnerHTML={{ __html: item?.description }} />}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AddDocument;
