import React, { useCallback, useEffect } from 'react';
import { CustomFormItem, CustomInput, CustomMaskInput, CustomSelect, Option } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { packagePurchaseStatus } from '../../../constants/users';
import { formPhoneRegex, tcknValidator } from '../../../utils/formRule';
import { getUserTypesList } from '../../../store/slice/userTypeSlice';
import { getByFilterPagedUsers, setIsFilter } from '../../../store/slice/userListSlice';
import { getUnmaskedPhone } from '../../../utils/utils';
import TableFilter from '../../../components/TableFilter';

const UserFilter = () => {
    const dispatch = useDispatch();
    const state = (state) => state?.userList;
    const { filterObject } = useSelector(state);
    const { userTypes } = useSelector((state) => state?.userType);

    useEffect(() => {
        if (Object.keys(userTypes).length) return false;
        dispatch(getUserTypesList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onFinish = useCallback(
        async (values) => {
            console.log(values);
            // values.CitizenId = values.CitizenId ? values?.CitizenId.toString().replaceAll('_', '') : undefined;

            try {
                const body = {
                    ...filterObject,
                    ...values,
                    MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
                    PageNumber: 1,
                };
                await dispatch(getByFilterPagedUsers(body));
                await dispatch(setIsFilter(true));
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, filterObject],
    );

    const reset = async () => {
        await dispatch(
            getByFilterPagedUsers({
                PageSize: filterObject?.PageSize,
                OrderBy: filterObject?.OrderBy,
            }),
        );
        await dispatch(setIsFilter(false));
    };
    const tableFilterProps = { onFinish, reset, state };
    return (
        <TableFilter {...tableFilterProps}>
            <div className="form-item">
                <CustomFormItem label="Kullanıcı Türü" name="UserTypeId">
                    <CustomSelect allowClear placeholder="Seçiniz">
                        {userTypes
                            .filter((i) => i.recordStatus === 1)
                            .map((item) => (
                                <Option key={item.code} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Ad" rules={[{ whitespace: true }]} name="Name">
                    <CustomInput placeholder="Ad" />
                </CustomFormItem>

                <CustomFormItem label="Soyad" rules={[{ whitespace: true }]} name="SurName">
                    <CustomInput placeholder="Soyad" />
                </CustomFormItem>

                <CustomFormItem label="Paket Satın Alma Durumu" name="PackageBuyStatus">
                    <CustomSelect allowClear placeholder="Seçiniz">
                        {packagePurchaseStatus.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.value}
                            </Option>
                        ))}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem
                    rules={[{ validator: tcknValidator, message: 'Lütfen geçerli T.C. kimlik numarası giriniz.' }]}
                    label="TC Kimlik Numarası"
                    name="CitizenId"
                >
                    <CustomMaskInput mask={'99999999999'}>
                        <CustomInput placeholder="TC Kimlik Numarası" />
                    </CustomMaskInput>
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
            </div>
        </TableFilter>
    );
};

export default UserFilter;
