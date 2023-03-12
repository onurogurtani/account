import { Form, Space } from 'antd';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    CustomForm,
    CustomFormItem,
    CustomTextArea,
    CustomModal,
    CustomRadioGroup,
    CustomRadio,
    CustomButton,
    Text,
    successDialog,
    errorDialog
} from '../../../components';
import '../../../styles/organisationManagement/organisationForm.scss';
import { statusInformation, radioOptions } from '../../../constants/organisation';
import { UpdateOrganisationStatus } from '../../../store/slice/organisationsSlice';

const CancelOrSuspendFormModal = ({ openModal, setOpenModal, status, selectedOperation, activeForm }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [form] = Form.useForm();
    const history = useHistory();
    const [selectedRadioOptions, setSelectedRadioOptions] = useState(0);
    const { activeStep } = useSelector((state) => state?.organisations);

    const onModalFinish = (values) => {
        onSubmitModal(values);
    };
    const onSubmitModal = useCallback(
        async (values) => {
            try {
                let action;
                const data = {
                    id: Number(id),
                    organisationStatusInfo: selectedOperation?.id,
                    reasonForStatus: values?.description
                };
                action = await dispatch(UpdateOrganisationStatus(data)).unwrap();
                setOpenModal(!openModal)
                activeForm[activeStep].resetFields();
                successDialog({ title: <Text t="success" />, message: action?.message });
                history.push('/organisation-management/list');
            } catch (error) {
                errorDialog({ title: <Text t="error" />, message: error?.message });
            }
        },
        [dispatch, form, selectedOperation?.id],
    );

    return (
        <CustomModal
            title={'UYARI'}
            visible={openModal}
            maskClosable={false}
            footer={false}
            onCancel={() => setOpenModal(!openModal)}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        >
            <CustomForm form={form} autoComplete="off" layout={'horizontal'} onFinish={onModalFinish}>
                <label>
                    {`Durumu ${statusInformation[status]?.value} olan kayıdı ${statusInformation[selectedOperation?.id]?.operation} istediğinizden emin misiniz?`}
                </label>
                <CustomFormItem
                    name="options"
                    rules={[{ required: true, message: <Text t="Lütfen Seçim Yapınız" /> }]}
                >
                    <CustomRadioGroup
                        onChange={(e) => {
                            if (e.target.value === 2) {
                                setOpenModal(!openModal)
                                form.resetFields();
                            }
                            setSelectedRadioOptions(e.target.value)
                        }}
                    >
                        {radioOptions.map((radio, index) => (
                            <CustomRadio key={index} value={radio.id} checked={true}>
                                {radio.label}
                            </CustomRadio>
                        ))}
                    </CustomRadioGroup>
                </CustomFormItem>

                {selectedRadioOptions === 1 && <CustomFormItem
                    rules={[
                        { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
                        { min: 10, message: 'En Az 10 Karakter Giriniz.' }
                    ]}
                    label="Açıklama"
                    name="description">
                    <CustomTextArea />
                </CustomFormItem>
                }

                <CustomFormItem>
                    <Space style={{ width: '100%', justifyContent: 'end' }}>
                        <CustomButton onClick={() => {
                            setOpenModal(!openModal)
                            setSelectedRadioOptions(0)
                            form.resetFields();
                        }} type="danger">
                            Vazgeç
                        </CustomButton>
                        <CustomButton onPress={() => form.submit()} type="primary" htmlType="submit">
                            Kaydet
                        </CustomButton>
                    </Space>
                </CustomFormItem>
            </CustomForm>
        </CustomModal>
    );
};

export default CancelOrSuspendFormModal;
