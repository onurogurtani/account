import React, { useCallback, useState } from 'react';
import { Form } from 'antd';
import { CustomButton, CustomForm, CustomFormItem, CustomImage, CustomInput, CustomModal } from '../../components';
import modalClose from '../../assets/icons/icon-close.svg';

const RoleAuthorizationCopy = ({ record }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClose = useCallback(() => {
        form.resetFields();
        setOpen(false);
    }, [form]);

    const onFinish = (values) => {
        console.log(values);
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
                        name="name"
                        initialValue={record.name + ' (2)'}
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
