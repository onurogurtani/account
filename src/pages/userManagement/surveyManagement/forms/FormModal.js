import React, { useCallback } from 'react';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    Text,
    Option
} from "../../../../components";
import modalClose from "../../../../assets/icons/icon-close.svg";
import { Form, Select, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const AddFormModal = ({ modalVisible, handleModalVisible }) => {

    const [form] = Form.useForm();

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);

    const onFinish = (values) => {
        console.log("VALUES", values)
    }

    const onStatusChange = (value) => {
        form.setFieldsValue({
            status: value
        })
    }

    const onCategoryChange = (value) => {
        form.setFieldsValue({
            category: value
        })
    }

    const onTargetGroupChange = (value) => {
        form.setFieldsValue({
            targetGroup: value
        })
    }

    const onSurveyConstraintChange = (value) => {
        form.setFieldsValue({
            surveyConstraint: value
        })
    }

    const onSurveyCompletionStatusChange = (value) => {
        form.setFieldsValue({
            surveyCompletionStatus: value
        })
    }

    return (
        <CustomModal
            className="add-survey-modal"
            maskClosable={false}
            footer={false}
            title={'Yeni Anket Oluştur'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='survey-container'>
                <CustomForm
                    name='filterForm'
                    className="survey-form"
                    form={form}
                    onFinish={onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    <div className="survey-content">
                        <div className="form-left-side">
                            <CustomFormItem
                                label="Anket Başlığı"
                                name="title"
                               
                            >
                                <Input
                                    placeholder="Anket Başlığı"
                                    height={36}
                                />
                            </CustomFormItem>
                            <CustomFormItem
                                label='Durum'
                                name='status'
                            >
                                <Select
                                    placeholder="Durum..."
                                    onChange={onStatusChange}
                                >
                                    <Option value="Aktif">Aktif</Option>
                                    <Option value="Pasif">Pasif</Option>
                                </Select>
                            </CustomFormItem>
                            <CustomFormItem
                                label="Kategori"
                                name='category'
                            >
                                <Select
                                    placeholder="Kategori..."
                                    onChange={onCategoryChange}
                                >
                                    <Option value="Envanter Testi">Envanter Testi</Option>
                                    <Option value="Deneme Sınavından Sonra">Deneme Sınavından Sonra</Option>
                                    <Option value="Koçluk Görüşmesinden Sonra">Koçluk Görüşmesinden Sonra</Option>
                                    <Option value="Genel Memnuniyet Anketi">Genel Memnuniyet Anketi</Option>
                                    <Option value="Etkinlik Sonrası Anket">Etkinlik Sonrası Anket</Option>
                                </Select>

                            </CustomFormItem>
                            <CustomFormItem
                                label='Hedef Kitle'
                                name='targetGroup'
                            >
                                <Select
                                    placeholder="Hedef Kitle..."
                                    onChange={onTargetGroupChange}
                                >
                                    <Option value="Veli">Veli</Option>
                                    <Option value="Öğrenci">Öğrenci</Option>
                                    <Option value="Koç">Koç</Option>
                                    <Option value="Genel">Genel</Option>
                                </Select>
                            </CustomFormItem>

                            <CustomFormItem
                                label='Anket Kısıtı/Tipi'
                                name='surveyConstraint'
                            >
                                <Select
                                    placeholder="Anket Kısıtı/Tipi..."
                                    onChange={onSurveyConstraintChange}
                                >
                                    <Option value="Veli Özelinde">Veli Özelinde</Option>
                                    <Option value="Koç Özelinde">Koç Özelinde</Option>
                                    <Option value="Genel">Genel</Option>
                                    <Option value="Sınıf Özelinde">Sınıf Özelinde</Option>
                                    <Option value="İl Bazında">İl Bazında</Option>
                                    <Option value="Alan Bazında">Alan Bazında</Option>
                                    <Option value="Okul Türü Bazında">Okul Türü Bazında</Option>
                                    <Option value="Okul Bazında">Okul Bazında</Option>
                                </Select>
                            </CustomFormItem>
                            <CustomFormItem
                                label='Anket Tamamlama Durumu'
                                name='surveyCompletionStatus'
                            >
                                <Select
                                    placeholder="Anket Tamamlama Durumu..."
                                    onChange={onSurveyCompletionStatusChange}
                                >
                                    <Option value="Tüm Soruları Yanıtladığında Anketi Bitirebilir">Tüm Soruları Yanıtladığında Anketi Bitirebilir</Option>
                                    <Option value="Kullanıcı Her An Anketi Bitirebilir">Kullanıcı Her An Anketi Bitirebilir</Option>
                                </Select>
                            </CustomFormItem>
                            <div className='form-date-picker'>
                                <CustomFormItem
                                    label="Anket Başlangıç Tarihi"
                                    name="startDate"
                                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <DatePicker />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Saat"
                                    name="startTime"
                                    getValueFromEvent={(onChange) => moment(onChange).format("HH:mm")}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <TimePicker format='HH:mm' showNow={false} />
                                </CustomFormItem>
                            </div>
                            <div className='form-date-picker'>
                                <CustomFormItem
                                    label="Anket Bitiş Tarihi"
                                    name="endDate"
                                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <DatePicker />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Saat"
                                    name="endTime"
                                    getValueFromEvent={(onChange) => moment(onChange).format("HH:mm")}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <TimePicker format='HH:mm' showNow={false} />
                                </CustomFormItem>
                            </div>
                        </div>
                        <div className="form-right-side">
                            <p>
                            Anket Ön Bilgilendirme Yazısı
                            </p>  
                            <CustomFormItem
                                name="description"
                            >
                                <TextArea  rows={4} />
                            </CustomFormItem>
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <CustomFormItem className='footer-form-item'>
                            <CustomButton className='cancel-btn' type='danger' onClick={() => handleModalVisible(false)}>
                                <span className='cancel'>
                                    <Text t='İptal' />
                                </span>
                            </CustomButton>
                            <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                                <span className='submit'>
                                    <Text t='Soruları Seç' />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                    </div>
                </CustomForm>
            </div>

        </CustomModal>
    );
}

export default AddFormModal;