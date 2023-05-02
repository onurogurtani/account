import { Form } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import {
    confirmDialog,
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    CustomSelect,
    Option,
    Text,
} from '../../../components';
import modalClose from '../../../assets/icons/icon-close.svg';
import { examTypeList, examTypes, LGS, TYT, OTHER, ADD, UPDATE, COPY } from '../../../constants/settings/coefficients';
import LGSForm from './form/LGSForm';
import TYTForm from './form/TYTForm';
import AYTForm from './form/AYTForm';
import YKSForm from './form/YKSForm';
import OtherForm from './form/OtherForm';
import '../../../styles/settings/coefficient.scss';

const CoefficientFormModal = ({ modalVisible, handleModalVisible, operationType, selectedCoefficientData }) => {
    const [form] = Form.useForm();
    const [selectedExamType, setSelectedExamType] = useState("");

    useEffect(() => {
        if (Object.keys(selectedCoefficientData).length > 0) {
            const { id: selectedExamTypeId } = selectedCoefficientData;
            form.setFieldsValue({ ...selectedCoefficientData, selectedExamType: selectedExamTypeId });
            setSelectedExamType(selectedExamTypeId);
        }
    }, [selectedCoefficientData]);

    useEffect(() => {
        if (operationType === ADD) {
            setSelectedExamType("");
            form.resetFields();
        }
    }, [operationType])

    const examIdOnChange = (value) => {
        form.setFieldsValue({ examTypeId: value });
        setSelectedExamType(value)
    }

    const onCancel = useCallback(() => {
        {
            confirmDialog({
                title: 'Uyarı',
                message: 'İptal Etmek İstediğinizden Emin Misiniz?',
                okText: 'Evet',
                cancelText: 'Hayır',
                onOk: () => {
                    handleModalVisible(false);
                    form.resetFields();
                    setSelectedExamType("");
                },
            });
        }
    });

    const WarningMessage = () => (
        <span className='warn-message'>
            <Text t="Seçilen sınav türüne ait kayıt bulunmamaktadır.
          Yeni ekleme yapamazsınız.
          Mevcut aktif kayıt üzerinde güncelleme ya da kopyalama yaparak yeni kayıt oluşturabilirsiniz." />
        </span>
    );

    const ExamForm = ({ type }) => {
        switch (type) {
            case examTypes.LGS:
                return <LGSForm type={LGS} record={selectedCoefficientData} />;
            case examTypes.TYT:
                return <TYTForm type={TYT} record={selectedCoefficientData} />;
            case examTypes.AYT:
                return <AYTForm record={selectedCoefficientData} />;
            case examTypes.YKS:
                return <YKSForm record={selectedCoefficientData} />;
            case examTypes.OTHER:
                return <OtherForm type={OTHER} record={selectedCoefficientData} />;
            default:
                return <WarningMessage />;
        }
    };

    const renderOperationButton = () => {
        const buttonProps = {
            className: "save-btn",
            type: "primary",
            htmlType: "submit",
        };

        let buttonText;
        switch (operationType) {
            case UPDATE:
                buttonText = "Güncelle";
                break;
            case COPY:
                buttonText = "Kopyala";
                break;
            default:
                buttonText = "Kaydet";
        }

        return (
            <CustomButton {...buttonProps}>
                <span className="submit">
                    <Text t={buttonText} />
                </span>
            </CustomButton>
        );
    };

    const modalTitleMap = {
        [ADD]: "Katsayı Ekle",
        [UPDATE]: "Katsayı Güncelle",
        [COPY]: "Katsayı Kopyala",
    };

    const getModalTitle = () => modalTitleMap[operationType] || "Katsayı Ekle";
    const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };
    return (
        <CustomModal
            className="coefficient-modal"
            footer={false}
            title={getModalTitle()}
            visible={modalVisible}
            onCancel={onCancel}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <CustomForm
                form={form}
                validateMessages={validateMessages}
                autoComplete="off"
                labelWrap
                layout={'horizontal'}
            >
                <CustomFormItem
                    label={<Text t="Sınav Türü" />}
                    name="selectedExamType"
                    rules={[{ required: true, message: <Text t="Sınav türü seçiniz." /> }]}
                >
                    <CustomSelect
                        disabled={operationType === UPDATE || operationType === COPY}
                        placeholder="Sınav türü seçiniz..."
                        optionFilterProp="children"
                        onChange={examIdOnChange}
                    >
                        {examTypeList.map(({ id, value }) => (
                            <Option key={id} value={id}>
                                {value}
                            </Option>
                        ))}
                    </CustomSelect>
                </CustomFormItem>

                <div className='form-container'>
                    <ExamForm type={selectedExamType} />
                </div>

                <CustomFormItem className="btn-group">
                    <CustomButton className="cancel-btn" type="primary" onClick={onCancel}>
                        <span className="submit">
                            <Text t="İptal" />
                        </span>
                    </CustomButton>
                    {renderOperationButton()}
                </CustomFormItem>
            </CustomForm>
        </CustomModal>
    );
};

export default CoefficientFormModal;
