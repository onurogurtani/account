import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';

import {
    CustomButton,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomSelect,
    Option,
    Text,
} from '../../../components';
import {
    getByFilterPagedContractKinds,
    getByFilterPagedDocuments,
    getFilteredContractTypes,
} from '../../../store/slice/contractsSlice';
import '../../../styles/settings/contracts.scss';

const statusObj = [
    { id: 0, name: 'Pasif' },
    { id: 1, name: 'Aktif' },
];

const Filter = () => {
    const [filteredKinds, setFilteredKinds] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const loadContractsData = useCallback(async () => {
        let typeData = {
            contractTypeDto: {
                pageNumber: 1,
                pageSize: 1000,
            },
        };
        await dispatch(getFilteredContractTypes(typeData));
        let kindData = { contractKindDto: {} };
        await dispatch(getByFilterPagedContractKinds(kindData));
    }, [dispatch]);

    useEffect(() => {
        const ac = new AbortController();
        loadContractsData();
        return () => {
            ac.abort();
        };
    }, []);

    const { contractTypes, contractKinds } = useSelector((state) => state?.contracts);

    useEffect(() => {
        setFilteredKinds([...contractKinds]);
    }, [contractKinds]);

    const disabledStartDate = (startValue) => {
        const { validEndDate } = form?.getFieldsValue(['validEndDate']);
        if (!startValue || !validEndDate) {
            return false;
        }
        return startValue?.startOf('day') > validEndDate?.startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { validStartDate } = form?.getFieldsValue(['validStartDate']);
        if (!endValue || !validStartDate) {
            return false;
        }
        return endValue?.startOf('day') < validStartDate?.startOf('day');
    };

    const findNewArr = async (arr) => {
        form.resetFields(['contractKindIds']);
        let kinds = contractKinds.filter((obj) => arr.includes(obj.contractTypeId));
        setFilteredKinds([...kinds]);
    };
    const handleClear = useCallback(async () => {
        form.resetFields();
        await dispatch(getByFilterPagedDocuments());
    }, [dispatch, form]);
    const handleSearch = useCallback(async () => {
        try {
            const values = await form.validateFields();
            let arr = [];
            values?.contractTypes?.map((el) => arr.push({ contractTypeId: el }));
            const data = {
                contractTypeIds: values?.contractTypes || undefined,
                contractKindIds: values.contractKindIds || undefined,
                recordStatus: values?.recordStatus,
                validStartDate: values?.validStartDate
                    ? dayjs(values?.validStartDate)?.format('YYYY-MM-DDT00:00:00')
                    : undefined,
                validEndDate: values?.validEndDate && dayjs(values?.validEndDate)?.format('YYYY-MM-DDT23:59:59'),
            };
            await dispatch(getByFilterPagedDocuments(data));
        } catch (e) {}
        form.resetFields();
    }, []);

    return (
        <div className="contract-filter-card">
            <CustomForm name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
                <div className="filter-form">
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Sözleşme Tipi" />
                            </div>
                        }
                        name="contractTypes"
                        style={{
                            width: '400px',
                        }}
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            onChange={(value) => {
                                findNewArr(value);
                            }}
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100% !important',
                            }}
                        >
                            {contractTypes?.map(({ id, name }) => (
                                <Option key={id} value={id}>
                                    {name}
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Sözleşme Türü Adı" />
                            </div>
                        }
                        name="contractKindIds"
                        style={{
                            width: '400px',
                        }}
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                            allowClear
                            mode="multiple"
                        >
                            {filteredKinds?.map(({ id, name }, index) => (
                                <Option id={id} key={index} value={id}>
                                    <Text t={name} />
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Durumu" />
                            </div>
                        }
                        name="recordStatus"
                        className="filter-item"
                    >
                        <CustomSelect
                            className="form-filter-item"
                            placeholder={'Seçiniz'}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Option key={null} value={null}>
                                <Text t="Hepsi" />
                            </Option>
                            {statusObj.map(({ id, name }, index) => (
                                <Option id={id} key={index} value={id}>
                                    <Text t={name} />
                                </Option>
                            ))}
                        </CustomSelect>
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Başlangıç Tarihi ve Saati" />
                            </div>
                        }
                        name="validStartDate"
                        className="filter-item"
                    >
                        <CustomDatePicker
                            className="form-filter-item"
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledStartDate}
                        />
                    </CustomFormItem>
                    <CustomFormItem
                        label={
                            <div>
                                <Text t="Bitiş Tarihi ve Saati" />
                            </div>
                        }
                        name="validEndDate"
                        className="filter-item"
                    >
                        <CustomDatePicker
                            className="form-filter-item"
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledEndDate}
                        />
                    </CustomFormItem>
                </div>
                <div className="form-footer">
                    <div className="action-buttons">
                        <CustomButton data-testid="clear" className="clear-btn" onClick={handleClear}>
                            <Text t="Temizle" />
                        </CustomButton>
                        <CustomButton data-testid="search" className="search-btn" onClick={handleSearch}>
                            <CustomImage className="icon-search" src={iconSearchWhite} /> <Text t="Ara" />
                        </CustomButton>
                    </div>
                </div>
            </CustomForm>
        </div>
    );
};

export default Filter;
