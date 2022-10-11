import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomNumberInput,
  CustomPageHeader,
  CustomMaskInput,
  CustomSelect,
  CustomCollapseCard,
  successDialog,
  errorDialog,
  Text,
  useText,
  Option,
} from '../../../components';
import { Form } from 'antd';
import { formPhoneRegex, formMailRegex } from '../../../utils/formRule';
import '../../../styles/userInfo/userInfo.scss';
import { addUserList } from '../../../store/slice/userListSlice';
import { useDispatch } from 'react-redux';

const AddUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values) => {
      const data = {
        entity: {
          name: values.name.trim(),
          surName: values.surName.trim(),
          userName: values.userName,
          citizenId: values.citizenId,
          email: values.email,
          mobilePhones: values.mobilePhones
            .replace(/\)/g, '')
            .replace(/\(/g, '')
            .replace(/-/g, '')
            .replace(/ /g, '')
            .replace(/\+90/g, ''),
          status: values.status,
          birthDate: '2022-07-19T10:35:12.410Z',
          gender: '',
          recordDate: '2022-07-19T10:35:12.410Z',
          address: 'string',
          notes: 'string',
          updateContactDate: '2022-07-19T10:35:12.410Z',
          contactBySMS: true,
          contactByMail: true,
          contactByCall: true,
          userCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          authenticationProviderType: 'string',
        },
      };
      const action = await dispatch(addUserList(data));
      if (addUserList.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            history.push('/user-management/user-list-management');
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    },
    [dispatch],
  );

  const onchannelChange = (value) => {
    switch (value) {
      case 'true':
        form.setFieldsValue({ status: true });
        return;
      case 'false':
        form.setFieldsValue({ status: false });
    }
  };
  return (
    <CustomPageHeader title={<Text t="Kullanıcı Yönetimi" />} showBreadCrumb showHelpButton>
      <CustomCollapseCard className="edit-user-card" cardTitle={<Text t="Kullanıcı Ekleme" />}>
        <div className="userInfo-container">
          <CustomForm
            name="studentInfo"
            className="userInfo-link-form"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            autoComplete="off"
            layout={'horizontal'}
          >
            <CustomFormItem
              label={<Text t="Adı" />}
              name="name"
              rules={[
                { required: true, message: <Text t="Bilgilerinizi kontrol ediniz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomInput placeholder={useText('Adı')} />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Soyadı" />}
              name="surName"
              rules={[
                { required: true, message: <Text t="Bilgilerinizi kontrol ediniz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
              ]}
            >
              <CustomInput placeholder={useText('Soyadı')} />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Kullanıcı Adı" />}
              name="userName"
              rules={[
                { required: true, message: <Text t="Kullanıcı adı giriniz." /> },
                { whitespace: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                {
                  pattern: new RegExp('^[a-zA-Z0-9!@#$%^&*]+$'),
                  message: 'Seçtiğiniz Kullanıcı Adı uygun değil.',
                },
              ]}
            >
              <CustomInput placeholder={useText('Kullanıcı Adı')} />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="TC Kimlik Numarası" />}
              name="citizenId"
              rules={[
                { required: true, message: <Text t="TC Kimlik numaranızı kontrol ediniz." /> },
                { type: 'number', min: 1000000000, message: <Text t="11 karakter olmalı" /> },
              ]}
            >
              <CustomNumberInput autoComplete="off" maxLength={11} placeholder={useText('TCKN')} />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="E-posta adresi" />}
              name="email"
              rules={[
                { required: true, message: <Text t="checkEposta" /> },
                { validator: formMailRegex, message: <Text t="enterValidEmail" /> },
              ]}
            >
              <CustomInput placeholder={useText('E-posta adresi Giriniz')} />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="phoneNumber" />}
              name="mobilePhones"
              rules={[
                { required: true, message: <Text t="pleaseEnterPhone" /> },
                { validator: formPhoneRegex, message: <Text t="enterValidPhoneNumber" /> },
              ]}
            >
              <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
                <CustomInput placeholder={useText('phoneNumber')} />
              </CustomMaskInput>
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Durum" />}
              name="status"
              rules={[{ required: true, message: <Text t="Durum seçiniz." /> }]}
            >
              <CustomSelect
                placeholder="Durum seçiniz..."
                optionFilterProp="children"
                onChange={onchannelChange}
              >
                <Option value={true}>Aktif</Option>
                <Option value={false}>Pasif</Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem className="footer-form-item">
              <CustomButton
                className="back-btn"
                onClick={() => history.push('/user-management/user-list-management')}
              >
                İptal
              </CustomButton>
              <CustomButton type="primary" htmlType="submit" className="submit-btn">
                Kaydet
              </CustomButton>
            </CustomFormItem>
          </CustomForm>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AddUser;
