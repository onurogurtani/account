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
import { useDispatch } from 'react-redux';
import { Form } from 'antd';
import {
  addOperationClaims,
  updateOperationClaims,
} from '../../../store/slice/operationClaimsSlice';

const OperationFormModal = ({ modalVisible, handleModalVisible, selectedRole }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      console.log('açıldı modal');
      form.setFieldsValue(selectedRole);
      if (selectedRole) {
        setIsEdit(true);
      }
    }
  }, [modalVisible]);

  const handleClose = useCallback(() => {
    form.resetFields();
    handleModalVisible(false);
  }, [handleModalVisible, form]);

  const onFinish = useCallback(
    async (values) => {
      if (values?.name) {
        const body = {
          entity: {
            name: values?.name,
          },
        };

        const action = await dispatch(addOperationClaims(body));
        if (addOperationClaims.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload.message,
            onOk: async () => {
              await handleClose();
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload.message,
          });
        }
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: 'Lütfen Yetki Adı Giriniz.',
        });
      }
    },
    [dispatch, handleClose],
  );

  const onFinishEdit = useCallback(
    async (values) => {
      const data = {
        entity: {
          id: selectedRole?.id,
          name: values.name,
        },
      };
      const action = await dispatch(updateOperationClaims(data));
      if (updateOperationClaims.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: async () => {
            await handleClose();
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
      setIsEdit(false);
    },
    [handleClose, dispatch, selectedRole],
  );

  return (
    <CustomModal
      className="payment-modal"
      maskClosable={false}
      footer={false}
      title={'Yetki Tanımlama Ekranı'}
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
          onFinish={isEdit ? onFinishEdit : onFinish}
          autoComplete="off"
          layout={'horizontal'}
        >
          <CustomFormItem label={<Text t="Yetki Adı" />} name="name">
            <CustomInput placeholder={useText('Yetki Adı')} height={36} />
          </CustomFormItem>

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

export default OperationFormModal;
