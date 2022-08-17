import React, { useCallback, useState } from 'react';
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
import '../../../../styles/surveyManagement/surveyFormStyles.scss';
import { Form, Select, Input, DatePicker } from 'antd';
import moment from 'moment';


const FilterFormModal = ({ modalVisible, handleModalVisible }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("VALUES", values)
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

    const onStatusChange = (value) => {
        form.setFieldsValue({
            status: value
        })
    }

    const formReset = () => {
        form.resetFields();
    }

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
    }, [handleModalVisible, form]);

    return (
        <CustomModal
            className='forms-modal'
            maskClosable={false}
            footer={false}
            title={'Filtrele'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='forms-container'>
                <CustomForm
                name='filterForm'
                className='forms-link-form'
                form={form}
                onFinish={onFinish}
                autoComplete='off'
                layout={'horizontal'}
            >
                <Form.Item
                    label="Kategori"
                    name='category'
                >
                    <Select
                        placeholder="Kategori Seçiniz..."
                        onChange={onCategoryChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        <Option value="Envanter Testi">Envanter Testi</Option>
                        <Option value="Deneme Sınavından Sonra">Deneme Sınavından Sonra</Option>
                        <Option value="Koçluk Görüşmesinden Sonra">Koçluk Görüşmesinden Sonra</Option>
                        <Option value="Genel Memnuniyet Anketi">Genel Memnuniyet Anketi</Option>
                        <Option value="Etkinlik Sonrası Anket">Etkinlik Sonrası Anket</Option>
                    </Select>

                </Form.Item>
                <Form.Item
                    label='Hedef Kitle' 
                    name='targetGroup'
                >
                    <Select
                        placeholder="Hedef Kitle Seçiniz..."
                        onChange={onTargetGroupChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        <Option value="Veli">Veli</Option>
                        <Option value="Öğrenci">Öğrenci</Option>
                        <Option value="Koç">Koç</Option>
                        <Option value="Genel">Genel</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Anket Kısıtı/Tipi'
                    name='surveyConstraint'
                >
                    <Select
                        placeholder="Anket Kısıtı/Tipi..."
                        onChange={onSurveyConstraintChange}
                        mode="multiple"
                        showArrow
                        height="40px"
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
                </Form.Item>
                <Form.Item
                    label='Durum' 
                    name='status'
                >
                    <Select
                        placeholder="Durum..."
                        onChange={onStatusChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        <Option value="Aktif">Aktif</Option>
                        <Option value="Pasif">Pasif</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Anket Adı"
                    name="surveyName"
                >
                    <Input
                        placeholder="Anket Adı"
                    />
                </Form.Item>
                <Form.Item
                    label="Anket Başlangıç Tarihi"
                    name="startDate"
                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                    getValueProps={(i) => moment(i)}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Anket Bitiş Tarihi"
                    name="endDate"
                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                    getValueProps={(i) => moment(i)}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Oluşturan Kullanıcı"
                    name="createdBy"
                >
                    <Input
                        placeholder="Oluşturan Kullanıcı"
                    />
                </Form.Item>
                <Form.Item
                    label="Güncelleyen Kullanıcı"
                    name="updatedBy"
                >
                    <Input
                        placeholder="Güncelleyen Kullanıcı"
                    />
                </Form.Item>
                <div className='action-container'>
                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='reset-btn' onClick={formReset} >
                            <span className='submit'>
                                <Text t='Sıfırla' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                            <span className='submit'>
                                <Text t='Kaydet' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </div>

            </CustomForm>
            </div>
            

        </CustomModal>
    );
}

export default FilterFormModal;