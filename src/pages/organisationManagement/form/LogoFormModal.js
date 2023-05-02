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
import { useDispatch, useSelector } from 'react-redux';
import modalClose from '../../../assets/icons/icon-close.svg';
import React, { useCallback, useState } from 'react';
import '../../../styles/myOrders/paymentModal.scss';
import { Form, Upload, } from 'antd';
import { uploadImage, setOrganizationImageId, updateImage } from '../../../store/slice/organisationsSlice';
import { InboxOutlined } from '@ant-design/icons';
import '../../../styles/organisationManagement/logoFormModal.scss';

const LogoFormModal = ({ modalVisible, handleModalVisible, organizationForm, isEdit, getImageDetail }) => {
    const [form] = Form.useForm();
    const token = useSelector((state) => state?.auth?.token);
    const { organisationImageId } = useSelector((state) => state?.organisations);
    const dispatch = useDispatch();
    const [errorList, setErrorList] = useState([]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
        setErrorList([]);
    }, [handleModalVisible, form]);

    const addFile = async (values) => {
        const fileData = values?.logo?.fileList[0]?.originFileObj;
        const formData = new FormData();
        formData.append('File', fileData);
        formData.append('FileType', 9);
        formData.append("FileName", values?.fileName);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        };
        try {
            const action = await dispatch(uploadImage({
                data: formData,
                options
            })).unwrap();
            return action;
        } catch (error) {
            console.error("Dosya eklenirken bir hata oluştu: ", error);
            throw error;
        }
    };

    const updateFile = async (values) => {
        try {
            const fileData = values?.logo?.fileList[0]?.originFileObj;
            const formData = new FormData();
            formData.append("Id", organisationImageId);
            formData.append('File', fileData);
            formData.append('FileType', 9);
            formData.append("FileName", values?.fileName);
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}`,
                },
            };
            const action = await dispatch(
                updateImage({
                    data: formData,
                    options
                }),
            ).unwrap();
            return action;
        } catch (error) {
            console.error("Dosya güncellenirken bir hata oluştu: ", error);
            throw error;
        }
    };

    const onFinish = useCallback(
        async (values) => {
            if (errorList.length > 0) {
                return
            }
            const action = (isEdit && organisationImageId !== 0) ? await updateFile(values) : await addFile(values);
            if (action?.data?.success) {
                const imageId = (isEdit && organisationImageId !== 0) ? organisationImageId : action?.data?.data?.id
                dispatch(setOrganizationImageId(imageId))
                organizationForm.setFieldsValue({ organisationImageId: imageId });
                if (isEdit && organisationImageId !== 0) {
                    getImageDetail()
                }
                successDialog({
                    title: <Text t='success' />,
                    message: action?.data?.message,
                    onOk: async () => {
                        await handleClose();
                    }
                });
            } else {
                errorDialog({
                    title: <Text t='error' />,
                    message: action?.data?.message
                });
            }
        },
        [handleClose, errorList],
    );


    const beforeUpload = async (file) => {
        const isImage = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            "image/svg+xml",
        ].includes(file.type);

        if (!isImage) {
            setErrorList((state) => [
                {
                    id: errorList.length,
                    message: 'Lütfen image yükleyiniz. Başka bir dosya yükleyemezsiniz.',
                },
            ]);
        } else {
            setErrorList([]);
        }

        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
            setErrorList((state) => [
                {
                    id: errorList.length,
                    message: 'Lütfen 100 MB ve altında bir Logo yükleyiniz.',
                },
            ]);
        } else {
            setErrorList([]);
        }
        return isImage && isLt2M;
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
            title={'Logo Ekle'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className='payment-container'>
                <CustomForm
                    name='paymentLinkForm'
                    className='payment-link-form'
                    form={form}
                    onFinish={onFinish}
                    autoComplete='off'
                    layout={'horizontal'}
                >
                    <CustomFormItem
                        label={<Text t='Logo İsmi' />}
                        name='fileName'
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Logo İsmi Giriniz.',
                            },
                        ]}
                    >
                        <CustomInput
                            placeholder={useText('Logo İsmi')}
                            height={36}
                        />
                    </CustomFormItem>

                    <CustomFormItem
                        name='logo'
                        className='choose-logo'
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Logo seçiniz.',
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="files"
                            listType="picture"
                            //action="/upload.do"
                            maxCount={1}
                            //accept="image/*"
                            beforeUpload={beforeUpload}
                            accept=".png, .jpg, .jpeg, .svg"
                            customRequest={dummyRequest}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Logo yüklemek için tıklayın veya dosyayı bu alana sürükleyin.</p>
                            <p className="ant-upload-hint">Sadece bir logo yükleyebilirsiniz.</p>
                        </Upload.Dragger>
                    </CustomFormItem>
                    {
                        errorList.map((error) => (
                            <div key={error.id} className="upload-error">{error.message}</div>
                        ))
                    }
                    <CustomFormItem className='footer-form-item'>
                        <CustomButton className='submit-btn' type='primary' htmlType='submit'>
                            <span className='submit'>
                                <Text t='Logo Kaydet' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>
            </div>
        </CustomModal>
    )
}

export default LogoFormModal