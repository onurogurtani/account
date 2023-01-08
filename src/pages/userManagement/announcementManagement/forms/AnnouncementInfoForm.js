import { Col, Form, Row, Upload } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState, useRef } from 'react';
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
  CustomCheckbox,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import AddAnnouncementFooter from '../addAnnouncement/AddAnnouncementFooter';
import EditAnnouncementFooter from '../editAnnouncement/EditAnnouncementFooter';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import fileServices from '../../../../services/file.services';
import AnnouncementIcon from './AnnouncementIcon';

const formPublicationPlaces = [
  { id: 1, name: 'Anasayfa' },
  { id: 2, name: 'Anketler Sayfası' },
  { id: 3, name: 'Pop-up' },
  { id: 4, name: 'Bildirimler' },
];

const AnnouncementInfoForm = ({
  setAnnouncementInfoData,
  setStep,
  step,
  goToRolesPage,
  history,
  initialValues,
  selectedRole,
  announcementInfoData,
  setFormData,
  updated,
  setUpdated,
}) => {
  const urlRef = useRef('');
  const nameRef = useRef('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  console.log(selectedPlaces?.includes(3));
  const [required, setRequired] = useState(false);
  useEffect(() => {}, [required]);

  const [form] = Form.useForm();
  const { announcementTypes, updateAnnouncementObject } = useSelector((state) => state?.announcement);

  const dispatch = useDispatch();
  const [quillValue, setQuillValue] = useState('');
  const [fileImage, setFileImage] = useState(null);
  useEffect(() => {
    dispatch(getByFilterPagedAnnouncementTypes());
    if (initialValues) {
      const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
      const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
      const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');
      let initialData = {
        startDate: startDate >= currentDate ? dayjs(initialValues?.startDate) : undefined,
        endDate: endDate >= currentDate ? dayjs(initialValues?.endDate) : undefined,
        announcementPublicationPlaces: initialValues?.announcementPublicationPlaces,
        fileId: initialValues?.fileId,
        headText: initialValues.headText,
        announcementType: initialValues.announcementType.name,
        buttonName: initialValues?.buttonName,
        buttonUrl: initialValues?.buttonUrl,
        homePageContent: initialValues?.homePageContent,
        content: initialValues?.content,
      };
      form.setFieldsValue({ ...initialData });
      setAnnouncementInfoData(initialValues.id);
      setFormData(form);
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
  const check = async () => {
    if (urlRef?.current?.input?.value != '' || nameRef?.current?.input?.value != '') {
      setRequired(true);
    } else {
      setRequired(false);
    }
  };
  const handleChange = async (value) => {
    console.log(`selected ${value}`);
    setSelectedPlaces(value);
  };
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
      <AnnouncementIcon
        initialValues={initialValues}
        announcementInfoData={announcementInfoData}
        setFormData={setFormData}
        updated={updated}
        setUpdated={setUpdated}
        fileImage={fileImage}
        setFileImage={setFileImage}
      />

      <CustomFormItem
        label={<Text t="Buton İsmi" />}
        name="buttonName"
        rules={[
          {
            required: required,
            message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
          },
        ]}
        onChange={() => {
          check();
        }}
      >
        <CustomInput ref={nameRef} placeholder={'Buton İsmi'} />
      </CustomFormItem>

      <CustomFormItem
        label={<Text t="Buton Url" />}
        name="buttonUrl"
        rules={[
          {
            required: required,
            message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
          },
          {
            type: 'url',
            message: 'Lütfen geçerli bir URL giriniz',
          },
        ]}
        onChange={() => {
          check();
        }}
      >
        <CustomInput ref={urlRef} placeholder={'https://ButonUrl.com'} />
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
      <CustomFormItem
        rules={[
          {
            required: true,
            message: 'Lütfen Zorunlu Alanları Doldurunuz.',
          },
        ]}
        label="Yayınlanma Yeri"
        name="announcementPublicationPlaces"
      >
        <CustomSelect
          placeholder="Seçiniz"
          mode="multiple"
          showArrow
          onChange={handleChange}
          // className={classes.select}
          style={{
            width: '100%',
          }}
          // onChange={onSecondSelectChange}
        >
          {formPublicationPlaces.map((item, i) => {
            return (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            );
          })}
        </CustomSelect>
      </CustomFormItem>
      { selectedPlaces?.includes(3) && (<CustomFormItem label={false} name="isReadCheckbox" className="custom-form-item" valuePropName="checked">
        <CustomCheckbox 
        // onChange={handleChangeSurveyOption}
        //  checked={selectedSurveyOption === 'after'} 
         
         value="true">
          Okundu onayı alınsın
        </CustomCheckbox>
      </CustomFormItem>)}
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
