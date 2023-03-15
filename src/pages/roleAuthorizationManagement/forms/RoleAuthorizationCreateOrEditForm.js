import { Checkbox, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    errorDialog,
    Option,
    successDialog,
    Text,
} from '../../../components';
import {
    addRole,
    getOperationClaimsList,
    getRoleById,
    getRoleTypes,
    updateRole,
} from '../../../store/slice/roleAuthorizationSlice';
import RoleAuthorizationTreeTransfer from '../components/RoleAuthorizationTreeTransfer';

const RoleAuthorizationCreateOrEditForm = ({ isEdit }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [targetKeys, setTargetKeys] = useState([]);
    const [transferData, setTransferData] = useState([]);
    const { operationClaims, roleTypes } = useSelector((state) => state.roleAuthorization);

    const onChange = (keys) => {
        setTargetKeys(keys);
    };
    useEffect(() => {
        dispatch(getOperationClaimsList());
        dispatch(getRoleTypes());
    }, []);

    useEffect(() => {
        if (isEdit) {
            const setRoleData = async () => {
                try {
                    const action = await dispatch(getRoleById(id)).unwrap();
                    const { data } = action;
                    const permission = data?.roleClaims.map((i) => i?.claimName);
                    form.setFieldsValue({
                        roleClaims: permission,
                        name: data?.name,
                        roleType: data?.roleType,
                        isDefaultOrganisationRole: data?.isDefaultOrganisationRole,
                        isOrganisationView: data?.isOrganisationView,
                    });
                    setTargetKeys(permission);
                } catch (error) {
                    errorDialog({ title: <Text t="error" />, message: error?.data?.message });
                    history.push('/role-authorization-management/list');
                }
            };
            setRoleData();
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

    const onFinish = async (values) => {
        values.roleClaims = values?.roleClaims.map((i) => ({ claimName: i }));
        try {
            let action;
            if (isEdit) {
                action = await dispatch(updateRole({ id, ...values })).unwrap();
            } else {
                action = await dispatch(addRole(values)).unwrap();
            }
            successDialog({ title: <Text t="success" />, message: action?.message });
            history.push('/role-authorization-management/list');
        } catch (error) {
            errorDialog({ title: <Text t="error" />, message: error?.data?.message });
        }
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
            htmlContent: (
                <>
                    Yaptığınız değişiklikler kaydedilmeyecek. <br />
                    İptal işlemini onaylıyor musunuz?
                </>
            ),
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
                        name="roleType"
                        style={{ width: '50%' }}
                        rules={[{ required: true, message: 'Rol Tipi Seçiniz' }]}
                    >
                        <CustomSelect placeholder="Seçiniz" allowClear>
                            {roleTypes
                                .filter((u) => u.isDisabled === false)
                                .map((item) => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.label}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>
                <CustomFormItem
                    style={{ marginBottom: '0' }}
                    name="isDefaultOrganisationRole"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Checkbox>Default kurum admin rolünü ata</Checkbox>
                </CustomFormItem>
                <CustomFormItem name="isOrganisationView" valuePropName="checked" initialValue={false}>
                    <Checkbox>Kurumsalda görünsün</Checkbox>
                </CustomFormItem>
            </div>

            <div className="permission-label">Yetkileri Belirle</div>
            <div style={{ border: '2px solid #e0e0e0', padding: '10px' }}>
                <CustomFormItem
                    name="roleClaims"
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
