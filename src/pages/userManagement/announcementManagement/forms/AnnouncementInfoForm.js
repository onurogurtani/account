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
  Text,
} from '../../../../components';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import AddAnnouncementFooter from '../addAnnouncement/AddAnnouncementFooter';
import EditAnnouncementFooter from '../editAnnouncement/EditAnnouncementFooter';

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

  useEffect(() => {
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
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 14 }}>
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
              format="YYYY-MM-DD"
              disabledDate={disabledStartDate}
            />
          </CustomFormItem>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <CustomFormItem
            name="startHour"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomTimePicker showNow={false} format="HH:mm" placeholder={'Başlangıç Saati'} />
          </CustomFormItem>
        </Col>
      </Row>
      <Row className="ant-form-item-extra">
        Başlangıç Tarihi Duyurunun, Arayüzünden görüntüleneceği tarihi belirlemenizi sağlar.
      </Row>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 14 }}>
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
              format="YYYY-MM-DD"
            />
          </CustomFormItem>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <CustomFormItem
            name="endHour"
            rules={[{ required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> }]}
          >
            <CustomTimePicker showNow={false} format="HH:mm" placeholder={'Bitiş Saati'} />
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
