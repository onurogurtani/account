import { Checkbox, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    Text,
} from '../../../components';
import { roleType } from '../../../constants/roleAuthorization';
import { getOperationClaimsList } from '../../../store/slice/roleAuthorizationSlice';
import RoleAuthorizationTreeTransfer from '../components/RoleAuthorizationTreeTransfer';

const RoleAuthorizationCreateOrEditForm = ({ isEdit }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const [targetKeys, setTargetKeys] = useState([]);
    const [transferData, setTransferData] = useState([]);
    const { operationClaims } = useSelector((state) => state.roleAuthorization);

    const onChange = (keys) => {
        setTargetKeys(keys);
    };
    useEffect(() => {
        dispatch(getOperationClaimsList());
    }, []);

    useEffect(() => {
        if (isEdit) {
            const permission = [
                'CreateTranslateMapCommand',
                'DeleteTranslateMapCommand',
                'UpdateTranslateMapCommand',
                'GetTranslateMapQuery',
                'GetTranslateMapListQuery',
                'GetTranslateMapsQuery',
            ];
            form.setFieldsValue({
                permission,
                name: 'Rol 1',
                roltype: 1,
            });
            setTargetKeys(permission);
        }
    }, []);

    useEffect(() => {
        const data = [];
        Object.entries(operationClaims).forEach(([key, value]) => {
            if (key && key !== 'undefined') {
                const obj = {
                    key: key,
                    title: key,
                    children: value.map((item) => item.categoryName && { key: item.name, title: item.description }),
                };
                data.push(obj);
            }
        });
        setTransferData(data);
    }, [operationClaims]);

    const onFinish = (values) => {
        console.log(values);
    };

    const permissionRequired = async (field, value) => {
        try {
            if (targetKeys.length > 0) {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        } catch (e) {
            return Promise.reject(new Error());
        }
    };

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                history.push(`/role-authorization-management/list`);
            },
        });
    };
    return (
        <CustomForm
            labelCol={{ flex: '100px' }}
            autoComplete="off"
            layout="horizontal"
            labelWrap
            className="role-authorization-form"
            labelAlign="left"
            colon={false}
            form={form}
            onFinish={onFinish}
            name="form"
        >
            <div>Rol Belirle</div>
            <div style={{ border: '2px solid #e0e0e0', padding: '10px' }}>
                <div style={{ display: 'flex', gap: '30px' }}>
                    <CustomFormItem
                        label="Rol Adı"
                        name="name"
                        style={{ width: '50%' }}
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

                    <CustomFormItem
                        label="Rol Tipi"
                        name="roltype"
                        style={{ width: '50%' }}
                        rules={[{ required: true, message: 'Rol Tipi Seçiniz' }]}
                    >
                        <CustomSelect placeholder="Seçiniz" allowClear>
                            {roleType.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.value}
                                    </Option>
                                );
                            })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>
                <CustomFormItem style={{ marginBottom: '0' }} name="1" valuePropName="checked">
                    <Checkbox>Default kurum admin rolünü ata</Checkbox>
                </CustomFormItem>
                <CustomFormItem name="2" valuePropName="checked">
                    <Checkbox>Kurumsalda görünsün</Checkbox>
                </CustomFormItem>
            </div>

            <div className="permission-label">Yetkileri Belirle</div>
            <div style={{ border: '2px solid #e0e0e0', padding: '10px' }}>
                <CustomFormItem
                    name="permission"
                    rules={[{ validator: permissionRequired, message: 'Kaydetmek için en az bir yetki seçiniz.' }]}
                >
                    <RoleAuthorizationTreeTransfer
                        dataSource={transferData}
                        targetKeys={targetKeys}
                        onChange={onChange}
                    />
                </CustomFormItem>
            </div>

            <div className="form-footer">
                <CustomButton type="danger" onClick={onCancel}>
                    İptal Et
                </CustomButton>
                <CustomButton type="primary" htmlType="submit">
                    Kaydet
                </CustomButton>
            </div>
        </CustomForm>
    );
};

export default RoleAuthorizationCreateOrEditForm;
