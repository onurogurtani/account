import React, { useCallback } from 'react'
import { useLocation, useHistory } from "react-router-dom";
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
  Option
} from '../../../components';
import { Form } from 'antd';
import { formPhoneRegex, formMailRegex } from "../../../utils/formRule"
import "../../../styles/userInfo/userInfo.scss"
import { updateUserList } from '../../../store/slice/userListSlice';
import { useDispatch } from 'react-redux';

const EditUser = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()

  const [form] = Form.useForm();

  const onFinish = useCallback( async (values) => {
      const data = {
        entity: {
          id: location?.state?.data?.id,
          name: values.name,
          surName: values.surName,
          userName: values.userName,
          citizenId: values.citizenId,
          email: values.email,
          mobilePhones: values.mobilePhones,
          status: values.status
        }
      }
      const action = await dispatch(updateUserList(data))
      if (updateUserList.fulfilled.match(action)) {
        successDialog({
          title: <Text t='success' />,
          message: action?.payload?.message,
          onOk: () => {
            history.push('/user-management/user-list-management')
          },
        });
      } else {
        errorDialog({
          title: <Text t='error' />,
          message: action?.payload?.message,
        });
      }
    },[dispatch]);

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
    <CustomPageHeader title={<Text t='Kullanıcı Yönetimi' />} showBreadCrumb showHelpButton>
      <CustomCollapseCard className='edit-user-card' cardTitle={<Text t='Kullanıcı Düzenleme' />}>
        <div className='userInfo-container'>
          <CustomForm
            name="studentInfo"
            className='userInfo-link-form'
            form={form}
            initialValues={location?.state?.data}
            onFinish={onFinish}
            autoComplete="off"
            layout={'horizontal'}
          >
            <CustomFormItem
              label={<Text t="Adı" />}
              name="name"
              rules={[{ required: true, message: <Text t="Bilgilerinizi kontrol ediniz." /> }]}
            >
              <CustomInput
                height="40px"
                placeholder={useText('Adı')}
              />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Soyadı" />}
              name="surName"
              rules={[{ required: true, message: <Text t="Bilgilerinizi kontrol ediniz." /> }]}
            >
              <CustomInput
                height="40px"
                placeholder={useText('Soyadı')}
              />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Kullanıcı Adı" />}
              name="userName"
              rules={[{ required: true, message: <Text t="Kullanıcı adı giriniz." /> }]}
            >
              <CustomInput
                height="40px"
                placeholder={useText('Kullanıcı Adı')}
              />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="TC Kimlik Numarası" />}
              name="citizenId"
              rules={[
                { required: true, message: <Text t="TC Kimlik numaranızı kontrol ediniz." /> },
              ]}
            >
              <CustomNumberInput
                autoComplete="off"
                height="40px"
                placeholder={useText('TCKN')}
              />
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="E-posta adresi" />}
              name="email"
              rules={[{ required: true, message: <Text t="checkEposta" /> },
              { validator: formMailRegex, message: <Text t="enterValidEmail" /> },
              ]}
            >
              <CustomInput
                height="40px"
                placeholder={useText('E-posta adresi Giriniz')} />
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
                <CustomInput height="40px" placeholder={useText('phoneNumber')} />
              </CustomMaskInput>
            </CustomFormItem>

            <CustomFormItem
              label={<Text t="Durum" />}
              name="status"
              rules={[{ required: true, message: <Text t="Durum seçiniz." /> }]}
            >
              <CustomSelect
                placeholder="durum seçiniz..."
                defaultValue={location?.state?.data?.status}
                optionFilterProp="children"
                onChange={onchannelChange}
                height="40px"
              >
                <Option value={true}>Aktif</Option>
                <Option value={false}>Pasif</Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem className='footer-form-item'>
              <CustomButton className='back-btn' onClick={() => history.push('/user-management/user-list-management')}>
                İptal
              </CustomButton>
              <CustomButton type="primary" htmlType="submit" className='submit-btn'>
                Kaydet
              </CustomButton>
            </CustomFormItem>
          </CustomForm>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>


  )
}

export default EditUser