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


const FilterModal = ({ handleModalVisible, modalVisible }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const questionType = [
        <Option key={1}> Açık Uçlu Soru </Option>,
        <Option key={2}> Tek Seçimli Soru </Option>,
        <Option key={3}> Çok Seçimli Soru </Option>,
        <Option key={4}> Boşluk Doldurma Sorusu </Option>,
        <Option key={5}> Likert Tipi Soru </Option>
    ];

    const questionStatus = [
        <Option key={1}> Aktif </Option>,
        <Option key={2}> Pasif </Option>
    ]

    const handleClose = useCallback(() => {
        handleModalVisible(false);
    }, [handleModalVisible]);

    const onFinish = (values) => {
        console.log(values)
        handleClose()
    }
    
    const resetForm = () => {
        form.resetFields()
    }

    return (
        <CustomModal
            className='filter-modal'
            maskClosable={false}
            footer={false}
            title={`Filtrele`}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} onClick={resetForm}/>}
        >
            <div className='filter-list-container'>
                <CustomForm
                    name='dataFilterForm'
                    className='data-filter-form survey-form'
                    form={form}
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    <div className="data-filter-form-content">
                        <CustomFormItem
                            label={<Text t='Soru Tipi' />}
                            name='questiontype'
                        >
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Soru Tipi"

                            >
                                {questionType}
                            </Select>
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Durum' />}
                            name='questionstatus'
                        >
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Durum"
 
                            >
                                {questionStatus}
                            </Select>
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Soru Başlığı' />}
                            name='questiontitle'
                        >
                            <CustomInput
                                placeholder={useText('Soru Başlığı')}
                                height={36}
                            />
                        </CustomFormItem>

                        <CustomFormItem
                            label={<Text t='Soru Metni' />}
                            name='questiontext'
                        >
                            <CustomInput
                                placeholder={useText('Soru Metni')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Etiket' />}
                            name='questiontag'
                        >
                            <CustomInput
                                placeholder={useText('Etiket')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Cevap Şıkları' />}
                            name='answerchoise'
                        >
                            <CustomInput
                                placeholder={useText('Cevap Şıkları')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Oluşturan Kullanıcı' />}
                            name='createduser'
                        >
                            <CustomInput
                                placeholder={useText('Oluşturan Kullanıcı')}
                                height={36}
                            />
                        </CustomFormItem>
                        <CustomFormItem
                            label={<Text t='Güncelleyen Kullanıcı' />}
                            name='updateduser'
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