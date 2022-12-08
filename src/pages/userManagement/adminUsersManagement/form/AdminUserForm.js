import { Form } from 'antd';
import { confirmDialog, CustomButton, CustomForm, CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, CustomTextInput, errorDialog, Option, successDialog, Text } from '../../../../components';
import { formMailRegex, formPhoneRegex } from '../../../../utils/formRule';
import '../../../../styles/adminUserManagement/adminUserForm.scss';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { status } from '../../../../constants';
import { getUnmaskedPhone, maskedPhone, turkishToLower } from '../../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGroupsList } from '../../../../store/slice/groupsSlice';
import { useParams } from 'react-router-dom';
import { addAdminUser, editAdminUser, getByAdminUserId } from '../../../../store/slice/adminUserSlice';

const AdminUserForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const { groupsList } = useSelector((state) => state?.groups);
  const { adminUsers } = useSelector((state) => state?.adminUsers);

  useEffect(() => {
    if (groupsList.length) return false;
    dispatch(getGroupsList());
  }, []);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        let user = adminUsers.find((item) => item.id === Number(id));

        if (!user) {
          const action = await dispatch(getByAdminUserId(id));
          if (getByAdminUserId?.fulfilled?.match(action)) {
            user = action?.payload?.data;
          } else {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
            history.push('/admin-users-management/list');
          }
        }

        form.setFieldsValue({ ...user, mobilePhones: maskedPhone(user?.mobilePhones), groupIds: user?.groups?.map((i) => i.id) });
      })();
    }
  }, []);

  const onFinish = async () => {
    const values = await form.validateFields();
    delete values?.userName;
    values.mobilePhones = getUnmaskedPhone(values.mobilePhones);
    if (isEdit) values.id = id;
    const data = { admin: values };

    const action = isEdit ? await dispatch(editAdminUser(data)) : await dispatch(addAdminUser(data));
    if (isEdit ? editAdminUser.fulfilled.match(action) : addAdminUser.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload?.message,
        onOk: async () => {
          history.push('/admin-users-management/list');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/admin-users-management/list');
      },
    });
  };

  return (
    <div className="add-admin-user-container">
      <CustomForm labelCol={{ flex: '130px' }} autoComplete="off" className="add-admin-user-form" layout="horizontal" labelWrap labelAlign="left" colon={false} form={form} name="form">
        <div className="left">
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

          {isEdit && (
            <CustomFormItem label="Kullanıcı Adı" name="userName">
              <CustomTextInput disabled placeholder="Kullanıcı Adı" />
            </CustomFormItem>
          )}

          <CustomFormItem
            label="E-Mail"
            name="email"
            rules={[
              { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
              { validator: formMailRegex, message: <Text t="enterValidEmail" /> },
            ]}
          >
            <CustomInput placeholder="E-Mail" />
          </CustomFormItem>

          <CustomFormItem
            rules={[
              { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
              { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' },
            ]}
            label="Cep Telefonu"
            name="mobilePhones"
          >
            <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
              <CustomInput placeholder="Cep Telefonu" />
            </CustomMaskInput>
          </CustomFormItem>
        </div>

        <div className="right">
          <CustomFormItem rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]} label="Rol" name="groupIds">
            <CustomSelect filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))} showArrow mode="multiple" placeholder="Rol">
              {groupsList
                // ?.filter((item) => item.isActive)
                ?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.groupName}
                    </Option>
                  );
                })}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]} label="Durum" name="status">
            <CustomSelect placeholder="Seçiniz">
              {status.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </div>
      </CustomForm>

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

export default AdminUserForm;
