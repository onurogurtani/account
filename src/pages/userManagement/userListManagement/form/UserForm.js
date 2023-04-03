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
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../../components';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../../../utils/formRule';
import OptionalUserInformationFormSection from './OptionalUserInformationFormSection';
import '../../../../styles/userManagement/userForm.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTypesList } from '../../../../store/slice/userTypeSlice';
import { userTypeCode } from '../../../../constants/users';
import { getUnmaskedPhone, maskedPhone } from '../../../../utils/utils';
import { useParams } from 'react-router-dom';
import { addUser, editUser } from '../../../../store/slice/userListSlice';

const UserForm = ({ isEdit, currentUser }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userTypes } = useSelector((state) => state?.userType);

    const [selectedUserTypeCode, setSelectedUserTypeCode] = useState();
    const { Title } = Typography;

    useEffect(() => {
        if (Object.keys(userTypes).length) return false;
        dispatch(getUserTypesList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (isEdit && currentUser) {
            const selectedUserCode = userTypes?.find((i) => i.id === Number(currentUser?.userTypeId))?.code;
            selectedUserCode && setSelectedUserTypeCode(selectedUserCode);
            form.setFieldsValue({
                ...currentUser,
                userTypeId: Number(currentUser?.userTypeId),
                mobilePhones: maskedPhone(currentUser?.mobilePhones),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, userTypes]);

    const onChangeUserType = (value, { key }) => {
        setSelectedUserTypeCode(key);
    };

    const onFinish = async () => {
        const values = await form.validateFields();
        console.log(values);
        values.mobilePhones = getUnmaskedPhone(values.mobilePhones);
        if (isEdit) {
            values.id = id;
            // values.diplomaGrade = parseFloat(values.diplomaGrade);
        }
        const data = values;

        const action = isEdit ? await dispatch(editUser(data)) : await dispatch(addUser(data));
        if (isEdit ? editUser.fulfilled.match(action) : addUser.fulfilled.match(action)) {
            successDialog({
                title: <Text t="success" />,
                message: action?.payload?.message,
                onOk: async () => {
                    history.push('/user-management/user-list-management/list');
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
                history.push('/user-management/user-list-management/list?filter=true');
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
    const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };

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
                        ? selectedUserTypeCode === userTypeCode.student
                            ? { gridTemplateRows: 'repeat(11, 1fr)' }
                            : { gridTemplateRows: 'repeat(7, 1fr)' }
                        : null
                }
                labelAlign="left"
                colon={false}
                form={form}
                validateMessages={validateMessages}
                name="form"
            >
                <CustomFormItem rules={[{ required: true }]} label="Kullanıcı Türü" name="userTypeId">
                    <CustomSelect onChange={onChangeUserType} placeholder="Seçiniz">
                        {userTypes
                            .filter((i) => i.recordStatus === 1)
                            .map((item) => (
                                <Option key={item.code} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem
                    rules={[
                        { required: true },
                        { validator: tcknValidator, message: 'Lütfen geçerli T.C. kimlik numarası giriniz.' },
                    ]}
                    label="TC Kimlik Numarası"
                    name="citizenId"
                >
                    <CustomMaskInput maskPlaceholder={null} mask={'99999999999'}>
                        <CustomInput placeholder="TC Kimlik Numarası" />
                    </CustomMaskInput>
                </CustomFormItem>

                <CustomFormItem label="Ad" name="name" rules={[{ required: true }, { whitespace: true }]}>
                    <CustomTextInput placeholder="Ad" />
                </CustomFormItem>

                <CustomFormItem label="Soyad" name="surName" rules={[{ required: true }, { whitespace: true }]}>
                    <CustomTextInput placeholder="Soyad" />
                </CustomFormItem>

                <CustomFormItem
                    rules={[{ required: true }, { validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
                    label="Telefon Numarası"
                    name="mobilePhones"
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
                {isEdit && (
                    <OptionalUserInformationFormSection form={form} selectedUserTypeCode={selectedUserTypeCode} />
                )}
            </CustomForm>
            {isEdit && selectedUserTypeCode && (
                <>
                    <Title level={3}>
                        {selectedUserTypeCode === userTypeCode.student
                            ? 'Veli Bilgileri'
                            : 'Satın Alınan Paket Bilgileri'}{' '}
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
                        columns={
                            selectedUserTypeCode === userTypeCode.student ? columnsStudentParents : columnsPackages
                        }
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
