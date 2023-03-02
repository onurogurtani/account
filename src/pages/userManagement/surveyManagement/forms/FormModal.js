import React, { useCallback, useEffect } from 'react';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    Text,
    Option,
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import { Form, Select, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import { getFilteredPagedForms, getFormCategories } from '../../../../store/slice/formsSlice';
import { useDispatch, useSelector } from 'react-redux';

const { TextArea } = Input;

const AddFormModal = ({
    modalVisible,
    handleModalVisible,
    setSelectedForm,
    selectedForm,
    isEdit,
    setIsEdit,
    forms,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { formList, formCategories } = useSelector((state) => state?.forms);

    useEffect(() => {
        dispatch(getFilteredPagedForms({}));
        dispatch(getFormCategories({ pageNumber: 0 }));
    }, [dispatch]);
    const handleClose = useCallback(() => {
        setIsEdit(false);
        handleModalVisible(false);
        setSelectedForm('');
    }, [handleModalVisible]);

    const onFinish = (values) => {};

    const onStatusChange = (value) => {
        form.setFieldsValue({
            Status: value,
        });
    };

    const onCategoryChange = (value) => {
        form.setFieldsValue({
            CategoryId: value,
        });
    };

    const onTargetGroupChange = (value) => {
        form.setFieldsValue({
            TargetGroupId: value,
        });
    };

    const onSurveyConstraintChange = (value) => {
        form.setFieldsValue({
            SurveyConstraintId: value,
        });
    };

    const onSurveyCompletionStatusChange = (value) => {
        form.setFieldsValue({
            surveyCompletionStatusId: value,
        });
    };

    return (
        <CustomModal
            className="add-survey-modal"
            maskClosable={false}
            footer={false}
            title={'Yeni Anket Oluştur'}
            initialValues={isEdit ? selectedForm : {}}
            visible={true}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className="survey-container">
                <CustomForm
                    name="filterForm"
                    className="survey-form"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout={'horizontal'}
                >
                    <div className="survey-content">
                        <div className="form-left-side">
                            <CustomFormItem label="Anket Başlığı" name="name">
                                <Input placeholder="Anket Başlığı" height={36} />
                            </CustomFormItem>
                            <CustomFormItem label="Durum" name="isActive">
                                <Select placeholder="Durum..." onChange={onStatusChange}>
                                    <Option value="Aktif">Aktif</Option>
                                    <Option value="Pasif">Pasif</Option>
                                </Select>
                            </CustomFormItem>
                            <CustomFormItem label="Kategori" name="categoryId">
                                <Select
                                    placeholder="Kategori Seçiniz..."
                                    onChange={onCategoryChange}
                                    mode="multiple"
                                    showArrow
                                    height="40px"
                                >
                                    {formCategories?.map(({ id, name }) => (
                                        <Option key={id} value={id}>
                                            {name}
                                        </Option>
                                    ))}
                                    {/* <Option value="Envanter Testi">Envanter Testi</Option>
                                    <Option value="Deneme Sınavından Sonra">Deneme Sınavından Sonra</Option>
                                    <Option value="Koçluk Görüşmesinden Sonra">Koçluk Görüşmesinden Sonra</Option>
                                    <Option value="Genel Memnuniyet Anketi">Genel Memnuniyet Anketi</Option>
                                    <Option value="Etkinlik Sonrası Anket">Etkinlik Sonrası Anket</Option> */}
                                </Select>
                            </CustomFormItem>
                            <CustomFormItem label="Hedef Kitle" name="TargetGroupId"></CustomFormItem>

                            <CustomFormItem label="Anket Kısıtı/Tipi" name="SurveyConstraintId"></CustomFormItem>

                            <CustomFormItem label="Anket Tamamlama Durumu" name="surveyCompletionStatusId">
                                <Select
                                    placeholder="Anket Tamamlama Durumu..."
                                    onChange={onSurveyCompletionStatusChange}
                                >
                                    <Option value="Tüm Soruları Yanıtladığında Anketi Bitirebilir">
                                        Tüm Soruları Yanıtladığında Anketi Bitirebilir
                                    </Option>
                                    <Option value="Kullanıcı Her An Anketi Bitirebilir">
                                        Kullanıcı Her An Anketi Bitirebilir
                                    </Option>
                                </Select>
                            </CustomFormItem>
                            <div className="form-date-picker">
                                <CustomFormItem
                                    label="Anket Başlangıç Tarihi"
                                    name="startDate"
                                    getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DDTHH:mm:ssZ')}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <DatePicker />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Saat"
                                    name="startTime"
                                    getValueFromEvent={(onChange) => moment(onChange).format('HH:mm')}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <TimePicker format="HH:mm" showNow={false} />
                                </CustomFormItem>
                            </div>
                            <div className="form-date-picker">
                                <CustomFormItem
                                    label="Anket Bitiş Tarihi"
                                    name="endDate"
                                    getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DDTHH:mm:ssZ')}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <DatePicker />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Saat"
                                    name="endTime"
                                    getValueFromEvent={(onChange) => moment(onChange).format('HH:mm')}
                                    getValueProps={(i) => moment(i)}
                                >
                                    <TimePicker format="HH:mm" showNow={false} />
                                </CustomFormItem>
                            </div>
                        </div>
                        <div className="form-right-side">
                            <p>Anket Ön Bilgilendirme Yazısı</p>
                            <CustomFormItem name="description">
                                <TextArea rows={4} />
                            </CustomFormItem>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <CustomFormItem className="footer-form-item">
                            <CustomButton
                                className="cancel-btn"
                                type="danger"
                                onClick={() => handleModalVisible(false)}
                            >
                                <span className="cancel">
                                    <Text t="İptal" />
                                </span>
                            </CustomButton>
                            <CustomButton className="submit-btn" type="primary" htmlType="submit">
                                <span className="submit">
                                    <Text t="Soruları Seç" />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                    </div>
                </CustomForm>
            </div>
        </CustomModal>
    );
};

export default AddFormModal;
