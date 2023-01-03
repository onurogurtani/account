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
  const [fieldRequired, setFieldRequired]=useState(false);
  const [buttonName, setButtonName]=useState('');
  const [buttonUrl, setButtonUrl]=useState('')
  const [fileList, setFileList] = useState([]);
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
  useEffect(() => {    
  }, [fieldRequired])
  useEffect(() => {    
  }, [buttonUrl])
  useEffect(() => {    
  }, [buttonName])

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
  const getFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    e && setFileList(e.fileList);
    console.log(fileList);
    return e && e.fileList;
  };
 const checkInputValue=async ()=>{
  console.log(buttonName, buttonUrl)
  if(buttonName!='' || buttonUrl!=''){
    setFieldRequired(true)
  }else{
    setFieldRequired(false);
  }
 }

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
        label={<Text t="Duyuru İkon" />}
        value={fileList}
        onChange={(e) => {
          console.log(e.target.files[0], fileList);
        }}
        name="fileId"
        getValueFromEvent={getFile}
        rules={[
          {
              required: true,
              message: 'Lütfen İkon seçiniz!',
          },
      ]}
        // accept=".png,.jpeg,.jpg,.WEBP"
      >
        <Upload
        //  accept=".png, .jpg, .jpeg, .svg"

          listType="picture"          
          beforeUpload={(e) => {
            console.log(e);
            return false;
          }}
          accept=".png,.jpeg,.jpg,.WEBP"          
          onChange={async (e, value) => {
            console.log(value);
            console.log(e.file);
            const data = new FormData();
            data.append('File', e.file);
            data.append('FileType', 7);
            data.append('FileName', e.file.name);
            data.append('Description', e.file.name);
            setFileImage(data);
            console.log(data);
          }}
          maxCount={1}
        >
          <CustomButton icon={<UploadOutlined />}>Yükle</CustomButton>
        </Upload>
      </CustomFormItem>
      <CustomFormItem
        label={<Text t="Buton İsmi" />}
        name="buttonName"
        onChange={(e)=>{
          setButtonName(e.target.value.trim());
          checkInputValue()}}
        rules={[
          { required: fieldRequired, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput placeholder={'Buton İsmi'} />
      </CustomFormItem>

      <CustomFormItem
        label={<Text t="Buton Url" />}
        name="buttonUrl"
        onChange={(e)=>{
          setButtonUrl(e.target.value.trim());
          checkInputValue()}}
        rules={[
          { required: fieldRequired, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          {
            type: "url",
            message: "Lütfen geçerli bir URL giriniz"
        }
        ]}
      >
        <CustomInput placeholder={"https://ButonUrl.com"}/>
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
