import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import iconSearchWhite from '../../../../assets/icons/icon-white-search.svg';
import {
    CustomButton,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomSelect,
    Option,
    Text,
    useText,
} from '../../../../components';
import { getFilteredPagedForms, getFormCategories, setFormFilterObject } from '../../../../store/slice/formsSlice';
import '../../../../styles/surveyManagement/surveyFilter.scss';

const publishSituation = [
    { id: 1, value: 'Yayında' },
    { id: 2, value: 'Yayında değil' },
    { id: 3, value: 'Taslak' },
];
const publishEnumReverse = {
    1: 'Yayında',
    2: 'Yayında değil',
    3: 'Taslak',
};

const FormFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { filterObject, formList, formCategories } = useSelector((state) => state?.forms);

    useEffect(() => {
        dispatch(getFilteredPagedForms({}));
        dispatch(getFormCategories());
    }, []);

    const handleClear = useCallback(async () => {
        form.resetFields();
        form.resetFields(['CategoryId']);
        const body = {
            name: '',
            PublishStatus: [],
            CategoryId: [],
            InsertEndDate: '',
            InsertStartDate: '',
        };
        await dispatch(
            getFilteredPagedForms({
                ...body,
            }),
        );
    }, [dispatch, form]);

    const handleSearch = useCallback(async () => {
        try {
            const values = await form.validateFields();
            form.resetFields();

            const body = {
                Name: values?.name,
                PublishStatus: values?.PublishStatus,
                CategoryOfFormId: values?.categoryId,
                StartDate: values?.startDate ? dayjs(values?.startDate)?.format('YYYY-MM-DDT00:00:00') : undefined,
                EndDate: values?.endDate && dayjs(values?.endDate)?.format('YYYY-MM-DDT23:59:59'),
            };
            await dispatch(getFilteredPagedForms(body));
        } catch (e) {}
    }, [dispatch, form]);

    const disabledStartDate = (startValue) => {
        const { endDate } = form?.getFieldsValue(['endDate']);
        if (!startValue || !endDate) {
            return false;
        }
        return startValue?.startOf('day') > endDate?.startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { startDate } = form?.getFieldsValue(['startDate']);
        if (!endValue || !startDate) {
            return false;
        }
        return endValue?.startOf('day') < startDate?.startOf('day');
    };

    return (
        <>
            <div className="form-filter-card">
                <CustomForm name="filterForm" autoComplete="off" layout={'vertical'} form={form}>
                    <div className="filter-form">
                        <CustomFormItem
                            label={
                                <div>
                                    <Text t="Anket Adı" />
                                </div>
                            }
                            name="name"
                            className="filter-item"
                        >
                            <CustomSelect
                                showSearch
                                className="form-filter-item"
                                placeholder="Anket Adı Seçiniz..."
                                value={formList.Name}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
                                }
                            >
                                {formList?.map((form) => (
                                    <Option key={form.id} value={form.name}>
                                        {form.name}
                                    </Option>
                                ))}
                                <Option key={11111} value={null}>
                                    Hepsi
                                </Option>
                            </CustomSelect>
                        </CustomFormItem>

                        <CustomFormItem
                            label={
                                <div>
                                    <Text t="Yayınlanma Durumu" />
                                    <span>:</span>
                                </div>
                            }
                            name="PublishStatus"
                            className="filter-item"
                        >
                            <CustomSelect className="form-filter-item" placeholder={useText('Seçiniz')}>
                                {publishSituation?.map(({ id, value }) => (
                                    <Option key={id} value={id}>
                                        {value}
                                    </Option>
                                ))}
                                <Option key={111} value={null}>
                                    <Text t="Hepsi" />
                                </Option>
                            </CustomSelect>
                        </CustomFormItem>

                        <CustomFormItem
                            label={
                                <div>
                                    <Text t="Kategori" />
                                    <span>:</span>
                                </div>
                            }
                            name="categoryId"
                            className="filter-item"
                        >
                            <CustomSelect className="form-filter-item" placeholder={useText('choose')}>
                                {formCategories?.map(({ id, name }) => (
                                    <Option key={id} value={id}>
                                        {name}
                                    </Option>
                                ))}
                                <Option key={112} value={null}>
                                    <Text t="Hepsi" />
                                </Option>
                            </CustomSelect>
                        </CustomFormItem>

                        <CustomFormItem
                            label={
                                <div>
                                    <Text t="Başlangıç Tarihi" />
                                </div>
                            }
                            name="startDate"
                            className="filter-item filter-date"
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
                                    <Text t="Bitiş Tarihi" />
                                </div>
                            }
                            name="endDate"
                            className="filter-item filter-date"
                        >
                            <CustomDatePicker
                                className="form-filter-item"
                                placeholder={'Tarih Seçiniz'}
                                disabledDate={disabledEndDate}
                            />
                        </CustomFormItem>
                    </div>

                    <div className="action-buttons">
                        <CustomButton data-testid="clear" className="clear-btn" onClick={handleClear}>
                            <Text t="Temizle" />
                        </CustomButton>
                        <CustomButton data-testid="search" className="search-btn" onClick={handleSearch}>
                            <CustomImage className="icon-search" src={iconSearchWhite} /> <Text t="Ara" />
                        </CustomButton>
                    </div>
                </CustomForm>
            </div>
        </>
    );
};

export default FormFilter;
