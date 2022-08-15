import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomInput,
    CustomModal,
    errorDialog,
    successDialog,
    Text,
    useText,
} from '../../../components';
import modalClose from '../../../assets/icons/icon-close.svg';
import React, { useCallback, useEffect, useState } from 'react';
import '../../../styles/myOrders/paymentModal.scss';
import { Form, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';
import { updateSchool, addSchool, loadSchools } from "../../../store/slice/schoolSlice"

const SchoolFormModal = ({ modalVisible, handleModalVisible, selectedRow, isExcel }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [isEdit, setIsEdit] = useState(false);
    const [errorList, setErrorList] = useState([]);

    useEffect(() => {
        if (modalVisible) {
            form.setFieldsValue(selectedRow);
            if (selectedRow) {
                setIsEdit(true);
            }
        }
    }, [modalVisible]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
        setErrorList([]);
    }, [handleModalVisible, form]);


    const onFinish = useCallback(
        async (values) => {
            if (errorList.length > 0) {
                return
            }
            if (isExcel) {
                const schoolData = values?.excelFile?.file?.originFileObj
              
                const body = {
                    FormFile: schoolData,
                }

                const action = await dispatch(loadSchools(body));
                if (loadSchools.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='success' />,
                        message: action?.payload.message,
                        onOk: async () => {
                            await handleClose();
                        }
                    });
                }
                else {
                    errorDialog({
                        title: <Text t='error' />,
                        message: action?.payload.message,
                    });
                }
            } else {
                const body = {
                    entity: {
                        name: values?.name,
                        code: values?.code,
                        recordStatus: Number(values?.recordStatus),
                        schoolType: Number(values?.schoolType),
                    },
                }
                const action = await dispatch(addSchool(body));
                if (addSchool.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='success' />,
                        message: action?.payload.message,
                        onOk: async () => {
                            await handleClose();
                        }
                    });
                } else {
                    errorDialog({
                        title: <Text t='error' />,
                        message: action?.payload.message,
                    });
                }
            }
        },

        [handleClose, errorList, isExcel, dispatch],
    );

    const onFinishEdit = useCallback(async (values) => {
        const body = {
            entity: {
                id: selectedRow?.id,
                name: values?.name,
                code: values?.code,
                recordStatus: values?.recordStatus,
                schoolType: values?.schoolType,
            },
        }
        const action = await dispatch(updateSchool(body));
        if (updateSchool.fulfilled.match(action)) {
            successDialog({
                title: <Text t='success' />,
                message: action?.payload.message,
                onOk: async () => {
                    await handleClose();
                }
            });
        } else {
            errorDialog({
                title: <Text t='error' />,
                message: action?.payload.message,
            });
        }
        setIsEdit(false)
    }, [handleClose, selectedRow, dispatch]);

    const beforeUpload = async (file) => {
        const isExcel = [
            '.csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ].includes(file.type);

        if (!isExcel) {
            setErrorList((state) => [
                ...state,
                {
                    id: errorList.length,
                    message: 'Lütfen Excel yükleyiniz. Başka bir dosya yükleyemezsiniz.',
                },
            ]);
        } else {
            setErrorList([]);
        }
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
            setErrorList((state) => [
                ...state,
                {
                    id: errorList.length,
                    message: 'Lütfen 100 MB ve altında bir Excel yükleyiniz.',
                },
            ]);
        } else {
            setErrorList([]);
        }
        return isExcel && isLt2M;
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    return (
        <CustomModal
            className='payment-modal'
            maskClosable={false}
            footer={false}
            title={'Okul Yönetimi'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='payment-container'>
                <CustomForm
                    name='paymentLinkForm'
                    className='payment-link-form'
                    form={form}
                    initialValues={{}}
                    onFinish={isEdit ? onFinishEdit : onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    {
                        isExcel ?
                            <CustomFormItem
                                name='excelFile'
                                style={{ marginBottom: '20px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Lütfen dosya seçiniz.',
                                    },
                                ]}
                            >
                                <Upload.Dragger
                                    name="files"
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={beforeUpload}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    customRequest={dummyRequest}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.</p>
                                    <p className="ant-upload-hint">Sadece bir adet dosya yükleyebilirsiniz.</p>
                                </Upload.Dragger>
                            </CustomFormItem>
                            :
                            <>
                                <CustomFormItem
                                    label="Okul Adı"
                                    name='name'
                                >
                                    <CustomInput
                                        placeholder="Okul Adı"
                                        height={36}
                                    />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Okul Kodu"
                                    name='code'
                                >
                                    <CustomInput
                                        placeholder="Okul Kodu"
                                        height={36}
                                    />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Okul Tipi"
                                    name='schoolType'
                                >
                                    <CustomInput
                                        placeholder="Okul Tipi"
                                        height={36}
                                    />
                                </CustomFormItem>
                                <CustomFormItem
                                    label="Durumu"
                                    name='recordStatus'
                                >
                                    <CustomInput
                                        placeholder="Durumu"
                                        height={36}
                                    />
                                </CustomFormItem>
                            </>
                    }

                    {
                        errorList.map((error) => (
                            <div key={error.id} className="upload-error">{error.message}</div>
                        ))
                    }

                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                            <span className='submit'>
                                <Text t='Kaydet' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>
            </div>
        </CustomModal>
    );
}

export default SchoolFormModal