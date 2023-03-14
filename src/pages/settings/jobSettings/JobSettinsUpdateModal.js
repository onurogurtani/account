import { Form } from 'antd';
import React, { useState } from 'react';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    CustomSelect,
    errorDialog,
    Option,
    Text,
} from '../../../components';
import modalClose from '../../../assets/icons/icon-close.svg';
import { jobTime } from '../../../constants/settings/jobSettings';
import { useDispatch } from 'react-redux';
import { getJobSettings, updateJobSettings } from '../../../store/slice/jobSettingsSlice';

const JobSettinsUpdateModal = ({ record }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = async (values) => {
        try {
            await dispatch(
                updateJobSettings({
                    entity: {
                        id: record?.id,
                        ...values,
                    },
                }),
            ).unwrap();
            await dispatch(getJobSettings());
            handleClose();
        } catch (error) {
            errorDialog({ title: <Text t="error" />, message: error?.data?.message });
        }
    };

    return (
        <>
            <CustomButton
                type="primary"
                className="update-btn"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Güncelle
            </CustomButton>

            <CustomModal
                maskClosable={false}
                footer={false}
                title="Güncelle"
                visible={open}
                onCancel={handleClose}
                closeIcon={<CustomImage src={modalClose} />}
            >
                <CustomForm
                    labelCol={{ flex: '100px' }}
                    autoComplete="off"
                    layout="horizontal"
                    labelWrap
                    className="role-set-status"
                    labelAlign="left"
                    colon={false}
                    form={form}
                    onFinish={onFinish}
                    name="form"
                >
                    <CustomFormItem
                        initialValue={record?.value}
                        rules={[{ required: true, message: 'Zamanlama Seçiniz' }]}
                        label="Zamanlama"
                        name="value"
                    >
                        <CustomSelect showArrow allowClear placeholder="Seçiniz..">
                            {jobTime.map((item) => {
                                return (
                                    <Option key={item?.value} value={item?.value}>
                                        {item?.label}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>

                    <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                        <CustomButton onClick={handleClose}>Vazgeç</CustomButton>

                        <CustomButton type="primary" htmlType="submit">
                            Güncelle
                        </CustomButton>
                    </div>
                </CustomForm>
            </CustomModal>
        </>
    );
};

export default JobSettinsUpdateModal;
