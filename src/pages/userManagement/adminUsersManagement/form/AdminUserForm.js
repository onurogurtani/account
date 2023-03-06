import { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomMaskInput,
    CustomSelect,
    CustomTextInput,
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../../components';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../../../utils/formRule';
import { useHistory, useParams } from 'react-router-dom';
import { status } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsList } from '../../../../store/slice/groupsSlice';
import { addAdminUser, editAdminUser } from '../../../../store/slice/adminUserSlice';
import { getUnmaskedPhone, maskedPhone, turkishToLower } from '../../../../utils/utils';
import '../../../../styles/adminUserManagement/adminUserForm.scss';
import { adminTypes } from '../../../../constants/adminUsers';

const AdminUserForm = ({ isEdit, currentAdminUser }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { allGroupList } = useSelector((state) => state?.groups);
    const { adminTypeEnum } = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (allGroupList.length) return false;
        dispatch(getGroupsList());
    }, []);

    useEffect(() => {
        if (isEdit && currentAdminUser) {
            form.setFieldsValue({
                ...currentAdminUser,
                mobilePhones: maskedPhone(currentAdminUser?.mobilePhones),
                groupIds: currentAdminUser?.groups?.map((i) => i.id),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAdminUser]);

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
            errorDialog({ title: <Text t="error" />, message: action?.payload?.message });
        }
    };

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                history.push('/admin-users-management/list?filter=true');
            },
        });
    };
    const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };

    return (
        <div className="add-admin-user-container">
            <CustomForm
                labelCol={{ flex: '170px' }}
                autoComplete="off"
                className="add-admin-user-form"
                layout="horizontal"
                labelWrap
                labelAlign="left"
                colon={false}
                form={form}
                validateMessages={validateMessages}
                name="form"
            >
                <div className="left">
                    <CustomFormItem
                        rules={[{ required: true }, { validator: tcknValidator, message: '11 Karakter İçermelidir' }]}
                        label="TC Kimlik Numarası"
                        name="citizenId"
                    >
                        <CustomMaskInput maskPlaceholder={null} mask={'99999999999'}>
                            <CustomInput placeholder="TC Kimlik Numarası" />
                        </CustomMaskInput>
                    </CustomFormItem>

                    {isEdit && (
                        <CustomFormItem label="Kullanıcı Adı" name="userName">
                            <CustomTextInput disabled placeholder="Kullanıcı Adı" />
                        </CustomFormItem>
                    )}

                    <CustomFormItem label="Ad" name="name" rules={[{ required: true }, { whitespace: true }]}>
                        <CustomTextInput placeholder="Ad" />
                    </CustomFormItem>

                    <CustomFormItem label="Soyad" name="surName" rules={[{ required: true }, { whitespace: true }]}>
                        <CustomTextInput placeholder="Soyad" />
                    </CustomFormItem>

                    <CustomFormItem
                        label="E-Mail"
                        name="email"
                        rules={[
                            { required: true },
                            {
                                validator: formMailRegex,
                                message: <Text t="enterValidEmail" />,
                            },
                        ]}
                    >
                        <CustomInput placeholder="E-Mail" />
                    </CustomFormItem>
                </div>

                <div className="right">
                    <CustomFormItem
                        rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
                        label="Cep Telefonu"
                        name="mobilePhones"
                    >
                        <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
                            <CustomInput placeholder="Cep Telefonu" />
                        </CustomMaskInput>
                    </CustomFormItem>

                    <CustomFormItem
                        rules={[{ required: true }]}
                        initialValue={adminTypeEnum === 2 ? 2 : undefined}
                        label="Admin Tipi"
                        name="adminTypeEnum"
                    >
                        <CustomSelect placeholder="Seçiniz">
                            {adminTypes
                                ?.filter((u) => u.accessType.includes(adminTypeEnum))
                                ?.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem rules={[{ required: true }]} label="Rol" name="groupIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            mode="multiple"
                            placeholder="Rol"
                        >
                            {allGroupList
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

                    <CustomFormItem rules={[{ required: true }]} label="Durum" name="status">
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
