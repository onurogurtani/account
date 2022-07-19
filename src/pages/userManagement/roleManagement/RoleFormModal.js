import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomInput,
    CustomModal,
    errorDialog,
    successDialog,
    Text,
    useText,
} from '../../../components';
import modalClose from '../../../assets/icons/icon-close.svg';
import React, { useCallback, useEffect } from 'react';
import '../../../styles/myOrders/paymentModal.scss';
import { useDispatch } from 'react-redux';
import { Form } from 'antd';
import { addGroup } from '../../../store/slice/groupsSlice';

const RoleFormModal = ({ modalVisible, handleModalVisible, selectedRole }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (modalVisible) {
            console.log('açıldı modal')
            form.setFieldsValue(selectedRole);
        }
    }, [modalVisible]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
    }, [handleModalVisible, form]);


    const onFinish = useCallback(
        
        async (values) => {
            if (values?.groupName) {
                const body = {
                    groupName: values?.groupName,
                };

                const action = await dispatch(addGroup(body));
                if (addGroup.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='success' />,
                        message: action?.payload.message,
                        onOk: async () => {
                            await handleClose();
                        },
                    });
                } else {
                    errorDialog({
                        title: <Text t='error' />,
                        message: action?.payload.message,
                    });
                }
            } else {
                errorDialog({
                    title: <Text t='error' />,
                    message: 'Lütfen Rol adı giriniz.',
                });
            }
        },
        [dispatch, handleClose],
    );

    return (
        <CustomModal
            className='payment-modal'
            maskClosable={false}
            footer={false}
            title={'Rol Tanımlama Ekranı'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='payment-container'>
                <CustomForm
                    name='paymentLinkForm'
                    className='payment-link-form'
                    form={form}
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >


                    <CustomFormItem
                        label={<Text t='Rol Adı' />}
                        name='groupName'
                    >
                        <CustomInput
                            placeholder={useText('Rol Adı')}
                            height={36}
                        />
                    </CustomFormItem>

                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                            <span className='submit'>
                                <Text t='Kaydet' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>
            </div>
        </CustomModal>
    );
};

export default RoleFormModal;
