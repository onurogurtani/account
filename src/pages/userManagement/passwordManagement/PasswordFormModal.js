import React, { useCallback, useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomNumberInput,
    CustomModal,
    CustomSelect,
    Option,
    errorDialog,
    successDialog,
    Text,
    CustomCheckbox,
    confirmDialog
} from '../../../components';
import '../../../styles/myOrders/paymentModal.scss'
import { useHistory } from 'react-router-dom';
import { setPasswordRuleAndPeriodValue } from '../../../store/slice/authSlice'

const PasswordFormModal = ({ modalVisible, handleModalVisible, isEdit, handleEdit, passwordRules, setPasswordRules }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const selectList = [
        { text: 'Yok', value: null },
        { text: '1 ay', value: 1 },
        { text: '2 ay', value: 2 },
        { text: '3 ay', value: 3 },
        { text: '4 ay', value: 4 },
        { text: '5 ay', value: 5 },
        { text: '6 ay', value: 6 },
        { text: '7 ay', value: 7 },
        { text: '8 ay', value: 8 },
        { text: '9 ay', value: 9 },
        { text: '10 ay', value: 10 },
        { text: '11 ay', value: 11 },
        { text: '12 ay', value: 12 },
    ];

    useEffect(() => {
        if (modalVisible) {
            if (isEdit) {
                form.setFieldsValue({
                    minCharacter: passwordRules.minCharacter,
                    maxCharacter: passwordRules.maxCharacter,
                    hasUpperChar: passwordRules.hasUpperChar,
                    hasLowerChar: passwordRules.hasLowerChar,
                    hasNumber: passwordRules.hasNumber,
                    hasSymbol: passwordRules.hasSymbol,
                    passwordPeriod: passwordRules.passwordPeriod
                });
                handleEdit(true);
            }
        }
    }, [modalVisible]);

    const handleClose = useCallback(() => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: () => {
                form.resetFields();
                handleModalVisible(false)
                history.push('/user-management/password-management')
            },
        });
    }, [handleModalVisible, form]);

    const onFinish = useCallback(
        async (values) => {
            const body = {
                minCharacter: values.minCharacter,
                maxCharacter: values.maxCharacter,
                hasUpperChar: values.hasUpperChar,
                hasLowerChar: values.hasLowerChar,
                hasNumber: values.hasNumber,
                hasSymbol: values.hasSymbol,
                passwordPeriod: values.passwordPeriod
            }
            const action = await dispatch(setPasswordRuleAndPeriodValue(body));
            if (action?.payload?.success) {
                successDialog({
                    title: <Text t="success" />,
                    message: "Kayıt Güncellenmiştir.",
                });
                setPasswordRules({
                    minCharacter: values.minCharacter,
                    maxCharacter: values.maxCharacter,
                    hasUpperChar: values.hasUpperChar,
                    hasLowerChar: values.hasLowerChar,
                    hasNumber: values.hasNumber,
                    hasSymbol: values.hasSymbol,
                    passwordPeriod: values.passwordPeriod
                })
                handleModalVisible(false)
                handleEdit(false)
            } else {
                console.log(action)
                errorDialog({
                    title: <Text t="error" />,
                    message: "Hatalı Giriş",
                });
            }
        },
        [dispatch, setPasswordRules, handleModalVisible, passwordRules],
    )

    const onChange = (e) => {
        let prevState = passwordRules;
        prevState[e.target.name] = e.target.checked;

        setPasswordRules(passwordRules => ({
            ...passwordRules,
            ...prevState
        }))

    };

    return (
        <CustomModal
            className="password-modal"
            maskClosable={false}
            footer={false}
            title={'Şifre Yönetimi'}
            visible={modalVisible}
            onCancel={handleClose}
            autoComplete="off"
        >
            <div className='payment-container'>
                <CustomForm
                    name='passwordForm'
                    className='payment-link-form'
                    form={form}
                    autoComplete='off'
                    layout={'horizontal'}
                    onFinish={onFinish}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                >
                    <CustomFormItem
                        label={"Minimum Karakter Sayısı"}
                        name="minCharacter"
                        rules={[{ required: true, message: <Text t="Lütfen zorunlu alanları doldurunuz." /> }]}
                        className="custom-form-item"
                    >
                        <CustomNumberInput placeholder="Minimum Karakter Sayısı" />
                    </CustomFormItem>
                    <CustomFormItem
                        label={<Text t="Maksimum Karakter Sayısı" />}
                        name="maxCharacter"
                        rules={[{ required: true, message: <Text t="Lütfen zorunlu alanları doldurunuz." /> }]}
                        className="custom-form-item"
                    >
                        <CustomNumberInput placeholder="Maksimum Karakter Sayısı" />
                    </CustomFormItem>

                    <Row>
                        <b className="checkboxes">Olması İstenen Şifre Kuralları</b>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <CustomFormItem
                                label={false}
                                name="hasUpperChar"
                                valuePropName="checked"
                            >
                                <div className="checkbox-row">
                                    <div className="checkbox-label">
                                        <Text t="Büyük harf" />
                                    </div>
                                    <CustomCheckbox name="hasUpperChar" checked={passwordRules.hasUpperChar} onChange={onChange}></CustomCheckbox>

                                </div>
                            </CustomFormItem>
                            <CustomFormItem
                                label={false}
                                name="hasLowerChar"
                                valuePropName="checked"
                            >
                                <div className="checkbox-row">
                                    <div className="checkbox-label">
                                        <Text t="Küçük harf" />
                                    </div>
                                    <CustomCheckbox name="hasLowerChar" checked={passwordRules.hasLowerChar} onChange={onChange}></CustomCheckbox>
                                </div>
                            </CustomFormItem>
                            <CustomFormItem
                                label={false}
                                name="hasNumber"
                                valuePropName="checked"
                            >
                                <div className="checkbox-row">
                                    <div className="checkbox-label">
                                        <Text t="Rakam" />
                                    </div>
                                    <CustomCheckbox
                                        name="hasNumber"
                                        checked={passwordRules.hasNumber} onChange={onChange}
                                    />
                                </div>
                            </CustomFormItem>
                            <CustomFormItem
                                label={false}
                                name="hasSymbol"
                                valuePropName="checked"
                                onChange={onChange}
                            >
                                <div className="checkbox-row">
                                    <div className="checkbox-label">
                                        <Text t="Sembol" />
                                    </div>
                                    <CustomCheckbox
                                        name="hasSymbol"
                                        checked={passwordRules.hasSymbol} onChange={onChange}></CustomCheckbox>
                                </div>
                            </CustomFormItem>
                        </Col>
                    </Row>

                    <CustomFormItem
                        label="Şifre Periyod"
                        name="passwordPeriod"
                    >
                        <CustomSelect
                            placeholder="Periyot seçiniz"
                        >
                            {selectList.map(item => (
                                <Option key={item.value} value={item.value}>
                                    {item.text}
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>

                    <div className='modal-footer'>
                        <CustomFormItem>
                            <CustomButton className='submit-btn' type='primary' onClick={handleClose}>
                                <span className='submit'>
                                    <Text t='İptal' />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                        <CustomFormItem>
                            <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                                <span className='submit'>
                                    <Text t='Kaydet' />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                    </div>

                </CustomForm>
            </div>



        </CustomModal>
    )
}

export default PasswordFormModal;