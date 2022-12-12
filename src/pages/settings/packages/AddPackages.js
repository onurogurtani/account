import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
} from '../../../components';
import fileServices from '../../../services/file.services';
import { getPackageTypeList } from '../../../store/slice/packageType';
import '../../../styles/settings/packages.scss';
import { reactQuillValidator } from '../../../utils/formRule';
import { CancelToken, isCancel } from 'axios';
import { addPackage } from '../../../store/slice/packageSlice';

const AddPackages = () => {
  const [form] = Form.useForm();
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [errorUpload, setErrorUpload] = useState();
  const cancelFileUpload = useRef(null);
  const token = useSelector((state) => state?.auth?.token);
  const { packageTypeList } = useSelector((state) => state?.packageType);
  const dispatch = useDispatch();

  useEffect(() => {
    loadPackageType();
  }, []);

  const loadPackageType = async () => {
    dispatch(getPackageTypeList());
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = async (file) => {
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

  const cancelIntroVideoUpload = () => {
    if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
  };

  const handleUpload = async (images) => {
    let imageListArray = [];

    for (let i = 0; i < images.length; i++) {
      const fileData = images[i]?.originFileObj;
      const data = new FormData();
      data.append('File', fileData);
      data.append('FileType', 5);
      data.append('FileName', images[i]?.name);

      const options = {
        cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      };
      setIsDisable(true);

      try {
        const response = await fileServices.uploadFile(data, options);
        imageListArray.push({ fileId: response.data.data.id });
      } catch (error) {
        if (isCancel(error)) {
          setErrorUpload();
          return;
        }
        setErrorUpload('Dosya yüklenemedi yeniden deneyiniz');
      }
    }
    console.log('imageListArray', imageListArray);
    return imageListArray;
  };

  const onFinish = async (values) => {
    console.log('values', values);

    const data = {
      package: {
        ...values,
        imageOfPackages: await handleUpload(values.imageOfPackages),
        examType: 10, //sınav tipi halihazırda inputtan alınmıyor
      },
    };

    dispatch(addPackage(data));
    setIsDisable(false);
  };

  return (
    <CustomCollapseCard cardTitle="Yeni Paket Oluşturma">
      <div className="add-packages-container">
        <CustomForm
          name="packagesInfo"
          className="addPackagesInfo-link-form"
          form={form}
          autoComplete="off"
          layout={'horizontal'}
          onFinish={onFinish}
        >
          <CustomFormItem
            label={<Text t="Paket Adı" />}
            name="name"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomInput placeholder={'Başlık'} />
          </CustomFormItem>

          <CustomFormItem
            label={<Text t="Paket Özeti" />}
            name="summary"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomInput placeholder={'Başlık'} />
          </CustomFormItem>

          <CustomFormItem
            className="editor"
            label={<Text t="Paket İçeriği" />}
            name="content"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: reactQuillValidator,
                message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
              },
              {
                type: 'string',
                max: 2500,
                message: 'Duyurunuz En fazla 2500 Karakter İçerebilir.',
              },
            ]}
          >
            <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
          </CustomFormItem>

          <CustomFormItem label="Dosya">
            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen dosya seçiniz.',
                },
              ]}
              name="imageOfPackages"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="files"
                disabled={isDisable}
                maxCount={5}
                multiple={true}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: <DeleteOutlined onClick={(e) => cancelIntroVideoUpload()} />,
                }}
                beforeUpload={beforeUpload}
                accept=".csv, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, image/*"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </CustomFormItem>
          </CustomFormItem>
          {errorUpload && <div className="ant-form-item-explain-error">{errorUpload}</div>}

          <CustomFormItem
            label={<Text t="Durumu" />}
            name="isActive"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
              <Option key={'true'} value={true}>
                <Text t={'Aktif'} />
              </Option>{' '}
              <Option key={false} value={false}>
                <Text t={'Pasive'} />
              </Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label={<Text t="Paket Türü" />}
            name="packageTypeId"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomSelect className="form-filter-item" placeholder={'Seçiniz'}>
              {packageTypeList.map((item) => {
                return (
                  <Option key={`packageTypeList-${item.id}`} value={item.id}>
                    <Text t={item.name} />
                  </Option>
                );
              })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label={<Text t="Max. Net Sayısı" />} name="maxNetCount">
            <CustomInput type={'number'} placeholder={'Başlık'} className="max-net-count" />
          </CustomFormItem>

          <div className="add-package-footer">
            <CustomButton type="primary" className="cancel-btn" onClick={() => console.log('object')}>
              İptal
            </CustomButton>
            <CustomButton type="primary" className="save-btn" onClick={() => form.submit()}>
              Kaydet
            </CustomButton>
          </div>
        </CustomForm>
      </div>
    </CustomCollapseCard>
  );
};

export default AddPackages;
