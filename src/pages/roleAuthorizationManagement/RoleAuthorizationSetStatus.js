import React, { useState } from 'react';
import {
    CustomButton,
    CustomCheckbox,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    CustomSelect,
    errorDialog,
    Option,
    Text,
} from '../../components';
import modalClose from '../../assets/icons/icon-close.svg';
import { Form } from 'antd';
import { turkishToLower } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoleList, passiveCheckControlRole, setPassiveRole } from '../../store/slice/roleAuthorizationSlice';
import { PlusCircleFilled } from '@ant-design/icons';
import modalWarning from '../../assets/icons/icon-modal-warning.svg';
import '../../styles/roleAuthorizationManagement/roleAuthorizationSetStatus.scss';

const RoleAuthorizationSetStatus = ({ record }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState();

    const { allRoles } = useSelector((state) => state.roleAuthorization);
    const handleClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const confirmChange = (e) => {
        if (!e?.target?.checked) {
            form.resetFields(['transferRoleId']);
        } else {
            dispatch(getAllRoleList({}));
        }
    };

    const onFinish = async (values) => {
        console.log(values);
        try {
            await dispatch(setPassiveRole({ roleId: record?.id, transferRoleId: values?.transferRoleId }));
            handleClose();
        } catch (error) {
            errorDialog({ title: <Text t="error" />, message: error?.data?.message });
        }
    };

    return (
        <>
            <CustomModal
                maskClosable={false}
                footer={false}
                title={
                    <div>
                        <CustomImage src={modalWarning} /> Dikkat
                    </div>
                }
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
                    <div className="message">
                        <PlusCircleFilled />
                        {message}
                    </div>
                    <p className="confirm-message">
                        Bu kullanıcıları ve paketleri başka role transfer etmek istiyor musunuz?
                    </p>

                    <div style={{ display: 'flex', gap: '30px', alignItems: 'baseline' }}>
                        <CustomFormItem style={{ width: '20%' }} name="confirm" valuePropName="checked">
                            <CustomCheckbox onChange={confirmChange}>Evet</CustomCheckbox>
                        </CustomFormItem>

                        <CustomFormItem
                            label={false}
                            noStyle
                            shouldUpdate={(prevValues, curValues) => prevValues.confirm !== curValues.confirm}
                        >
                            {({ getFieldValue }) => (
                                <CustomFormItem
                                    rules={[{ required: true, message: 'Rol Seçiniz' }]}
                                    style={{ width: '80%' }}
                                    label="Rol Seç"
                                    name="transferRoleId"
                                >
                                    <CustomSelect
                                        disabled={!form.getFieldValue('confirm')}
                                        filterOption={(input, option) =>
                                            turkishToLower(option.children).includes(turkishToLower(input))
                                        }
                                        showArrow
                                        showSearch
                                        allowClear
                                        placeholder="Seçiniz.."
                                    >
                                        {allRoles
                                            ?.filter((u) => u?.id !== record?.id && u?.recordStatus === 1)
                                            .map((item) => {
                                                return (
                                                    <Option key={item?.id} value={item?.id}>
                                                        {item?.name}
                                                    </Option>
                                                );
                                            })}
                                    </CustomSelect>
                                </CustomFormItem>
                            )}
                        </CustomFormItem>
                    </div>
                    <div className="action-btn">
                        <CustomButton onClick={handleClose}>Vazgeç</CustomButton>
                        <CustomFormItem
                            label={false}
                            noStyle
                            shouldUpdate={(prevValues, curValues) => prevValues.confirm !== curValues.confirm}
                        >
                            {({ getFieldValue }) => (
                                <CustomButton
                                    disabled={!form.getFieldValue('confirm')}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Onayla
                                </CustomButton>
                            )}
                        </CustomFormItem>
                    </div>
                </CustomForm>
            </CustomModal>
            <CustomButton
                className="update-btn"
                style={{ backgroundColor: record?.recordStatus === 1 ? 'red' : 'green' }}
                onClick={async () => {
                    if (record?.recordStatus === 1) {
                        const action = await dispatch(passiveCheckControlRole({ RoleId: record?.id })).unwrap();
                        if (action?.data?.isPassiveCheck) {
                        } else {
                            setMessage(action?.data?.message);
                            setOpen(true);
                        }
                    }
                }}
            >
                {record?.recordStatus === 1 ? 'Pasif Et ' : 'Aktif Et'}
            </CustomButton>
        </>
    );
};

export default RoleAuthorizationSetStatus;
