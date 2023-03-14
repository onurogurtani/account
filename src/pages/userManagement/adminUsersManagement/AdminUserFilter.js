import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomInput,
    CustomMaskInput,
    CustomSelect,
    Option,
    Text,
} from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../../utils/formRule';
import { getUnmaskedPhone, turkishToLower } from '../../../utils/utils';
import { getGroupsList } from '../../../store/slice/groupsSlice';
import { getByFilterPagedAdminUsers, setIsFilter } from '../../../store/slice/adminUserSlice';
import { adminTypes } from '../../../constants/adminUsers';
import { getAllRoleList } from '../../../store/slice/roleAuthorizationSlice';

const AdminUserFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { allRoles } = useSelector((state) => state?.roleAuthorization);
    const { filterObject, isFilter } = useSelector((state) => state?.adminUsers);
    const { adminTypeEnum } = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        dispatch(
            getAllRoleList({
                data: [
                    {
                        field: 'recordStatus',
                        value: 1,
                        compareType: 0,
                    },
                ],
            }),
        );
    }, []);

    useEffect(() => {
        if (isFilter) {
            form.setFieldsValue(filterObject);
        }
    }, []);

    const onFinish = useCallback(
        async (values) => {
            console.log(values);
            try {
                const body = {
                    ...filterObject,
                    ...values,
                    MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
                    PageNumber: 1,
                };
                await dispatch(getByFilterPagedAdminUsers(body));
                await dispatch(setIsFilter(true));
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, filterObject],
    );

    const handleFilter = () => form.submit();
    const handleReset = async () => {
        form.resetFields();
        await dispatch(
            getByFilterPagedAdminUsers({
                PageSize: filterObject?.PageSize,
                OrderBy: filterObject?.OrderBy,
            }),
        );
        await dispatch(setIsFilter(false));
    };

    return (
        <div className="table-filter">
            <CustomForm
                name="filterForm"
                className="filter-form"
                autoComplete="off"
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <div className="form-item">
                    <CustomFormItem
                        rules={[{ validator: tcknValidator, message: '11 Karakter İçermelidir' }]}
                        label="TC Kimlik Numarası"
                        name="CitizenId"
                    >
                        <CustomMaskInput mask={'99999999999'}>
                            <CustomInput placeholder="TC Kimlik Numarası" />
                        </CustomMaskInput>
                    </CustomFormItem>

                    <CustomFormItem label="Kullanıcı Adı" rules={[{ whitespace: true }]} name="UserName">
                        <CustomInput placeholder="Kullanıcı Adı" />
                    </CustomFormItem>

                    <CustomFormItem label="Ad" rules={[{ whitespace: true }]} name="Name">
                        <CustomInput placeholder="Ad" />
                    </CustomFormItem>

                    <CustomFormItem label="Soyad" rules={[{ whitespace: true }]} name="SurName">
                        <CustomInput placeholder="Soyad" />
                    </CustomFormItem>

                    <CustomFormItem
                        rules={[{ validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
                        label="Telefon Numarası"
                        name="MobilePhones"
                    >
                        <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
                            <CustomInput placeholder="Telefon Numarası" />
                        </CustomMaskInput>
                    </CustomFormItem>

                    <CustomFormItem
                        label="E-Mail"
                        name="Email"
                        rules={[{ validator: formMailRegex, message: <Text t="enterValidEmail" /> }]}
                    >
                        <CustomInput placeholder="E-Mail" />
                    </CustomFormItem>

                    <CustomFormItem label="Admin Tipi" name="AdminTypeEnum">
                        <CustomSelect allowClear placeholder="Seçiniz">
                            {adminTypes
                                ?.filter((u) => u.accessType.includes(adminTypeEnum))
                                ?.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem label="Rol" name="RoleIds">
                        <CustomSelect
                            filterOption={(input, option) =>
                                turkishToLower(option.children).includes(turkishToLower(input))
                            }
                            showArrow
                            allowClear
                            mode="multiple"
                            placeholder="Rol"
                        >
                            {allRoles
                                // ?.filter((item) => item.isActive)
                                ?.map((item) => {
                                    return (
                                        <Option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </Option>
                                    );
                                })}
                        </CustomSelect>
                    </CustomFormItem>
                </div>
                <div className="form-footer">
                    <div className="action-buttons">
                        <CustomButton className="clear-btn" onClick={handleReset}>
                            Temizle
                        </CustomButton>
                        <CustomButton className="search-btn" onClick={handleFilter}>
                            <CustomImage className="icon-search" src={iconSearchWhite} />
                            Filtrele
                        </CustomButton>
                    </div>
                </div>
            </CustomForm>
        </div>
    );
};

export default AdminUserFilter;
