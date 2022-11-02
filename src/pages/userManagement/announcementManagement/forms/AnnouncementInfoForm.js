import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import {
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomTimePicker,
  CustomSelect,
  Option,
  Text,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import AddAnnouncementFooter from '../addAnnouncement/AddAnnouncementFooter';
import EditAnnouncementFooter from '../editAnnouncement/EditAnnouncementFooter';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';

const AnnouncementInfoForm = ({
  setAnnouncementInfoData,
  setStep,
  history,
  initialValues,
  selectedRole,
  announcementInfoData,
  setFormData,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { announcementTypes } = useSelector((state) => state?.announcement);
  const dispatch = useDispatch();
  const [quillValue, setQuillValue] = useState('');

  useEffect(() => {
    dispatch(getByFilterPagedAnnouncementTypes());
    initialValues && setFormData(form);
    initialValues && setAnnouncementInfoData(initialValues);
  }, []);

  if (initialValues) {
    initialValues = {
      ...initialValues,
      endDate: dayjs(initialValues?.endDate),
      endHour: dayjs(initialValues?.endDate),
      startDate: dayjs(initialValues?.startDate),
      startHour: dayjs(initialValues?.startDate),
    };
  }
  const justDateEdit = location?.state?.justDateEdit;
  useEffect(() => {
    justDateEdit && form.validateFields(['startDate', 'endDate']);
  }, []);
  const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
  const text = Form.useWatch('text', form);
  useEffect(() => {
    if (text === '<p><br></p>' || text === '') {
      setIsErrorReactQuill(true);
    } else {
      setIsErrorReactQuill(false);
    }
  }, [text]);

  // const hoursArray= Array.from({length: 24}, (_, i) => i + 1)
  // console.log(hoursArray);
  // const minutesArray= Array.from({length: 60}, (_, i) => i)
  // console.log(minutesArray);

  // const disabledStartHour = (value) => {

  //   if(endDate === startDate){
  //     return value?.startOf('second') < endTime?.startOf('second')
  //   }

  //   // return (
  //   //   value?.startOf('second') < startHour?.startOf('second') || value < dayjs().startOf('second')
  //   // );
  // };

  const disabledStartDateTime = () => {
    const { startHour } = form?.getFieldsValue(['startHour']);
    const startTime = dayjs(startHour)?.format('HH:mm');
    const { endHour } = form?.getFieldsValue(['endHour']);
    const endTime = dayjs(endHour)?.format('HH:mm');
    const { endDate } = form?.getFieldsValue(['endDate']);
    const { startDate } = form?.getFieldsValue(['startDate']);
    // const disabledHours= () => {
    //   if (startDate == endDate){

    //   }
  };

  // const disabledEndDateArea= ()=>{
  //     if(form?.getFieldsValue(['startDate']== undefined )){
  //       return disabled
  //     } }

  //   const disabledMinutes= () => {
  //     return
  //   }
  // }

  // const disabledEndHour = (value) => {
  //   const { endHour } = form?.getFieldsValue(['endHour']);
  //   return (
  //     value?.startOf('second') > endHour?.startOf('second') || value < dayjs().startOf('second')
  //   );
  // };
  // const dateHandler= ()=>{
  //   const { startHour } = form?.getFieldsValue(['startHour'])
  //   console.log(startHour);
  //   let hnc= dayjs(startHour )?.format('HH:mm');
  //   console.log(hnc);
  // }

  const disabledStartDate = (startValue) => {
    const { endDate } = form?.getFieldsValue(['endDate']);
    return (
      startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day')
    );
  };

  const disabledEndDate = (endValue) => {
    const { startDate } = form?.getFieldsValue(['startDate']);

    return (
      endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day')
    );
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
        label={<Text t="Duyuru Tipi" />}
        name="announcementType"
        style={{ width: '100%' }}
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomSelect
          className="form-filter-item"
          placeholder={'Seçiniz'}
          style={{ width: '100%' }}
        >
          {announcementTypes?.map(({ id, name }, index) => (
            <Option id={id} key={index} value={name}>
              <Text t={name} />
            </Option>
          ))}
        </CustomSelect>
      </CustomFormItem>
      <CustomFormItem
        label={<Text t="Başlık" />}
        name="headText"
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput disabled={justDateEdit && true} placeholder={'Başlık'} />
      </CustomFormItem>

      <CustomFormItem
        className="editor"
        label={<Text t="İçerik" />}
        name="text"
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
            message: 'En fazla 2500 karakter içermelidir.',
          },
        ]}
      >
        <ReactQuill
          readOnly={justDateEdit && true}
          className={isErrorReactQuill ? 'quill-error' : ''}
          theme="snow"
        />
      </CustomFormItem>

      <CustomFormItem
        label={<Text t="Duyuru Anasayfa Metni" />}
        name="mainPageText"
        placeholder={
          'Bu alana girilen veri anasayfa, tüm duyurular sayfası ve pop-uplarda gösterilecek özet bilgi metnidir.'
        }
        rules={[
          { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
          { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
        ]}
      >
        <CustomInput
          disabled={justDateEdit && true}
          placeholder={'Yeni duyurunuz ile ilgili özet metin'}
        />
      </CustomFormItem>
      <Row
        gutter={16}
      >
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16  }}>
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
              //format="YYYY-MM-DD"
              disabledDate={disabledStartDate}
              format="YYYY-MM-DD HH:mm"
              //disabledDate={disabledDate}
              //disabledTime={disabledDateTime}
              showTime={true}
            />
          </CustomFormItem>
        </Col>
        {/* <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 10 }}>
          <CustomFormItem
            name="startHour"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomTimePicker
              showNow={false}
              format="HH:mm"
              placeholder={'Başlangıç Saati'}
              // disabledTime={disabledStartDateTime}
              // disabledMinutes={minutesHandler}
              // onChange={dateHandler}
              // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </CustomFormItem>
        </Col> */}
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
              //format="YYYY-MM-DD"
              disabledDate={disabledStartDate}
              format="YYYY-MM-DD HH:mm"
              //disabledDate={disabledDate}
              //disabledTime={disabledDateTime}
              showTime={true}
            />
          </CustomFormItem>
        </Col>
        {/* <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 10 }}>
          <CustomFormItem
            name="endHour"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomTimePicker
              // disabledTime={disabledEndHour}
              showNow={false}
              format="HH:mm"
              placeholder={'Bitiş Saati'}
            />
          </CustomFormItem>
        </Col> */}
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
        />
      ) : (
        <EditAnnouncementFooter
          form={form}
          setAnnouncementInfoData={setAnnouncementInfoData}
          setStep={setStep}
          setIsErrorReactQuill={setIsErrorReactQuill}
          history={history}
          selectedRole={selectedRole}
          announcementInfoData={announcementInfoData}
          currentId={initialValues.id}
        />
      )}
    </CustomForm>
  );
};

export default AnnouncementInfoForm;
