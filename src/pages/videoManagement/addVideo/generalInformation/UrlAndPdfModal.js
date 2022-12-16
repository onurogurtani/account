import { DeleteOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { CancelToken, isCancel } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomFormList,
  CustomInput,
  CustomMaskInput,
  CustomModal,
  Text,
  warningDialog,
} from '../../../../components';
import fileServices from '../../../../services/file.services';
import { deleteFile } from '../../../../store/slice/fileSlice';
import { videoTimeValidator } from '../../../../utils/formRule';

const UrlAndPdfModal = ({ open, setOpen, form, selectedTime }) => {
  const [urlAndPdfForm] = Form.useForm();
  const cancelFileUpload = useRef(null);
  const [percent, setPercent] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [firstUploadedFileId, setFirstUploadedFileId] = useState();
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTime) {
      setFirstUploadedFileId(selectedTime?.uploadedFile?.id);
      setUploadedFile(selectedTime?.uploadedFile);
      urlAndPdfForm.setFieldsValue(selectedTime);
    } else {
      setUploadedFile();
      setFirstUploadedFileId();
    }
  }, [selectedTime]);
  useEffect(() => {
    //Fix the Maximum Update Depth Exceeded
    if (!open) {
      urlAndPdfForm.resetFields();
    }
  }, [open]);

  const beforeUpload = async (file) => {
    setUploadedFile();
    const isPdf = ['.pdf', 'application/pdf'].includes(file.type.toLowerCase());

    if (!isPdf) {
      urlAndPdfForm.setFields([
        {
          name: 'pdf',
          errors: ['Lütfen Pdf yükleyiniz. Başka bir dosya yükleyemezsiniz.'],
        },
      ]);
    } else {
      urlAndPdfForm.setFields([
        {
          name: 'pdf',
          errors: [],
        },
      ]);
    }
    return isPdf;
  };

  const handleDeletePdf = () => {
    cancelUpload();
    urlAndPdfForm.setFields([
      {
        name: 'pdf',
        errors: [],
      },
    ]);
  };

  const deleteUploadedFile = async () => {
    if (selectedTime && firstUploadedFileId && firstUploadedFileId === uploadedFile?.id) {
      setUploadedFile();
      return false;
    }
    const action = await dispatch(deleteFile(uploadedFile?.id));
    setUploadedFile();
  };

  const onFinish = async (values) => {
    console.log(values);
    if (!uploadedFile && !!!values?.urlFormList.filter((i) => i.url).length) {
      warningDialog({
        title: <Text t="attention" />,
        closeIcon: false,
        message: 'Lütfen Url veya Pdf Ekleyiniz.',
        okText: 'Tamam',
      });
      return false;
    }
    if (!!urlAndPdfForm.getFieldsError().filter(({ errors }) => errors.length).length) {
      return false;
    }
    if (percent && percent < 100) {
      warningDialog({
        title: <Text t="attention" />,
        closeIcon: false,
        message: 'Dosya yükleniyor lütfen bekleyiniz.',
        okText: 'Tamam',
      });
      return false;
    }

    const urlAndPdfAttach = (await form?.getFieldValue('urlAndPdfAttach')) || [];

    if (!!urlAndPdfAttach.filter((item) => item.time === values.time).length && selectedTime?.time !== values?.time) {
      warningDialog({
        title: <Text t="attention" />,
        closeIcon: false,
        message: 'Dk/Sn Kayıtlı',
        okText: 'Tamam',
      });
      return false;
    }

    values.uploadedFile = uploadedFile;

    if (selectedTime) {
      if (firstUploadedFileId && firstUploadedFileId !== uploadedFile?.id) {
        const action = await dispatch(deleteFile(firstUploadedFileId));
      }
      urlAndPdfAttach[selectedTime.index] = values;
      form.setFieldsValue({
        urlAndPdfAttach: urlAndPdfAttach,
      });
    } else {
      form.setFieldsValue({
        urlAndPdfAttach: [...urlAndPdfAttach, values],
      });
    }
    setUploadedFile();
    setFirstUploadedFileId();
    setOpen(false);
  };

  const cancelUpload = () => {
    if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
  };

  const uploadPdf = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const option = {
      onUploadProgress: (progressEvent) => {
        onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
      },
      cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('File', file);
    formData.append('FileType', 4);
    formData.append('FileName', file?.name);
    formData.append('Description', file?.name);

    try {
      const res = await fileServices.uploadFile(formData, option);
      onSuccess('Ok');
      setUploadedFile({ id: res?.data?.data?.id, fileName: res?.data?.data?.fileName });
    } catch (err) {
      if (isCancel(err)) {
        urlAndPdfForm.setFields([
          {
            name: 'pdf',
            errors: [],
          },
        ]);
        return;
      }
      urlAndPdfForm.setFields([
        {
          name: 'pdf',
          errors: ['Dosya yüklenemedi yeniden deneyiniz'],
        },
      ]);
      onError({ err });
    }
  };

  const onChange = (info) => {
    if (info.file.status === 'uploading') {
      setPercent(info.file.percent.toFixed(0));
      return false;
    }
    if (info.file.status === 'error' || info.file.status === 'removed') {
      setPercent();
    }
  };
  return (
    <CustomModal
      title="Bağlantı Dosya Ekle"
      visible={open}
      onOk={() => urlAndPdfForm.submit()}
      okText="Kaydet"
      cancelText="Vazgeç"
      onCancel={() => {
        cancelUpload();
        setUploadedFile();
        setFirstUploadedFileId();
        urlAndPdfForm.resetFields();
        setOpen(false);
      }}
      className="url-and-pdf-modal"
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
      width={600}
    >
      <CustomForm form={urlAndPdfForm} layout="vertical" name="urlAndPdfForm" onFinish={onFinish}>
        <CustomFormList initialValue={[{ url: undefined }]} name="urlFormList">
          {(fields, { add, remove }, { errors }) => (
            <>
              <CustomFormItem label="Url">
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                    }}
                  >
                    <CustomFormItem
                      style={{
                        flex: 1,
                      }}
                      {...restField}
                      name={[name, 'url']}
                      rules={[
                        {
                          type: 'url',
                          message: 'Lütfen geçerli url giriniz',
                        },
                      ]}
                    >
                      <CustomInput placeholder="Url" />
                    </CustomFormItem>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  </div>
                ))}
                <CustomButton
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Url Ekle
                </CustomButton>
                <Form.ErrorList errors={errors} />
              </CustomFormItem>
            </>
          )}
        </CustomFormList>

        <CustomFormItem
          name="time"
          label="Dk/Sn"
          rules={[
            {
              required: true,
              message: 'Zorunlu Alan',
            },
            {
              validator: videoTimeValidator,
              message: 'Lütfen Boş Bırakmayınız',
            },
          ]}
        >
          <CustomMaskInput mask={'999:99'}>
            <CustomInput placeholder="000:00" />
          </CustomMaskInput>
        </CustomFormItem>

        <CustomFormItem label="Dosya">
          {uploadedFile ? (
            <>
              {uploadedFile?.fileName}
              <DeleteOutlined
                style={{ color: 'red', verticalAlign: 'text-bottom', marginLeft: '5px' }}
                onClick={deleteUploadedFile}
              />
            </>
          ) : (
            <CustomFormItem name="pdf" valuePropName="fileListPdf" noStyle>
              <Upload.Dragger
                name="file"
                maxCount={1}
                onChange={onChange}
                accept="application/pdf"
                customRequest={uploadPdf}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: <DeleteOutlined style={{ color: 'red' }} onClick={handleDeletePdf} />,
                }}
                beforeUpload={beforeUpload}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.</p>
                <p className="ant-upload-hint">Sadece bir adet pdf türünde dosya yükleyebilirsiniz.</p>
              </Upload.Dragger>
            </CustomFormItem>
          )}
        </CustomFormItem>
      </CustomForm>
    </CustomModal>
  );
};

export default UrlAndPdfModal;
