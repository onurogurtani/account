import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
    CustomButton,
    CustomForm,
    CustomFormItem,
    CustomImage,
    CustomModal,
    errorDialog,
    successDialog,
    Text,
} from '../../components';
import { downloadFile } from '../../utils/utils';
import { uploadTeacherExcel, downloadTeacherExcel } from '../../store/slice/teachersSlice';
import modalClose from '../../assets/icons/icon-close.svg';
import '../../styles/myOrders/paymentModal.scss';

const TeachersExcelUploadFormModal = ({ modalVisible, handleModalVisible }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [errorList, setErrorList] = useState([]);

    const handleClose = useCallback(() => {
        form.resetFields();
        handleModalVisible(false);
        setErrorList([]);
    }, [handleModalVisible, form]);

    const onFinish = useCallback(
        async (values) => {
            if (errorList.length > 0) {
                return;
            }

            const fileData = values?.excelFile[0]?.originFileObj;
            const data = new FormData();
            data.append('FormFile', fileData);

            const action = await dispatch(uploadTeacherExcel(data));
            if (uploadTeacherExcel.fulfilled.match(action)) {
                if (action?.payload) {
                    downloadFile({ data: action.payload, fileName: "FailedTeacherList" });
                }
                successDialog({
                    title: <Text t="success" />,
                    message: action?.payload?.message || "İletilen excel dosyası kayıt işlemi başarısız olan elemanların listesini içerir.",
                    onOk: async () => {
                        await handleClose();
                    },
                });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message || "Kayıt edilemedi, lütfen  tekrardan deneyin.",
                });
            }

        },

        [handleClose, errorList, dispatch],
    );

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

    const onDownloadTeacherExcel = async () => {
        const action = await dispatch(downloadTeacherExcel());
        if (downloadTeacherExcel.fulfilled.match(action)) {
            downloadFile({ data: action.payload, fileName: "SampleTeacherUploadFile" });
        } else {
            errorDialog({
                title: <Text t="error" />,
                message: action?.payload.message || "Dosya indirilemedi, lüften tekrardan deneyiniz!",
            });
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <CustomModal
            className="payment-modal"
            maskClosable={false}
            footer={false}
            title={'Öğretmen Listesi Excel Dosyası Yükleme'}
            visible={modalVisible}
            onCancel={handleClose}
            closeIcon={<CustomImage src={modalClose} />}
        >
            <div className="payment-container">
                <CustomForm
                    name="paymentLinkForm"
                    className="payment-link-form"
                    form={form}
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout={'horizontal'}
                >
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
                                // listType="picture"
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
                        <a onClick={onDownloadTeacherExcel} className="ant-upload-hint">
                            Örnek excel dosya desenini indirmek için tıklayınız.
                        </a>
                    </CustomFormItem>

                    {errorList.map((error) => (
                        <div key={error.id} className="upload-error">
                            {error.message}
                        </div>
                    ))}

                    <CustomFormItem className="footer-form-item">
                        <CustomButton className="submit-btn" type="primary" htmlType="submit">
                            <span className="submit">
                                <Text t="Kaydet" />
                            </span>
                        </CustomButton>
                    </CustomFormItem>
                </CustomForm>
            </div>
        </CustomModal>
    );
};

export default TeachersExcelUploadFormModal;
