import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
  CustomNumberInput,
  Option,
  Text,
} from '../../../components';
import CitySelector from '../../../components/CitySelector';
import CountySelector from '../../../components/CountySelector';
import { segmentInformation } from '../../../constants/organisation';
import { getOrganisationTypes } from '../../../store/slice/organisationTypesSlice';
import { formMailRegex, formPhoneRegex } from '../../../utils/formRule';
import { onChangeActiveStep } from '../../../store/slice/organisationsSlice';
import '../../../styles/organisationManagement/organisationForm.scss';

const OrganisationForm = ({ form, organizationData, isEdit, sendValue }) => {
  const dispatch = useDispatch();
  const { organisationTypes } = useSelector((state) => state.organisationTypes);
  const [selectedCityId, setSelectedCityId] = useState();

  useEffect(() => {
    dispatch(getOrganisationTypes());
  }, []);

  useEffect(() => {
    if (Object.keys(organizationData).length > 0) {
      form.setFieldsValue(organizationData)
      isEdit && setSelectedCityId(organizationData?.cityId);
    }
  }, [organizationData]);

  const onFinish = (values) => {
    sendValue(values);
    dispatch(onChangeActiveStep(1));
  }
  const onCityChange = (value) => {
    setSelectedCityId(value);
    form.resetFields(['countyId']);
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
        name="form"
        onFinish={onFinish}
      >
        <CustomFormItem label="Kurum Adı" name="name" rules={[{ required: true }, { whitespace: true }]}>
          <CustomInput placeholder="Kurum Adı" />
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
          rules={[
            { required: true },
            { type: 'number' },
          ]}
        >
          <CustomNumberInput maxlength={10} placeholder="Müşteri Numarası" />
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
            {segmentInformation?.map((item) => {
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

      </CustomForm>
    </div>
  );
};

export default OrganisationForm;
