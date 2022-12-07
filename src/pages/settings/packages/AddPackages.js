import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import {
  CustomCollapseCard,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  Option,
  Text,
} from '../../../components';
import '../../../styles/settings/packages.scss';

const AddPackages = () => {
  const [form] = Form.useForm();
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);

  return (
    <CustomCollapseCard cardTitle="Yeni Paket Oluşturma">
      <div className="add-packages-container">
        <CustomForm
          name="packagesInfo"
          className="addPackagesInfo-link-form"
          form={form}
          // initialValues={initialValues ? initialValues : {}}
          autoComplete="off"
          layout={'horizontal'}
        >
          <CustomFormItem
            label={<Text t="Paket Adı" />}
            name="headText"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomInput placeholder={'Başlık'} />
          </CustomFormItem>
          <CustomFormItem
            label={<Text t="Paket Özeti" />}
            name="headSummary"
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
              // {
              //   validator: reactQuillValidator,
              //   message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
              // },
              {
                type: 'string',
                max: 2500,
                message: 'Duyurunuz En fazla 2500 Karakter İçerebilir.',
              },
            ]}
          >
            <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
          </CustomFormItem>

          <CustomFormItem
            label={<Text t="Durumu" />}
            name="isStatus"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
            >
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
            name="packagesType"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
            ]}
          >
            <CustomSelect
              className="form-filter-item"
              placeholder={'Seçiniz'}
            >
              <Option key={'true'} value={true}>
                <Text t={'Aktif'} />
              </Option>{' '}
              <Option key={false} value={false}>
                <Text t={'Pasive'} />
              </Option>
            </CustomSelect>
          </CustomFormItem>

          {/* <AddAnnouncementFooter
            form={form}
            setAnnouncementInfoData={setAnnouncementInfoData}
            setStep={setStep}
            setIsErrorReactQuill={setIsErrorReactQuill}
            history={history}
          /> */}
        </CustomForm>
      </div>
    </CustomCollapseCard>
  );
};

export default AddPackages;
