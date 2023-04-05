import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomInput, CustomMaskInput, Text, warningDialog } from '../../components';
import TableFilter from '../../components/TableFilter';
import { getUnmaskedPhone } from '../../utils/utils';
import { formMailRegex, formPhoneRegex, tcknValidator } from '../../utils/formRule';
import { getByFilterPagedTeachers } from '../../store/slice/teachersSlice';

const TeacherListFilter = ({ isVisibleFilter }) => {
    const dispatch = useDispatch();
    const state = (state) => state?.teachers;
    const { teachersDetailSearch } = useSelector(state);

    const onFinish = useCallback(
        async (values) => {
            try {
                const action = await dispatch(
                    getByFilterPagedTeachers({
                        ...teachersDetailSearch,
                        pagination: {
                            ...teachersDetailSearch.pagination,
                            pageNumber: 1,
                        },
                        body: {
                            ...values,
                            MobilePhones: values.MobilePhones && getUnmaskedPhone(values.MobilePhones),
                        },
                    }),
                ).unwrap();

                if (action?.data?.items?.length === 0) {
                    warningDialog({
                        title: <Text t="error" />,
                        message: 'Bu kriterlere uygun veri bulunamadı.',
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, teachersDetailSearch],
    );

    const reset = async () => {
        await dispatch(
            getByFilterPagedTeachers({
                pagination: {
                    ...teachersDetailSearch.pagination,
                    pageNumber: 1,
                },
            }),
        );
    };

    const tableFilterProps = { onFinish, reset, state };

    return (
        <TableFilter {...tableFilterProps}>
            <div className="form-item">
                <CustomFormItem
                    rules={[{ validator: tcknValidator, message: 'Lütfen geçerli T.C. kimlik numarası giriniz.' }]}
                    label="TC Kimlik Numarası"
                    name="CitizenId"
                >
                    <CustomMaskInput mask={'99999999999'}>
                        <CustomInput placeholder="TC Kimlik Numarası" />
                    </CustomMaskInput>
                </CustomFormItem>
                <CustomFormItem label="Ad" rules={[{ whitespace: true }]} name="Name">
                    <CustomInput placeholder="Ad" />
                </CustomFormItem>
                <CustomFormItem label="Soyad" rules={[{ whitespace: true }]} name="SurName">
                    <CustomInput placeholder="Soyad" />
                </CustomFormItem>
                <CustomFormItem
                    label="E-Mail"
                    name="Email"
                    rules={[{ validator: formMailRegex, message: <Text t="enterValidEmail" /> }]}
                >
                    <CustomInput placeholder="E-Mail" />
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

export default TeacherListFilter;
