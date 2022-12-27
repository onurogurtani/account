import React, { useCallback, useState, useEffect } from 'react';
import { Form, Checkbox, Col, Row, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomInput,
    CustomNumberInput,
    CustomModal,
    CustomSelect,
    Option,
    errorDialog,
    successDialog,
    Text,
    useText,
    CustomCheckbox,
    confirmDialog
} from '../../../components';
// import '../../../styles/passwordManagement/passwordList.scss'
import '../../../styles/myOrders/paymentModal.scss'
import { useHistory } from 'react-router-dom';

const PasswordFormModal = ({ modalVisible, handleModalVisible, isEdit, handleEdit, passwordRules }) => {
    const [errorList, setErrorList] = useState([]);

    const [form] = Form.useForm();
    const history = useHistory();

    const dispatch = useDispatch();

    const selectList = [
        { text: 'Yok', value: null},
        { text: '1 ay', value: '1' },
        { text: '2 ay', value: '2' },
        { text: '3 ay', value: '3' },
        { text: '4 ay', value: '4' },
        { text: '5 ay', value: '5' },
        { text: '6 ay', value: '6' },
        { text: '7 ay', value: '7' },
        { text: '8 ay', value: '8' },
        { text: '9 ay', value: '9' },
        { text: '10 ay', value: '10' },
        { text: '11 ay', value: '11' },
        { text: '12 ay', value: '12' },

      ];


    useEffect(() => {
    if (modalVisible) {
    //     console.log('selectedrow', selectedRow);
        if (isEdit) {
            form.setFieldsValue({
                minCharacter: passwordRules.minCharacter
            });
    //     setCurrentInstitutionTypeId(selectedRow?.institutionTypeId);
    //     setCurrentInstitutionId(selectedRow?.institutionId);
    //     const selectedInstitutionTypes = institutionTypes.filter(
    //         (item) => item?.id === selectedRow?.institutionTypeId,
    //     );
    //     form.setFieldsValue({ institutionType: selectedInstitutionTypes[0]?.name });
    //     const towns = countys?.filter((item) => item?.cityId === selectedRow?.cityId);
    //     setTowns(towns);
    //     form.setFieldsValue({ town: selectedRow?.countyId });
            handleEdit(true);
        }
    }
    }, [modalVisible]);

    const handleClose = useCallback(() => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                form.resetFields();
                handleModalVisible(false)
                history.push('/user-management/password-management')
                setErrorList([]);
            },
          });
    }, [handleModalVisible, form]);


    const onFinish = useCallback(
        async (values) => {
            if (errorList.length > 0) {
                console.log("ERRor var")
                return
            }
            console.log("error yok", values)

          },
          [dispatch,errorList],
       )

    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // }

    const onFinishEdit = () => {

    }

    const onOk = (values) => {
        console.log(values)
    }

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const onPeriodStatusChange = (values) => {
        console.log(values)
    }

    return (
        <CustomModal
            className="password-modal"
            maskClosable={false}
            footer={false}
            title={'Şifre Yönetimi'}
            visible={modalVisible}
            onCancel={handleClose}
            // onOk={onOk}
            autoComplete="off"
            // closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='payment-container'>
                <CustomForm
                    name='passwordForm'
                    className='payment-link-form'
                    form={form}
                    autoComplete='off'
                    layout={'horizontal'}
                    onFinish={isEdit ? onFinishEdit : onFinish}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                >
                    <CustomFormItem
                        label={"Minimum Karakter Sayısı"}
                        name="minCharacter"
                        rules={[{ required: true, message: <Text t="Lütfen zorunlu alanları doldurunuz." /> }]}
                        className="custom-form-item"
                    >
                        <CustomNumberInput placeholder="Minimum Karakter Sayısı" />
                    </CustomFormItem>
                    <CustomFormItem
                        label={<Text t="Maksimum Karakter Sayısı" />}
                        name="maxCharacter"
                        rules={[{ required: true, message: <Text t="Lütfen zorunlu alanları doldurunuz." /> }]}
                        className="custom-form-item"
                    >
                        <CustomNumberInput placeholder="Maksimum Karakter Sayısı" />
                    </CustomFormItem>

                    <Row>
                        <b className="checkboxes">Olması İstenen Şifre Kuralları</b>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Checkbox.Group
                                onChange={onChange}
                                style={{ width: '100%' }}
                            >
                                <CustomFormItem
                                    label={false}
                                    name="upperCase"
                                    valuePropName="checked"
                                >
                                    <div className="checkbox-row">
                                        <div className="checkbox-label">
                                            <Text t="Büyük harf" />
                                        </div>
                                        <CustomCheckbox value="upperCase"></CustomCheckbox>

                                    </div>
                                </CustomFormItem>
                                <CustomFormItem
                                    label={false}
                                    name="lowerCase"
                                    valuePropName="checked"
                                >
                                    <div className="checkbox-row">
                                        <div className="checkbox-label">
                                            <Text t="Küçük harf" />
                                        </div>
                                        <CustomCheckbox value="lowerCase"></CustomCheckbox>
                                    </div>
                                </CustomFormItem>
                                <CustomFormItem
                                    label={false}
                                    name="numeral"
                                    valuePropName="checked"
                                >
                                    <div className="checkbox-row">
                                        <div className="checkbox-label">
                                            <Text t="Rakam" />
                                        </div>
                                        <CustomCheckbox value="numeral"></CustomCheckbox>
                                    </div>
                                </CustomFormItem>
                                <CustomFormItem
                                    label={false}
                                    name="symbol"
                                    valuePropName="checked"
                                    onChange={onChange}
                                >
                                    <div className="checkbox-row">
                                        <div className="checkbox-label">
                                            <Text t="Sembol" />
                                        </div>
                                        <CustomCheckbox value="symbol"></CustomCheckbox>
                                    </div>
                                </CustomFormItem>
                            </Checkbox.Group>
                        </Col>
                    </Row>

                    <CustomFormItem
                        label="Şifre Periyod"
                        name="passwordPeriod"
                        // rules={[{ required: true, message: <Text t="Periyot seçiniz." /> }]}
                    >
                        <CustomSelect
                            placeholder="Periyot seçiniz"
                            // optionFilterProp="children"
                            onChange={onPeriodStatusChange}
                        >
                            {selectList.map(item=>(
                               <Option key={item.value} value={item.value}>
                                   {item.text}
                                </Option> 
                            ))}
                        </CustomSelect>
                    </CustomFormItem>

                    <div className='modal-footer'>
                        <CustomFormItem>
                            <CustomButton className='submit-btn' type='primary' htmlType='submit' onClick={handleClose}>
                                <span className='submit'>
                                    <Text t='İptal' />
                                </span>
                            </CustomButton>
                        </CustomFormItem>
                        <CustomFormItem>
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
    )
}

export default PasswordFormModal;