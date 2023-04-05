import { FileExcelOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomModal,
    errorDialog,
    successDialog,
    Text,
    warningDialog,
} from '../../../components';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';
import { downloadLessonsExcel, getLessons, uploadLessonsExcel } from '../../../store/slice/lessonsSlice';
import { getListFilterParams } from '../../../utils/utils';

const AcquisitionTreeUploadExcelModal = ({ selectedClassId }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);
    useResetFormOnCloseModal({ form, open });

    const onOkModal = () => {
        form.submit();
    };
    const onCancelModal = async () => {
        setOpen(false);
    };
    const onFinish = async (values) => {
        const fileData = values?.excelFile[0]?.originFileObj;
        const data = new FormData();
        data.append('FormFile', fileData);
        data.append('ClassroomId', selectedClassId);
        const action = await dispatch(uploadLessonsExcel(data));
        if (uploadLessonsExcel.fulfilled.match(action)) {
            successDialog({
                title: <Text t="success" />,
                message: action?.payload?.message,
            });
            await dispatch(getLessons(getListFilterParams('classroomId', selectedClassId)));
            setOpen(false);
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload?.message,
            });
        }
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const beforeUpload = async (file) => {
        const isExcel = [
            '.csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ].includes(file.type.toLowerCase());

        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isExcel || !isLt2M) {
            if (!isLt2M) {
                setErrorList((state) => [
                    ...state,
                    {
                        id: errorList.length,
                        message: 'Lütfen 100 MB ve altında bir Excel yükleyiniz.',
                    },
                ]);
            }
            if (!isExcel) {
                setErrorList((state) => [
                    ...state,
                    {
                        id: errorList.length,
                        message: 'Lütfen Excel yükleyiniz. Başka bir dosya yükleyemezsiniz.',
                    },
                ]);
            }
        } else {
            setErrorList([]);
        }
        return isExcel && isLt2M;
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const ondownloadExcel = async () => {
        await dispatch(downloadLessonsExcel());
    };

    const uploadExcel = () => {
        if (!selectedClassId) {
            warningDialog({
                title: <Text t="error" />,
                message: 'Excel ile ekleme yapmak için öncelikle sınıf seçmeniz gerekmektedir.',
            });
        } else {
            setOpen(true);
        }
    };
    return (
        <>
            <CustomButton
                icon={<FileExcelOutlined />}
                className="upload-btn"
                onClick={uploadExcel}
                disabled={!selectedClassId}
            >
                Excel ile Ekle
            </CustomButton>

            <CustomModal
                title="Excel İle Ekle"
                visible={open}
                onOk={onOkModal}
                onCancel={onCancelModal}
                okText="Kaydet"
                cancelText="Vazgeç"
                bodyStyle={{ overflowY: 'auto' }}
            >
                <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
                    <CustomFormItem style={{ marginBottom: '20px' }}>
                        <CustomFormItem
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen dosya seçiniz.',
                                },
                            ]}
                            name="excelFile"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                        >
                            <Upload.Dragger
                                name="files"
                                maxCount={1}
                                beforeUpload={beforeUpload}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                customRequest={dummyRequest}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Dosya yüklemek için tıklayın veya dosyayı bu alana sürükleyin.
                                </p>
                                <p className="ant-upload-hint">Sadece bir adet dosya yükleyebilirsiniz.</p>
                            </Upload.Dragger>
                        </CustomFormItem>
                        <a onClick={ondownloadExcel} className="ant-upload-hint">
                            Örnek excel dosya desenini indirmek için tıklayınız.
                        </a>
                    </CustomFormItem>

                    {errorList.map((error) => (
                        <div key={error.id} className="ant-form-item-explain-error">
                            {error.message}
                        </div>
                    ))}
                </CustomForm>
            </CustomModal>
        </>
    );
};

export default AcquisitionTreeUploadExcelModal;
