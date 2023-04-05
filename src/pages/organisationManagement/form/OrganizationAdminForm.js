import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  CustomForm,
  CustomFormItem,
  CustomNumberInput,
  CustomTextInput,
  CustomMaskInput,
  CustomInput,
  Text,
} from '../../../components';
import { formMailRegex, formPhoneRegex } from '../../../utils/formRule';
import { onChangeActiveStep } from '../../../store/slice/organisationsSlice';
import '../../../styles/organisationManagement/organisationForm.scss';

const OrganizationAdminForm = ({ form, organizationAdminData, sendValue }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(organizationAdminData).length > 0) {
      form.setFieldsValue(organizationAdminData)
    }
  }, [organizationAdminData]);

  const onFinish = (values) => {
    sendValue(values);
    dispatch(onChangeActiveStep(3));
  }

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
        <CustomFormItem label="Kurum Admin Adı" name="adminName" rules={[{ required: true }, { whitespace: true }]}>
          <CustomTextInput placeholder="Kurum Admin Adı" />
        </CustomFormItem>

        <CustomFormItem label="Kurum Admin Soyadı" name="adminSurname" rules={[{ required: true }, { whitespace: true }]}>
          <CustomTextInput placeholder="Kurum Admin Adı" />
        </CustomFormItem>

        <CustomFormItem
          label={<Text t="Kurum Admin T.C" />}
          name="adminTc"
          rules={[
            { required: true, message: 'Lütfen Kurum Admin T.C kimlik no bilginizi giriniz.' },
            { type: 'number', min: 10000000000, message: '11 karakter olmalı' },
          ]}
        >
          <CustomNumberInput height="58" maxLength="11" placeholder="Kurum Admin T.C" />
        </CustomFormItem>

        <CustomFormItem
          label="Kurum Admin Maili"
          name="adminMail"
          rules={[
            { required: true },
            {
              validator: formMailRegex,
              message: <Text t="enterValidEmail" />,
            },
          ]}
        >
          <CustomInput placeholder="Kurum Admin Maili" />
        </CustomFormItem>

        <CustomFormItem
          rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
          label="Kurum Admin Telefonu"
          name="adminPhone"
        >
          <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
            <CustomInput placeholder="Kurum Admin Telefonu" />
          </CustomMaskInput>
        </CustomFormItem>
      </CustomForm>
    </div>
  );
};

export default OrganizationAdminForm;
