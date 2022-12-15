import { Col, Form, Row, Upload } from 'antd';
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
import { UploadOutlined } from '@ant-design/icons';
import fileServices from '../../../../services/file.services';

const AnnouncementInfoForm = ({
  setAnnouncementInfoData,
  setStep,
  goToRolesPage,
  history,
  initialValues,
  selectedRole,
  announcementInfoData,
  setFormData,
  updated,
  setUpdated,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { announcementTypes } = useSelector((state) => state?.announcement);
  const dispatch = useDispatch();
  const [quillValue, setQuillValue] = useState('');
  const [fileImage, setFileImage] = useState(null);
  useEffect(() => {
    dispatch(getByFilterPagedAnnouncementTypes());
    if (initialValues) {
      setFormData(form);
      form.setFieldsValue({ announcementType: initialValues.announcementType.name });
      setAnnouncementInfoData(initialValues.id);
    }
  }, []);

  if (initialValues) {
    initialValues = {
      ...initialValues,
      endDate: dayjs(initialValues?.endDate),
      startDate: dayjs(initialValues?.startDate),
    };
  }
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
  const text = Form.useWatch('text', form);
  useEffect(() => {
    if (text === '<p><br></p>' || text === '') {
      setIsErrorReactQuill(true);
    } else {
      setIsErrorReactQuill(false);
    }
  }, [text]);

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
  };
  const token = useSelector((state) => state?.auth?.token);

  return (
    <CustomForm
      name="announcementInfo"
      className="addAnnouncementInfo-link-form"
      form={form}
      initialValues={initialValues ? initialValues : {}}
      autoComplete="off"
      layout={'horizontal'}
    >
      <CustomFormItem
        label={<Text t="Başlık" />}
        name="headText"
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput placeholder={'Başlık'} />
      </CustomFormItem>
      <CustomFormItem
        label={<Text t="Duyuru Tipi" />}
        name="announcementType"
        style={{ width: '100%' }}
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomSelect className="form-filter-item" placeholder={'Seçiniz'} style={{ width: '100%' }}>
          {announcementTypes?.map(({ id, name }) => (
            <Option id={id} key={id} value={name}>
              <Text t={name} />
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>

      <CustomFormItem
        className="editor"
        label={<Text t="İçerik" />}
        name="content"
        value={quillValue}
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
      <CustomFormItem
        label={<Text t="Duyuru Anasayfa Metni" />}
        name="homePageContent"
        placeholder={
          'Bu alana girilen veri anasayfa, tüm duyurular sayfası ve pop-uplarda gösterilecek özet bilgi metnidir.'
        }
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput placeholder={'Yeni duyurunuz ile ilgili özet metin'} />
      </CustomFormItem>
      <CustomFormItem
        label={<Text t="Button İsmi" />}
        name="buttonName"
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput placeholder={'Button İsmi'} />
      </CustomFormItem>

      <CustomFormItem
        label={<Text t="Button Url" />}
        name="buttonUrl"
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput placeholder={'Button Url '} />
      </CustomFormItem>

      <CustomFormItem label={<Text t="Duyuru İcon" />} name="fileId" rules={[]}>
        <Upload
          listType="picture"
          accept=".png,.jpeg,.jpg,.WEBP"
          beforeUpload={(e) => {
            console.log(e);
            return false;
          }}
          onChange={async (e) => {
            const data = new FormData();
            data.append('File', e.file);
            data.append('FileType', 7);
            data.append('FileName', e.file.name);
            data.append('Description', e.file.name);
            setFileImage(data);
          }}
          maxCount={1}
        >
          <CustomButton icon={<UploadOutlined />}>Upload</CustomButton>
        </Upload>
      </CustomFormItem>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={<Text t="Başlangıç Tarihi" />}
            name="startDate"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledStartDate}
              format="YYYY-MM-DD HH:mm"
              showTime={true}
            />
          </CustomFormItem>
        </Col>
      </Row>
      <Row className="ant-form-item-extra">
        Başlangıç Tarihi Duyurunun, Arayüzünden görüntüleneceği tarihi belirlemenizi sağlar.
      </Row>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
          <CustomFormItem
            label={<Text t="Bitiş Tarihi" />}
            name="endDate"
            rules={[
              { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              {
                validator: dateValidator,
                message: <Text t="Girilen tarihleri kontrol ediniz" />,
              },
            ]}
          >
            <CustomDatePicker
              placeholder={'Tarih Seçiniz'}
              disabledDate={disabledEndDate}
              format="YYYY-MM-DD HH:mm"
              hideDisabledOptions
              showTime={true}
            />
          </CustomFormItem>
        </Col>
      </Row>
      <Row className="ant-form-item-extra">
        Bitiş Tarihi Duyurunun, Arayüzünden kaldırılacağı tarihi belirlemenizi sağlar.
      </Row>
      {!initialValues ? (
        <AddAnnouncementFooter
          form={form}
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          setIsErrorReactQuill={setIsErrorReactQuill}
          history={history}
          fileImage={fileImage}
        />
      ) : (
        <EditAnnouncementFooter
          form={form}
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          goToRolesPage={goToRolesPage}
          setIsErrorReactQuill={setIsErrorReactQuill}
          history={history}
          selectedRole={selectedRole}
          announcementInfoData={announcementInfoData}
          currentId={initialValues.id}
          updated={updated}
          setUpdated={setUpdated}
          fileImage={fileImage}
        />
      )}
    </CustomForm>
  );
};

export default AnnouncementInfoForm;
