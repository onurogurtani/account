import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomFormItem,
    CustomModal,
    CustomPageHeader,
    CustomSelect,
    errorDialog,
    successDialog,
    Text,
    CustomDatePicker,
    Option,
    confirmDialog,
    CustomCheckbox,
} from '../../../components';
import { Form } from 'antd';

import {
    getEducationYears,
    getPreferencePeriod,
    getPreferencePeriodAdd,
    getPreferencePeriodDelete,
    getPreferencePeriodUpdate,
} from '../../../store/slice/preferencePeriodSlice';
import '../../../styles/settings/preferencePeriod.scss';
import moment from 'moment';
import dayjs from 'dayjs';

const PreferencePeriod = () => {
    const [showModal, setShowModal] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [isAlways, setIsAlways] = useState(false);
    const [form] = Form.useForm();
    const { preferencePeriod, educationYears } = useSelector((state) => state?.preferencePeriod);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPreferencePeriod());
    }, [dispatch]);
    const preferencePeriodDelete = async (id) => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Silmek istediğinizden emin misiniz?',
            onOk: async () => {
                const action = await dispatch(getPreferencePeriodDelete({ id }));
                if (getPreferencePeriodUpdate.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action?.payload?.message,
                        onOk: () => {
                            dispatch(getPreferencePeriod());
                        },
                    });
                } else {
                    errorDialog({
                        title: <Text t="error" />,
                        message: 'Bilgileri kontrol ediniz.',
                    });
                }
            },
        });
    };
    const openEdit = (data) => {
        setShowModal(true);
        setEditInfo(data);
        setIsAlways(data?.isAlways);
        const newData = {
            ...data,
            ...(!data?.isAlways && {
                period1StartDate: moment(data.period1StartDate),
                period1EndDate: moment(data.period1EndDate),
                period2StartDate: moment(data.period2StartDate),
                period2EndDate: moment(data.period2EndDate),
                period3StartDate: moment(data.period3StartDate),
                period3EndDate: moment(data.period3EndDate),
            }),
        };
        form.setFieldsValue(newData);
    };

    const sumbit = useCallback(
        async (e) => {
            console.log(e);
            const data = {
                isAlways: e?.isAlways,
                educationYearId: e.educationYearId,
                ...(!e?.isAlways && {
                    period1StartDate: e?.period1StartDate?.$d,
                    period2StartDate: e?.period2StartDate?.$d,
                    period3StartDate: e?.period3StartDate?.$d,
                    period3EndDate: e?.period3EndDate?.$d,
                    period2EndDate: e?.period2EndDate?.$d,
                    period1EndDate: e?.period1EndDate?.$d,
                }),
            };
            if (editInfo) {
                console.log(editInfo);
                const action = await dispatch(
                    getPreferencePeriodUpdate({ preferencePeriod: { ...data, id: editInfo.preferencePeriodId } }),
                );
                if (getPreferencePeriodUpdate.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action?.payload?.message,
                        onOk: () => {
                            form.resetFields();
                            setIsAlways(false);
                            setShowModal(false);
                            setEditInfo(null);
                            dispatch(getPreferencePeriod());
                        },
                    });
                } else {
                    errorDialog({
                        title: <Text t="error" />,
                        message: 'Bilgileri kontrol ediniz.',
                    });
                }
            } else {
                const action = await dispatch(getPreferencePeriodAdd({ preferencePeriod: data }));
                if (getPreferencePeriodAdd.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t="success" />,
                        message: action?.payload?.message,
                        onOk: () => {
                            form.resetFields();
                            setIsAlways(false);
                            setShowModal(false);
                            dispatch(getPreferencePeriod());
                        },
                    });
                } else {
                    errorDialog({
                        title: <Text t="error" />,
                        message: 'Bilgileri kontrol ediniz.',
                    });
                }
            }
        },
        [editInfo, dispatch, form],
    );

    useEffect(() => {
        dispatch(getEducationYears());
    }, [dispatch]);

    const convertDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const dateValidator = async (field, value) => {
        if (isAlways) return true;
        let dateValue;
        switch (field.field) {
            case 'period1EndDate':
                const { period1StartDate } = form?.getFieldsValue(['period1StartDate']);
                dateValue = period1StartDate;
                break;
            case 'period2EndDate':
                const { period2StartDate } = form?.getFieldsValue(['period2StartDate']);
                dateValue = period2StartDate;
                break;
            case 'period3EndDate':
                const { period3StartDate } = form?.getFieldsValue(['period3StartDate']);
                dateValue = period3StartDate;
                break;
            default:
                break;
        }

        try {
            if (!dateValue || dayjs(value).startOf('date') > dateValue) {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        } catch (e) {
            return Promise.reject(new Error());
        }
    };

    const dateValidatorPeriodControl = async (field, value) => {
        if (isAlways) return true;
        let dateValue;
        switch (field.field) {
            case 'period2StartDate':
                const { period1EndDate } = form?.getFieldsValue(['period1EndDate']);
                dateValue = period1EndDate;
                break;
            case 'period3StartDate':
                const { period2EndDate } = form?.getFieldsValue(['period2EndDate']);
                dateValue = period2EndDate;
                break;
            default:
                break;
        }

        try {
            if (!dateValue || dayjs(value).startOf('date') > dateValue) {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        } catch (e) {
            return Promise.reject(new Error());
        }
    };
    const sortedList = useCallback(() => {
        const list = preferencePeriod.items;
        return list?.map((item) => item).sort((a, b) => a.educationStartYear - b.educationStartYear);
    }, [preferencePeriod.items]);

    return (
        <CustomPageHeader title={'Tercih Dönemi Tanımlama'} showBreadCrumb routes={['Ayarlar']}>
            <CustomCollapseCard className={'preferencePeriod'} cardTitle={'Tercih Dönemleri Belirleme'}>
                <div className=" add-button-item">
                    <CustomButton
                        onClick={() => {
                            setShowModal(true);
                        }}
                        type="primary"
                    >
                        Yeni Ekle
                    </CustomButton>
                </div>
                <div className=" list">
                    {preferencePeriod?.items?.length &&
                        sortedList().map((item, index) => (
                            <CustomCollapseCard
                                className={'list-col'}
                                key={index}
                                cardTitle={
                                    item.educationStartYear +
                                    '-' +
                                    item.educationEndYear +
                                    ' Öğretim Yılı Tercih Dönemleri'
                                }
                            >
                                <div className="list-card">
                                    {item?.isAlways ? (
                                        'HER ZAMAN'
                                    ) : (
                                        <div className=" list-card-items">
                                            <div className=" list-card-item">
                                                <div>{convertDate(item.period1StartDate)}</div>
                                                <span>-</span>
                                                <div>{convertDate(item.period1EndDate)}</div>
                                            </div>
                                            <div className=" list-card-item">
                                                <div>{convertDate(item.period2StartDate)}</div>
                                                <span>-</span>

                                                <div>{convertDate(item.period2EndDate)}</div>
                                            </div>
                                            <div className=" list-card-item">
                                                <div>{convertDate(item.period3StartDate)}</div>
                                                <span>-</span>

                                                <div>{convertDate(item.period3EndDate)}</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="prefencePeriodButton" style={{ display: 'flex' }}>
                                        <div style={{ marginBottom: '10px' }}>
                                            <CustomButton onClick={() => openEdit(item)} className="edit-button">
                                                Düzenle
                                            </CustomButton>
                                        </div>
                                        <div>
                                            <CustomButton
                                                onClick={() => {
                                                    preferencePeriodDelete(item.preferencePeriodId);
                                                }}
                                                className="delete-button"
                                            >
                                                Sil
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </CustomCollapseCard>
                        ))}
                </div>
            </CustomCollapseCard>
            <CustomModal
                okText="Kaydet"
                cancelText="İptal"
                title="Yeni Tercih Dönemi Ekleme"
                visible={showModal}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    form.resetFields();
                    setShowModal(false);
                    setEditInfo(null);
                    setIsAlways(false);
                }}
            >
                <CustomForm onFinish={sumbit} layout="vertical" form={form}>
                    <CustomFormItem
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen seçimleri yapınız.',
                            },
                        ]}
                        label="Eğitim Öğretim Yılı"
                        name="educationYearId"
                    >
                        <CustomSelect height={35}>
                            {educationYears?.items?.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.startYear}-{item.endYear}
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>

                    <CustomFormItem valuePropName="checked" name="isAlways">
                        <CustomCheckbox
                            onChange={(e) => {
                                setIsAlways((prev) => !prev);
                            }}
                        >
                            HER ZAMAN
                        </CustomCheckbox>
                    </CustomFormItem>
                    <div style={{ opacity: isAlways ? 0.5 : 1 }}>
                        <CustomFormItem label="1. Tarih Aralığı" required>
                            <div className="date-form-item">
                                <CustomFormItem
                                    rules={[{ required: !isAlways, message: 'Lütfen seçimleri yapınız.' }]}
                                    style={{ width: '50%' }}
                                    name="period1StartDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                                <CustomFormItem
                                    rules={[
                                        { required: !isAlways, message: 'Lütfen seçimleri yapınız.' },
                                        {
                                            validator: dateValidator,
                                            message:
                                                'Bitiş tarihleri başlangıç tarihlerinden daha ileri bir zaman seçilmelidir.',
                                        },
                                    ]}
                                    style={{ width: '50%' }}
                                    name="period1EndDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                            </div>
                        </CustomFormItem>
                        <CustomFormItem label="2. Tarih Aralığı" required>
                            <div className="date-form-item">
                                <CustomFormItem
                                    rules={[
                                        { required: !isAlways, message: 'Lütfen seçimleri yapınız.' },
                                        {
                                            validator: dateValidatorPeriodControl,
                                            message: 'Lütfen girilen tarihleri kontrol ediniz.',
                                        },
                                    ]}
                                    style={{ width: '50%' }}
                                    name="period2StartDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                                <CustomFormItem
                                    rules={[
                                        { required: !isAlways, message: 'Lütfen seçimleri yapınız.' },
                                        {
                                            validator: dateValidator,
                                            message:
                                                'Bitiş tarihleri başlangıç tarihlerinden daha ileri bir zaman seçilmelidir.',
                                        },
                                    ]}
                                    style={{ width: '50%' }}
                                    name="period2EndDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                            </div>
                        </CustomFormItem>
                        <CustomFormItem label="3. Tarih Aralığı" required>
                            <div className="date-form-item">
                                <CustomFormItem
                                    rules={[
                                        { required: !isAlways, message: 'Lütfen seçimleri yapınız.' },
                                        {
                                            validator: dateValidatorPeriodControl,
                                            message: 'Lütfen girilen tarihleri kontrol ediniz.',
                                        },
                                    ]}
                                    style={{ width: '50%' }}
                                    name="period3StartDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                                <CustomFormItem
                                    rules={[
                                        { required: !isAlways, message: 'Lütfen seçimleri yapınız.' },
                                        {
                                            validator: dateValidator,
                                            message:
                                                'Bitiş tarihleri başlangıç tarihlerinden daha ileri bir zaman seçilmelidir.',
                                        },
                                    ]}
                                    style={{ width: '50%' }}
                                    name="period3EndDate"
                                    dependencies={['isAlways']}
                                >
                                    <CustomDatePicker disabled={isAlways} height={35}></CustomDatePicker>
                                </CustomFormItem>
                            </div>
                        </CustomFormItem>
                    </div>
                </CustomForm>
            </CustomModal>
        </CustomPageHeader>
    );
};

export default PreferencePeriod;
