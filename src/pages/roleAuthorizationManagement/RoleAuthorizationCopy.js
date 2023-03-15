import React, { useCallback, useState } from 'react';
import { Form } from 'antd';
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
} from '../../components';
import modalClose from '../../assets/icons/icon-close.svg';
import { useDispatch } from 'react-redux';
import { getByFilterPagedRoles, roleCopy } from '../../store/slice/roleAuthorizationSlice';

const RoleAuthorizationCopy = ({ record }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClose = useCallback(() => {
        form.resetFields();
        setOpen(false);
    }, [form]);

    const onFinish = async (values) => {
        try {
            const action = await dispatch(roleCopy({ rolId: record?.id, ...values })).unwrap();
            setOpen(false);
            successDialog({ title: <Text t="success" />, message: action?.message });
            dispatch(getByFilterPagedRoles());
        } catch (error) {
            errorDialog({ title: <Text t="error" />, message: error?.data?.message });
        }
    };
    return (
        <>
            <CustomModal
                maskClosable={false}
                footer={false}
                title={record.name + ' rolünü kopyala'}
                visible={open}
                onCancel={handleClose}
                closeIcon={<CustomImage src={modalClose} />}
            >
                <CustomForm
                    labelCol={{ flex: '100px' }}
                    autoComplete="off"
                    layout="horizontal"
                    labelWrap
                    labelAlign="left"
                    colon={false}
                    form={form}
                    onFinish={onFinish}
                    name="form"
                >
                    <CustomFormItem
                        label="Rol Adı:"
                        name="rolName"
                        initialValue={record.name + '(2)'}
                        rules={[
                            { required: true, message: 'Rol adı giriniz' },
                            { whitespace: true },
                            { min: 2 },
                            {
                                pattern: new RegExp(/^(?!.*[\/\\:*?"<>|]).*$/),
                                message: '/  : * ? “ < > | karakterlerini içermemelidir',
                            },
                        ]}
                    >
                        <CustomInput placeholder="Rol Adı" />
                    </CustomFormItem>
                    <div style={{ display: 'flex' }}>
                        <CustomButton style={{ marginLeft: 'auto' }} type="primary" htmlType="submit">
                            Onayla
                        </CustomButton>
                    </div>
                </CustomForm>
            </CustomModal>

            <CustomButton
                className="update-btn"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Kopyala
            </CustomButton>
        </>
    );
};

export default RoleAuthorizationCopy;
