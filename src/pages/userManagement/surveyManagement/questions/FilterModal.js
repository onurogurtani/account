import React, { useCallback } from 'react';
import {
    CustomImage,
    CustomModal
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import '../../../../styles/surveyManagement/surveyStyles.scss'
import {
    CustomForm,
    CustomButton,
    CustomFormItem,
    Text,
    useText,
    CustomInput
} from '../../../../components';
import { Form, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { getQuestions } from '../../../../store/slice/questionSlice'



const FilterModal = ({ handleModalVisible, modalVisible, filterParams, setFilterParams ,emptyFilterObj}) => {

    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const { Option } = Select;

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);

    const onFinish = (values) => {
        dispatch(getQuestions(values));
        setFilterParams(values)
        handleClose()
    }

    const resetForm = () => {
        dispatch(getQuestions(emptyFilterObj));
        setFilterParams(emptyFilterObj)
        handleClose()
        form.setFieldsValue(emptyFilterObj)
    }
    
    return (
        <CustomModal
            className='filter-modal'
            maskClosable={false}
            footer={false}
            title={`Filtrele`}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} onClick={resetForm} />}
        >
            <div className='filter-list-container'>
                <CustomForm
                    name='dataFilterForm'
                    className='data-filter-form survey-form'
                    form={form}
                    initialValues={filterParams}
                    onFinish={onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    <div className="data-filter-form-content">
                        <Form.Item
                            label={<Text t='Soru Tipi' />}
                            name='QuestionTypeId'
                        >
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Soru Tipi"
                            >
                                <Option value={"1"}> Açık Uçlu Soru </Option>,
                                <Option value={"7"}> Tek Seçimli Soru </Option>,
                                <Option value={"3"}> Çok Seçimli Soru </Option>,
                                <Option value={"4"}> Boşluk Doldurma Sorusu </Option>,
                                <Option value={"5"}> Likert Tipi Soru </Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Text t='Durum' />}
                            name='Status'
                        >
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Durum"
                            >
                                <Option value={"true"}> Aktif </Option>,
                                <Option value={"false"}> Pasif </Option>
                            </Select>
                        </Form.Item>
                        <CustomFormItem
                            label={<Text t='Soru Başlığı' />}
                            name='HeadText'
                        >
                            <CustomInput
                                placeholder={useText('Soru Başlığı')}
                                height={36}
                            />
                        </CustomFormItem>

                        <CustomFormItem
                            label={<Text t='Soru Metni' />}
                            name='Text'
                        >
                            <CustomInput
                                placeholder={useText('Soru Metni')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Etiket' />}
                            name='Tags'
                        >
                            <CustomInput
                                placeholder={useText('Etiket')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Cevap Şıkları' />}
                            name='ChoiseText'
                        >
                            <CustomInput
                                placeholder={useText('Cevap Şıkları')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Oluşturan Kullanıcı' />}
                            name='InsertUserName'
                        >
                            <CustomInput
                                placeholder={useText('Oluşturan Kullanıcı')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Güncelleyen Kullanıcı' />}
                            name='UpdateUserName'
                        >
                            <CustomInput
                                placeholder={useText('Güncelleyen Kullanıcı')}
                                height={36}
                            />
                        </CustomFormItem>

                    </div>

                    <div className='form-buttons'>
                        <CustomFormItem className='footer-form-item'>
                            <CustomButton className='reset-btn' type='danger' onClick={resetForm}>
                                <span className='reset'>
                                    <Text t='Sıfırla' />
                                </span>
                            </CustomButton>
                            <CustomButton className='filter-btn' type='primary' htmlType='submit'>
                                <span className='filter'>
                                    <Text t='Filtrele' />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                    </div>
                </CustomForm>
            </div>
        </CustomModal>
    )
}

export default FilterModal