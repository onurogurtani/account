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
import { useDispatch } from 'react-redux';
import {getForms} from '../../../../store/slice/formsSlice'


const FilterFormModal = ({ modalVisible, handleModalVisible, setFilterParams, filterParams, emptyFilterObj, forms }) => {

    const [form] = Form.useForm();

    const dispatch = useDispatch()

    
    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
    }, [handleModalVisible, form]);

    const onFinish = (values) => {
        dispatch(getForms(values));
        setFilterParams(values)
        handleClose()
    }

    const onCategoryChange = (value) => {
        form.setFieldsValue({
            CategoryId: value
        })
    }

    const onTargetGroupChange = (value) => {
        form.setFieldsValue({
            TargetGroupId: value
        })
    }

    const onSurveyConstraintChange = (value) => {
        form.setFieldsValue({
            SurveyConstraintId: value
        })
    }

    const onStatusChange = (value) => {
        form.setFieldsValue({
            Status: value
        })
    }

    const formReset = () => {
        dispatch(getForms(emptyFilterObj));
        setFilterParams(emptyFilterObj)
        handleClose()
        form.setFieldsValue(emptyFilterObj)
    }


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
                initialValues={filterParams}
                autoComplete='off'
                layout={'horizontal'}
            >
                <Form.Item
                    label="Kategori"
                    name='CategoryId'
                >
                    <Select
                        placeholder="Kategori Seçiniz..."
                        onChange={onCategoryChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        {forms.formCategories.items?.map((categoryitems) => (
                            <Option key={categoryitems.id} value={categoryitems.id}>{categoryitems.name}</Option>
                        ))}
                        {/* <Option value="Envanter Testi">Envanter Testi</Option>
                        <Option value="Deneme Sınavından Sonra">Deneme Sınavından Sonra</Option>
                        <Option value="Koçluk Görüşmesinden Sonra">Koçluk Görüşmesinden Sonra</Option>
                        <Option value="Genel Memnuniyet Anketi">Genel Memnuniyet Anketi</Option>
                        <Option value="Etkinlik Sonrası Anket">Etkinlik Sonrası Anket</Option> */}
                    </Select>

                </Form.Item>
                <Form.Item
                    label='Hedef Kitle' 
                    name='TargetGroupId'
                >
                    <Select
                        placeholder="Hedef Kitle Seçiniz..."
                        onChange={onTargetGroupChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        {forms.formTargetGroup.items?.map((targetitems) => (
                            <Option key={targetitems.id} value={targetitems.id}>{targetitems.name}</Option>
                        ))}
                        {/* <Option value="Veli">Veli</Option>
                        <Option value="Öğrenci">Öğrenci</Option>
                        <Option value="Koç">Koç</Option>
                        <Option value="Genel">Genel</Option> */}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Anket Kısıtı/Tipi'
                    name='SurveyConstraintId'
                >
                    <Select
                        placeholder="Anket Kısıtı/Tipi..."
                        onChange={onSurveyConstraintChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                         {forms.surveyConstraint.items?.map((surveyconstraintitems) => (
                            <Option key={surveyconstraintitems.id} value={surveyconstraintitems.id}>{surveyconstraintitems.name}</Option>
                        ))}
                        {/* <Option value="Veli Özelinde">Veli Özelinde</Option>
                        <Option value="Koç Özelinde">Koç Özelinde</Option>
                        <Option value="Genel">Genel</Option>
                        <Option value="Sınıf Özelinde">Sınıf Özelinde</Option>
                        <Option value="İl Bazında">İl Bazında</Option>
                        <Option value="Alan Bazında">Alan Bazında</Option>
                        <Option value="Okul Türü Bazında">Okul Türü Bazında</Option>
                        <Option value="Okul Bazında">Okul Bazında</Option> */}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Durum' 
                    name='Status'
                >
                    <Select
                        placeholder="Durum..."
                        onChange={onStatusChange}
                        mode="multiple"
                        showArrow
                        height="40px"
                    >
                        <Option value="true">Aktif</Option>
                        <Option value="false">Pasif</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Anket Adı"
                    name="Name"
                >
                    <Input
                        placeholder="Anket Adı"
                    />
                </Form.Item>
                <Form.Item
                    label="Anket Başlangıç Tarihi"
                    name="UpdateStartDate"
                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                    getValueProps={(i) => moment(i)}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Anket Bitiş Tarihi"
                    name="UpdateEndDate"
                    getValueFromEvent={(onChange) => moment(onChange).format("YYYY-MM-DDTHH:mm:ssZ")}
                    getValueProps={(i) => moment(i)}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Oluşturan Kullanıcı"
                    name="InsertUserName"
                >
                    <Input
                        placeholder="Oluşturan Kullanıcı"
                    />
                </Form.Item>
                <Form.Item
                    label="Güncelleyen Kullanıcı"
                    name="UpdateUserName"
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