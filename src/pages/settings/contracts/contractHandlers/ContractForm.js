import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomCheckbox,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    Text,
} from '../../../../components';
import { getByFilterPagedContractKinds, getFilteredContractTypes } from '../../../../store/slice/contractsSlice';
import contractsServices from '../../../../services/contracts.service';
import { dateValidator, reactQuillValidator } from '../../../../utils/formRule';
import '../../../../styles/settings/contracts.scss';
import HandleContractFormButton from './HandleContractFormButton';

const statusObj = [
    { id: 0, name: 'Pasif' },
    { id: 1, name: 'Aktif' },
];

const ContractForm = ({ initialValues }) => {
    const [versionValue, setVersionValue] = useState(
        initialValues ? (initialValues.handleType === 'edit' ? initialValues?.version : initialValues?.version + 1) : 1,
    );
    const initialData = {
        recordStatus: 1,
        version: `V${versionValue}`,
    };
    const [filteredKinds, setFilteredKinds] = useState([]);
    const history = useHistory();
    const [initialObj, setInitialObj] = useState(initialValues || initialData);

    const [isErrorReactQuill, setIsErrorReactQuill] = useState(false);
    const dispatch = useDispatch();
    const [quillValue] = useState('');

    const [form] = Form.useForm();

    const loadContractsData = useCallback(async () => {
        let typeData = {
            pageNumber: 1,
            pageSize: 1000,
            recordStatus: 1,
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

    const handleFindKinds = async (arr) => {
        form.resetFields(['contractKinds']);
        let filteredKinds = contractKinds.filter((obj) => arr.includes(obj?.contractTypeId));
        setFilteredKinds([...filteredKinds]);
    };

    useEffect(() => {
        form.setFieldsValue({});
        if (initialValues) {
            const currentDate = dayjs().utc().format('YYYY-MM-DD-HH-mm');
            const startDate = dayjs(initialValues?.startDate).utc().format('YYYY-MM-DD-HH-mm');
            const endDate = dayjs(initialValues?.endDate).utc().format('YYYY-MM-DD-HH-mm');
            let initialDate = {
                startDate: startDate >= currentDate ? dayjs(initialValues?.validStartDate) : undefined,
                endDate: endDate >= currentDate ? dayjs(initialValues?.validEndDate) : undefined,
            };
            let types = [];
            initialObj?.contractTypes?.map((t) => types.push(t.contractType?.id));
            handleFindKinds(types);
            let initialData = {
                ...initialDate,
                contractTypes: types,
                contractKinds: initialObj?.contractKind?.id,
                clientRequiredApproval: initialObj?.clientRequiredApproval,
                requiredApproval: initialObj?.requiredApproval,
                content: initialObj?.content,
                version: `V${initialObj.version}`,
                recordStatus: initialObj?.recordStatus,
            };
            console.log('"two', 'two');
            setInitialObj({ ...initialData });
            form.setFieldsValue({ ...initialData });
            if (initialValues.handleType === 'copy') {
                confirmDialog({
                    title: <Text t="attention" />,
                    message: 'Kopyalamak istediğiniz kaydın versiyon bilgisi otomatik olarak değiştirilecektir.',
                    okText: <Text t="Evet" />,
                    cancelText: 'Vazgeç',
                    onOk: async () => {
                        console.log('"one', 'one');
                        let data = await contractsServices.getVersionForCopiedContract({ id: initialValues?.id });
                        setInitialObj(data?.data);
                        console.log('data.data.version', data.data.version);
                        setVersionValue(data?.data?.version);
                        initialData.id = data?.data?.id;
                        initialData.version = `V${data?.data?.version}`;
                        await form.setFieldsValue({ ...initialData });
                    },
                    onCancel: async () => {
                        history.push('/settings/contracts');
                    },
                });
            }
        }
    }, [form, initialValues, history, handleFindKinds]);

    const disabledStartDate = (startValue) => {
        const { endDate } = form?.getFieldsValue(['endDate']);
        return startValue?.startOf('day') > endDate?.startOf('day') || startValue < dayjs().startOf('day');
    };

    const disabledEndDate = (endValue) => {
        const { startDate } = form?.getFieldsValue(['startDate']);

        return endValue?.startOf('day') < startDate?.startOf('day') || endValue < dayjs().startOf('day');
    };
    const text = Form.useWatch('text', form);
    useEffect(() => {
        if (text === '<p><br></p>' || text === '') {
            setIsErrorReactQuill(true);
        } else {
            setIsErrorReactQuill(false);
        }
    }, [text]);

    return (
        <CustomForm
            name="contractInfo"
            className="addContractInfo-link-form"
            form={form}
            autoComplete="off"
            layout={'horizontal'}
            initialValues={initialObj}
        >
            <CustomFormItem
                label={
                    <div>
                        <Text t="Sözleşme Tipi" />
                    </div>
                }
                name="contractTypes"
                validateTrigger={['onChange', 'onBlur']}
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            >
                <CustomSelect mode="multiple" allowClear showArrow placeholder="Seçiniz" onChange={handleFindKinds}>
                    {contractTypes
                        ?.filter((t) => t.recordStatus !== 0)
                        ?.map(({ id, name }) => (
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
                name="contractKinds"
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            >
                <CustomSelect placeholder={'Seçiniz'} allowClear showArrow>
                    {filteredKinds?.map(({ id, name }, index) => (
                        <Option id={id} key={index} value={id}>
                            <Text t={name} />
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
                className="editor"
                label={<Text t="İçerik" />}
                name="content"
                value={quillValue}
                rules={[
                    { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                    {
                        validator: reactQuillValidator,
                        message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." />,
                    },
                ]}
            >
                <ReactQuill className={isErrorReactQuill ? 'quill-error' : ''} theme="snow" />
            </CustomFormItem>
            <div className="version-container">
                <CustomFormItem label="Versiyon" name="version" value={`V${versionValue}`}>
                    <CustomInput disabled />
                </CustomFormItem>
                <CustomButton
                    className="version-increase-button"
                    onClick={() => {
                        form.setFieldsValue({ version: `V${versionValue + 1}` });
                        setVersionValue(versionValue + 1);
                    }}
                    disabled={initialValues?.handleType === 'copy'}
                >
                    Versiyon Ekle
                </CustomButton>
            </div>
            <p className="version-info-pgh">Versiyon bilgisi sistem tarafından otomatik olarak sağlanacaktır.</p>
            <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                    <CustomFormItem
                        label={<Text t="Geçerlilik Baş. Tarihi" />}
                        name="startDate"
                        rules={[
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },

                            {
                                validator: dateValidator,
                                message: <Text t="Girilen tarihleri kontrol ediniz" />,
                            },
                        ]}
                    >
                        <CustomDatePicker
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledStartDate}
                            format="YYYY-MM-DD HH:mm"
                            showTime={true}
                        />
                    </CustomFormItem>
                </Col>
            </Row>
            <p className="date-info-pgh">
                Başlangıç tarihi sözleşmenin geçerliliğinin başladığı tarihi göstermenizi sağlar.
            </p>
            <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 16 }}>
                    <CustomFormItem
                        label={<Text t="Geçerlilik Bitiş Tarihi" />}
                        name="endDate"
                        rules={[
                            { required: true, message: <Text t="Lütfen Zorunlu Alanları Doldurunuz." /> },
                            {
                                validator: dateValidator,
                                message: <Text t="Girilen tarihleri kontrol ediniz" />,
                            },
                        ]}
                    >
                        <CustomDatePicker
                            placeholder={'Tarih Seçiniz'}
                            disabledDate={disabledEndDate}
                            format="YYYY-MM-DD HH:mm"
                            hideDisabledOptions
                            showTime={true}
                        />
                    </CustomFormItem>
                </Col>
            </Row>
            <p className="date-info-pgh">
                Başlangıç tarihi sözleşmenin geçerliliğinin bittiği tarihi göstermenizi sağlar.
            </p>
            <CustomFormItem
                name="requiredApproval"
                className="custom-form-item"
                valuePropName="checked"
                rules={[{ required: false, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            >
                <CustomCheckbox value="true">
                    <p className="check-info">Onay Talebi</p>
                </CustomCheckbox>
            </CustomFormItem>
            <CustomFormItem
                name="clientRequiredApproval"
                className="custom-form-item"
                valuePropName="checked"
                rules={[{ required: false, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            >
                <CustomCheckbox value="true" disabled>
                    <p className="check-info">Son Kullanıcı Ekranına Onaya Gönder</p>
                </CustomCheckbox>
            </CustomFormItem>
            <CustomFormItem
                label={
                    <div>
                        <Text t="Durumu" />
                    </div>
                }
                name="recordStatus"
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            >
                <CustomSelect className="record-status-select" placeholder={'Seçiniz'}>
                    {statusObj.map(({ id, name }, index) => (
                        <Option id={id} key={index} value={id}>
                            <Text t={name} />
                        </Option>
                    ))}
                </CustomSelect>
            </CustomFormItem>
            <HandleContractFormButton
                contractTypes={contractKinds}
                contractKinds={contractTypes}
                form={form}
                initialValues={initialObj}
            />
        </CustomForm>
    );
};

export default ContractForm;
