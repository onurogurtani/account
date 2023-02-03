import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
  Option,
  Text,
} from '../../../components';
import CitySelector from '../../../components/CitySelector';
import CountySelector from '../../../components/CountySelector';
import { segmentInformations } from '../../../constants/organisation';
import { getOrganisationTypes } from '../../../store/slice/organisationTypesSlice';
import { formMailRegex, formPhoneRegex } from '../../../utils/formRule';
import '../../../styles/organisationManagement/organisationForm.scss';
import { useHistory, useParams } from 'react-router-dom';
import { getByOrganisationId } from '../../../store/slice/organisationsSlice';
import { maskedPhone } from '../../../utils/utils';

const OrganisationForm = ({ onFinish, isEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { organisationTypes } = useSelector((state) => state.organisationTypes);
  const [selectedCityId, setSelectedCityId] = useState();

  useEffect(() => {
    dispatch(getOrganisationTypes());
    isEdit && loadByOrganisationId();
  }, []);

  const loadByOrganisationId = async () => {
    try {
      const action = await dispatch(getByOrganisationId({ Id: id })).unwrap();
      form.setFieldsValue({ ...action?.data, contactPhone: maskedPhone(action?.data?.contactPhone) });
      setSelectedCityId(action?.data?.cityId);
    } catch (err) {
      history.push('/organisation-management/list');
    }
  };
  const onCityChange = (value) => {
    setSelectedCityId(value);
    form.resetFields(['countyId']);
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/organisation-management/list');
      },
    });
  };

  const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };
  return (
    <div className="organisation-form">
      <CustomForm
        labelCol={{ flex: '200px' }}
        autoComplete="off"
        layout="horizontal"
        labelWrap
        labelAlign="left"
        colon={false}
        form={form}
        validateMessages={validateMessages}
        onFinish={onFinish}
        name="form"
      >
        <CustomFormItem label="Kurum Adı" name="name" rules={[{ required: true }, { whitespace: true }]}>
          <CustomTextInput placeholder="Kurum Adı" />
        </CustomFormItem>

        <CustomFormItem label="Kurum Türü" name="organisationTypeId" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz" style={{ width: '250px' }}>
            {organisationTypes?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Yöneticisi"
          name="organisationManager"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomTextInput placeholder="Kurum Yöneticisi" />
        </CustomFormItem>

        <CustomFormItem
          label="Müşteri Numarası"
          name="customerNumber"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomTextInput placeholder="Müşteri Numarası" />
        </CustomFormItem>

        <CustomFormItem
          label="Müşteri Yöneticisi"
          name="customerManager"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomTextInput placeholder="Müşteri Yöneticisi" />
        </CustomFormItem>

        <CustomFormItem label="Segment Bilgisi" name="segmentType" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz" style={{ width: '250px' }}>
            {segmentInformations?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.value}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <CitySelector
          onChange={onCityChange}
          name="cityId"
          rules={[{ required: true }]}
          label="Şehir"
          style={{ width: '450px' }}
        />

        <CountySelector
          cityId={selectedCityId}
          name="countyId"
          label="İlçe"
          style={{ width: '450px' }}
          rules={[{ required: true }]}
        />

        <CustomFormItem rules={[{ required: true }]} label="Kurum Adresi" name="organisationAddress">
          <CustomTextArea />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Kontakt Kişi"
          name="contactName"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomTextInput placeholder="Kurum Kontakt Kişi" />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Kontakt Mail"
          name="contactMail"
          rules={[
            { required: true },
            {
              validator: formMailRegex,
              message: <Text t="enterValidEmail" />,
            },
          ]}
        >
          <CustomInput placeholder="Kurum Kontakt Mail" />
        </CustomFormItem>

        <CustomFormItem
          rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
          label="Kurum Kontakt Telefon"
          name="contactPhone"
        >
          <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
            <CustomInput placeholder="Kurum Kontakt Telefon" />
          </CustomMaskInput>
        </CustomFormItem>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <CustomButton type="danger" onClick={onCancel}>
              İptal
            </CustomButton>
            <CustomButton style={{ marginLeft: '16px' }} type="primary" htmlType="submit">
              {isEdit ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
            </CustomButton>
          </Col>
        </Row>
      </CustomForm>
    </div>
  );
};

export default OrganisationForm;
