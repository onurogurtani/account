import { Alert, Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomMaskInput,
  CustomTextInput,
  errorDialog,
  Text,
  useText,
} from '../../components';
import warning from '../../assets/icons/icon-profil-warning.svg';
import { useCallback, useEffect, useState } from 'react';
import { formMailRegex, formPhoneRegex, nameSurnameValidator } from '../../utils/formRule';
import { profileAlertKey } from '../../utils/keys';
import { useSelector } from 'react-redux';

const PersonalInformation = ({ handleUpdate }) => {
  const { currentUser } = useSelector((state) => state?.user);
  const [form] = Form.useForm();
  const [alertIsVisible, setAlertIsVisible] = useState(true);

  useEffect(() => {
    const isAlertVisible = window.localStorage.getItem(profileAlertKey);
    if (isAlertVisible) {
      setAlertIsVisible(false);
    }
  }, []);

  const onFinish = useCallback(
    (values) => {
      try {
        const body = {
          id: currentUser?.id,
          // name: values?.name,
          // surName: values?.surName,
          userName: values?.userName,
          nameSurname: values?.nameSurname,
          mobilePhones: values.mobilePhones
            .replace(/\)/g, '')
            .replace(/\(/g, '')
            .replace(/-/g, '')
            .replace(/ /g, ''),
          email: values?.email,
        };

        handleUpdate(body);
      } catch (error) {
        errorDialog({
          title: <Text t="error" />,
          message: error?.message,
        });
      }
    },
    [currentUser, handleUpdate],
  );

  const onCancel = useCallback(() => {
    form.setFieldsValue({
      // name: currentUser?.name,
      // surName: currentUser?.surName,
      nameSurname: currentUser?.nameSurname,
      userName: currentUser?.userName,
      mobilePhones: currentUser?.mobilePhones,
      email: currentUser?.email,
    });
  }, [currentUser, form]);

  const onClickAlert = useCallback(() => {
    window.localStorage.setItem(profileAlertKey, 'true');
    setAlertIsVisible(false);
  }, []);

  return (
    <div>
      <div className="header-content">
        <h4>
          {' '}
          <Text t="personalInfo" />
        </h4>
      </div>
      <div className="personal-information-form">
        {alertIsVisible && (
          <Alert
            message={
              <div className="alert-message-contain">
                <CustomImage src={warning} />
                <Text t="personalInfoAlertMessage" />
              </div>
            }
            banner
            showIcon={false}
            className="custom-alert-warning"
            closable
            onClose={onClickAlert}
          />
        )}

        <div className="personal-form">
          <CustomForm
            name="personalInformation"
            onFinish={onFinish}
            form={form}
            initialValues={{
              nameSurname: currentUser?.nameSurname,
              // surName: currentUser?.surName,
              userName: currentUser?.userName,
              mobilePhones: currentUser?.mobilePhones,
              email: currentUser?.email,
            }}
            awaitLoading={!currentUser?.id}
            autoComplete="off"
            layout={'vertical'}
          >
            <div className="row ">
              <div className="col-md-6">
                {/* <CustomFormItem
                  label={<Text t="name" />}
                  name="name"
                  rules={[{ required: true, message: <Text t="pleaseEnterName" /> }]}
                >
                  <CustomTextInput placeholder={useText('name')} />
                </CustomFormItem> */}
              </div>

              <div className="col-md-6">
                {/* <CustomFormItem
                  label={<Text t="surname" />}
                  name="surName"
                  rules={[{ required: true, message: <Text t="pleaseEnterSurname" /> }]}
                >
                  <CustomTextInput placeholder={useText('surname')} />
                </CustomFormItem> */}
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <CustomFormItem label={<Text t="loginUserName" />} name="userName">
                  <CustomInput disabled placeholder={useText('loginUserName')} />
                </CustomFormItem>
              </div>

              <div className="col-md-6">
                <CustomFormItem
                  label="Ad Soyad"
                  name="nameSurname"
                  rules={[
                    { required: true, message: 'Lütfen Ad Soyad Giriniz.' },
                    {
                      validator: nameSurnameValidator,
                      message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                    },
                  ]}
                >
                  <CustomTextInput placeholder={useText('name')} />
                </CustomFormItem>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <CustomFormItem
                  label={<Text t="emailAdress" />}
                  name="email"
                  rules={[
                    { required: true, message: <Text t="pleaseEnterEmail" /> },
                    { validator: formMailRegex, message: <Text t="enterValidEmail" /> },
                  ]}
                >
                  <CustomInput placeholder={useText('email')} />
                </CustomFormItem>
              </div>
            </div>

            <CustomFormItem className="custom-form-footer">
              <CustomButton className="custom-btn-cancel" onClick={onCancel}>
                <span className="submit">
                  <Text t="cancel" />
                </span>
              </CustomButton>
              <CustomButton className="custom-btn-primary" type="primary" htmlType="submit">
                <span className="submit">
                  <Text t="updateBtn" />
                </span>
              </CustomButton>
            </CustomFormItem>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
