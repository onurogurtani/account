import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  CustomTextInput,
  Option,
  Text,
} from '../../../../components';
import { userType } from '../../../../constants/users';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../../../utils/formRule';
import OptionalUserInformationFormSection from './OptionalUserInformationFormSection';
import '../../../../styles/userManagement/userForm.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const UserForm = () => {
  const [form] = Form.useForm();
  const [userTypeId, setUserTypeId] = useState();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  const onChangeUserType = (value) => {
    setUserTypeId(value);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.diplomaGrade = parseFloat(values.diplomaGrade);
    console.log(values);
  };
  return (
    <div className="add-user-container">
      <CustomForm
        labelCol={{ flex: '180px' }}
        autoComplete="off"
        className="add-user-form"
        layout="horizontal"
        labelWrap
        style={
          isEdit
            ? userTypeId === 1
              ? { gridTemplateRows: 'repeat(11, 1fr)' }
              : { gridTemplateRows: 'repeat(7, 1fr)' }
            : null
        }
        labelAlign="left"
        colon={false}
        form={form}
        name="form"
      >
        <CustomFormItem
          rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
          label="Kullanıcı Türü"
          name="UserType"
        >
          <CustomSelect onChange={onChangeUserType} placeholder="Seçiniz">
            {userType.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>

        <CustomFormItem
          rules={[
            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            { validator: tcknValidator, message: '11 Karakter İçermelidir' },
          ]}
          label="TC Kimlik Numarası"
          name="citizenId"
        >
          <CustomMaskInput maskPlaceholder={null} mask={'99999999999'}>
            <CustomInput placeholder="TC Kimlik Numarası" />
          </CustomMaskInput>
        </CustomFormItem>

        <CustomFormItem
          label="Ad"
          name="name"
          rules={[
            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          ]}
        >
          <CustomTextInput placeholder="Ad" />
        </CustomFormItem>

        <CustomFormItem
          label="Soyad"
          name="surName"
          rules={[
            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          ]}
        >
          <CustomTextInput placeholder="Soyad" />
        </CustomFormItem>

        <CustomFormItem
          rules={[
            { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
            { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' },
          ]}
          label="Telefon Numarası"
          name="MobilePhones"
        >
          <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
            <CustomInput placeholder="Telefon Numarası" />
          </CustomMaskInput>
        </CustomFormItem>

        <CustomFormItem
          label="E-Mail"
          name="email"
          rules={[{ validator: formMailRegex, message: <Text t="enterValidEmail" /> }]}
        >
          <CustomInput placeholder="E-Mail" />
        </CustomFormItem>
        {isEdit && <OptionalUserInformationFormSection form={form} />}
      </CustomForm>

      <div className="add-event-footer">
        <CustomButton type="primary" className="cancel-btn">
          İptal
        </CustomButton>
        <CustomButton type="primary" className="save-btn" onClick={onFinish}>
          Kaydet
        </CustomButton>
      </div>
    </div>
  );
};

export default UserForm;
