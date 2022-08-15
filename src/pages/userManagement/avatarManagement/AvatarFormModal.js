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
import React, { useCallback, useState } from 'react';
import '../../../styles/myOrders/paymentModal.scss';
import { Form, Upload, } from 'antd';
import { addImage } from '../../../store/slice/avatarSlice';
import { useDispatch } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';

const AvatarFormModal = ({ modalVisible, handleModalVisible }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [errorList, setErrorList] = useState([]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
        setErrorList([]);
    }, [handleModalVisible, form]);

    const onFinish = useCallback(
        async (values) => {
            if (errorList.length > 0) {
                console.log("ERRor var")
                return
            }
            console.log("error yok", values)

            const avatarData = values?.avatar?.fileList[0]?.thumbUrl;
            const avatarType = values?.avatar?.fileList[0]?.type;
            const binaryData = Buffer.from(avatarData.split(',')[1], 'base64');
            let blob = new Blob([binaryData], { type: avatarType });

           let formData = new FormData();
           formData.append("FileName", values?.avatarName);
           formData.append("Image", blob, avatarType);

            const action = await dispatch(addImage(formData));
            if (addImage.fulfilled.match(action)) {
                successDialog({
                    title: <Text t='success' />,
                    message: action?.payload,
                    onOk: async () => {
                        await handleClose();
                    }
                });
            } else {
                errorDialog({
                    title: <Text t='error' />,
                    message: action?.payload
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
                    message: 'Lütfen 100 MB ve altında bir Avatar yükleyiniz.',
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
    console.log("ERRORLİST", errorList)
    return (
        <CustomModal
            className='payment-modal'
            maskClosable={false}
            footer={false}
            title={'Yeni Avatar Ekle'}
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
                        label={<Text t='Avatar İsmi' />}
                        name='avatarName'
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Avatar İsmi Giriniz.',
                            },
                        ]}
                    >
                        <CustomInput
                            placeholder={useText('Avatar İsmi')}
                            height={36}
                        />
                    </CustomFormItem>

                    <CustomFormItem
                        name='avatar'
                        style={{ marginBottom: '20px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Avatar seçiniz.',
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
                            <p className="ant-upload-text">Avatar yüklemek için tıklayın veya dosyayı bu alana sürükleyin.</p>
                            <p className="ant-upload-hint">Sadece bir avatar yükleyebilirsiniz.</p>
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
                                <Text t='Kaydet' />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>
            </div>
        </CustomModal>
    )
}

export default AvatarFormModal