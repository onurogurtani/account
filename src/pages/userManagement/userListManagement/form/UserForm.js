import { Form, Typography } from 'antd';
import {
  confirmDialog,
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  CustomTable,
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
import { useHistory } from 'react-router-dom';

const UserForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { Title } = Typography;
  const { pathname } = useLocation();

  const [userTypeId, setUserTypeId] = useState();
  const isEdit = pathname.includes('edit');

  const onChangeUserType = (value) => {
    setUserTypeId(value);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.diplomaGrade = parseFloat(values.diplomaGrade);
    console.log(values);
  };
  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/user-management/user-list-management/list');
      },
    });
  };

  const columnsStudentParents = [
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Soyad',
      dataIndex: 'surName',
      key: 'surName',
    },
    {
      title: 'TC Kimlik No',
      dataIndex: 'tc',
      key: 'tc',
    },
    {
      title: 'E-Mail',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];
  const columnsPackages = [
    {
      title: 'Paketler',
      dataIndex: 'packages',
      key: 'name',
      width: 200,
    },
    {
      title: 'Öğrenci',
      children: [
        {
          title: 'Ad',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Soyad',
          dataIndex: 'surName',
          key: 'surName',
        },
        {
          title: 'TC Kimlik No',
          dataIndex: 'tc',
          key: 'tc',
        },
      ],
    },
  ];
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
      {isEdit && userTypeId && (
        <>
          <Title level={3}>
            {userTypeId === 1 ? 'Veli Bilgileri' : 'Satın Alınan Paket Bilgileri'}{' '}
          </Title>
          <CustomTable
            dataSource={[
              {
                name: 'Ahmet',
                packages: 'TYT Matematik',
                surName: 'Ünlü',
                tc: '76543456788',
                phone: '05455555555',
                mail: 'mail',
              },
            ]}
            columns={userTypeId === 1 ? columnsStudentParents : columnsPackages}
            pagination={false}
            rowKey={(record) => `add-user-form-${record?.id}`}
            scroll={{ x: false }}
          />
        </>
      )}
      <div className="add-user-footer">
        <CustomButton type="primary" className="cancel-btn" onClick={onCancel}>
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
