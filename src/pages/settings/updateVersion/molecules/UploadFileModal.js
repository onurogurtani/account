import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { isCancel, CancelToken } from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomForm, CustomFormItem, CustomModal } from '../../../../components';
import fileServices from '../../../../services/file.services';

const UploadFileModal = ({ isVisible, setIsVisible, setSelectVal }) => {
    const [form] = Form.useForm();
    const cancelFileUpload = useRef(null);
    const [uploadedFile, setUploadedFile] = useState();
    const token = useSelector((state) => state?.auth?.token);
    const dispatch = useDispatch();

    const uploadPdf = async (options) => {
        console.log('options', options);
        const { onSuccess, onError, file, onProgress } = options;

        const option = {
            onUploadProgress: (progressEvent) => {
                onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
            },
            cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        };

        const formData = new FormData();
        formData.append('File', file);
        formData.append('FileType', 4);
        formData.append('FileName', file?.name);
        formData.append('Description', file?.name);

        try {
            const res = await fileServices.uploadFile(formData, option);
            onSuccess('Ok');
            setUploadedFile({ id: res?.data?.data?.id, fileName: res?.data?.data?.fileName });
        } catch (err) {
            if (isCancel(err)) {
                form.setFields([
                    {
                        name: 'pdf',
                        errors: [],
                    },
                ]);
                return;
            }
            form.setFields([
                {
                    name: 'pdf',
                    errors: ['Dosya yüklenemedi yeniden deneyiniz'],
                },
            ]);
            onError({ err });
        }
    };
    const cancelUpload = () => {
        if (cancelFileUpload.current) cancelFileUpload.current('User has canceled the file upload.');
    };

    const handleDeletePdf = () => {
        cancelUpload();
        form.setFields([
            {
                name: 'pdf',
                errors: [],
            },
        ]);
    };

    const onCancel = () => {
        setIsVisible(false);
        setSelectVal('Versiyon Ekle');
    };

    const onFinish = async (files) => {
        const values = await form.validateFields();
        console.log('values', values);
        setIsVisible(false);
        setSelectVal('Versiyon Ekle');
    };

    return (
        <CustomModal
            visible={isVisible}
            title={'Pdf Ekle'}
            okText={'Ekle'}
            cancelText={'İptal'}
            onCancel={onCancel}
            onOk={onFinish}
        >
            <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
                <CustomFormItem label="Pdf:">
                    <CustomFormItem
                        name="pdf"
                        valuePropName="fileListPdf"
                        noStyle
                        validateTrigger={['onChange', 'onBlur', 'onFinish']}
                        rules={[
                            {
                                validator: async (_, pdf) => {
                                    if (pdf?.fileList === undefined) {
                                        return Promise.reject(new Error('Lütfen 1 adet pdf dosyası yükleyiniz.'));
                                    } else {
                                        return Promise.resolve();
                                    }
                                },
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="file"
                            maxCount={1}
                            accept="application/pdf"
                            customRequest={uploadPdf}
                            showUploadList={{
                                showRemoveIcon: true,
                                removeIcon: <DeleteOutlined style={{ color: 'red' }} onClick={handleDeletePdf} />,
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.
                            </p>
                            <p className="ant-upload-hint">Sadece bir adet pdf türünde dosya yükleyebilirsiniz.</p>
                        </Upload.Dragger>
                    </CustomFormItem>
                </CustomFormItem>
            </CustomForm>
        </CustomModal>
    );
};

export default UploadFileModal;
