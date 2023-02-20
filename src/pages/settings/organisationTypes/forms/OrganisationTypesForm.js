import { Form, Space } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomSelect,
  CustomTextArea,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../../components';
import { recordStatus } from '../../../../constants';
import {
  addOrganisationTypes,
  closeModal,
  updateOrganisationTypes,
} from '../../../../store/slice/organisationTypesSlice';

const OrganisationTypesForm = ({ onCancel, organisationType }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (organisationType) form.setFieldsValue(organisationType);
    if (!organisationType) form.resetFields();
  }, [organisationType]);

  const onFinish = (values) => {
    if (organisationType?.id) {
      confirmDialog({
        title: 'Dikkat',
        message:
          'Güncellemekte olduğunuz kayıt Kurumlar ekranında tanımlı olan kayıtları etkileyeceği için Güncelleme yapmak istediğinizden Emin misiniz ?',
        okText: 'Evet',
        cancelText: 'Hayır',
        onOk: async () => {
          onSubmit(values);
        },
      });
      return false;
    }
    onSubmit(values);
  };

  const onSubmit = useCallback(
    async (values) => {
      try {
        let action;
        if (organisationType?.id) {
          action = await dispatch(
            updateOrganisationTypes({ organisationType: { ...values, id: organisationType?.id } }),
          ).unwrap();
        } else {
          action = await dispatch(addOrganisationTypes({ organisationType: values })).unwrap();
        }
        dispatch(closeModal());
        form.resetFields();

        successDialog({ title: <Text t="success" />, message: action?.message });
      } catch (error) {
        errorDialog({ title: <Text t="error" />, message: error?.message });
      }
    },
    [dispatch, form, organisationType?.id],
  );

  return (
    <CustomForm form={form} autoComplete="off" layout={'horizontal'} labelCol={{ flex: '165px' }} onFinish={onFinish}>
      <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Kurum Türü Adı"
        name="name"
      >
        <CustomInput placeholder="Kurum Türü Adı" />
      </CustomFormItem>

      <CustomFormItem label="Açıklama" name="description">
        <CustomTextArea />
      </CustomFormItem>
      {organisationType?.id && (
        <CustomFormItem rules={[{ required: true }]} label="Durumu" name="recordStatus">
          <CustomSelect placeholder="Seçiniz">
            {recordStatus.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
          </CustomSelect>
        </CustomFormItem>
      )}
      <CustomFormItem>
        <Space style={{ width: '100%', justifyContent: 'end' }}>
          <CustomButton onClick={onCancel} type="danger">
            İptal Et
          </CustomButton>
          <CustomButton type="primary" htmlType="submit">
            {organisationType?.id ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
          </CustomButton>
        </Space>
      </CustomFormItem>
    </CustomForm>
  );
};

export default OrganisationTypesForm;
