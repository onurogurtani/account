import React, { useState, useRef } from 'react';
import { Form } from 'antd';
import { isCancel, CancelToken } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import fileServices from '../../../../services/file.services';

const useUploadFile = () => {
    const [selectVal, setSelectVal] = useState('Versiyon Ekle');
    const [isVisible, setIsVisible] = useState(false);
    const [form] = Form.useForm();
    const cancelFileUpload = useRef(null);
    const [uploadedFile, setUploadedFile] = useState();
    const token = useSelector((state) => state?.auth?.token);
    const dispatch = useDispatch();

    const onSelectChange = (value) => {
        setSelectVal(value);
        switch (value) {
            case 1:
                updateAscVersion();
                break;
            case 2:
                updateUnderGraduateVersion();
                break;
            case 3:
                updateHighSchoolVersion();
                break;
            default:
                console.log('No valid option selected');
        }
    };

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
        if (cancelFileUpload?.current) cancelFileUpload?.current('User has canceled the file upload.');
    };

    const updateAscVersion = () => {
        alert('servisler hazırlandığında eklenecek');
    };
    const updateUnderGraduateVersion = () => {
        alert('servisler hazırlandığında eklenecek');
    };
    const updateHighSchoolVersion = () => {
        setIsVisible(true);
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

    const onCancel = () => {};
    const onOk = () => {};

    const onFinish = async () => {
        const values = await form.validateFields();
        console.log('values', values);
    };

    return {
        isVisible,
        setIsVisible,
        updateAscVersion,
        updateUnderGraduateVersion,
        onSelectChange,
        selectVal,
        setSelectVal,
        onFinish,
        onOk,
        handleDeletePdf,
        uploadPdf,
        onCancel,
    };
};

export default useUploadFile;
