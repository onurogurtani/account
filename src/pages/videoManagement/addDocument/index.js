import { FileOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, List, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
} from '../../../components';
import '../../../styles/videoManagament/addDocument.scss';

const AddDocument = () => {
  const [open, setOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      console.log('selectedQuestion', selectedDocument);
      if (selectedDocument) {
        form.setFieldsValue(selectedDocument);
        setIsEdit(true);
      }
    }
  }, [open]);

  const showAddDocumentModal = () => {
    setOpen(true);
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
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
    // return isExcel && isLt2M;
  };
  const onOkModal = () => {
    form.submit();
  };
  const onFinish = async (values) => {
    console.log(values);
    if (isEdit) {
      documentList[selectedDocument.key] = {
        ...values,
        key: selectedDocument.key,
      };
      setDocumentList(documentList);
      setIsEdit(false);
      setSelectedDocument();
    } else {
      setDocumentList((state) => [...state, { ...values, key: documentList.length }]);
    }
    await form.resetFields();
    setOpen(false);
  };

  const handleEdit = (item) => {
    console.log(item);
    setSelectedDocument(item);
    setOpen(true);
  };

  const handleDelete = (item) => {
    console.log(item);
    setDocumentList(documentList.filter((data) => data.key !== item.key));
  };

  const onCancelModal = async () => {
    await form.resetFields();
    setOpen(false);
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
        bodyStyle={{ overflowY: 'auto' }}
        //   width={600}
      >
        <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
          <CustomFormItem label="Doküman Adı" name="documentName">
            <CustomInput placeholder="Doküman Adı" />
          </CustomFormItem>

          <CustomFormItem className="editor" label="Açıklama" name="text">
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                headers={{ authorization: 'authorization-text' }}
                // listType="picture"
                maxCount={1}
                beforeUpload={beforeUpload}
                accept=".csv, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, image/*"
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
          </CustomFormItem>
          {errorList.map((error) => (
            <div key={error.id} className="ant-form-item-explain-error">
              {error.message}
            </div>
          ))}
        </CustomForm>
      </CustomModal>
      <div className="document-list">
        <List
          itemLayout="horizontal"
          header={<h5>Döküman Listesi</h5>}
          dataSource={documentList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <a className="document-edit" onClick={() => handleEdit(item)}>
                    Düzenle
                  </a>{' '}
                  <a className="document-delete" onClick={() => handleDelete(item)}>
                    Sil
                  </a>
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileOutlined />}
                title={item.documentName}
                description={<div dangerouslySetInnerHTML={{ __html: item?.text }} />}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AddDocument;
