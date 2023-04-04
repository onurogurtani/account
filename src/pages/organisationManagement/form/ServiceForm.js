import React, { useEffect } from 'react';
import {
  CustomForm,
  CustomFormItem,
  CustomSelect,
  CustomTextInput,
  Option,
  CustomInput,
  CustomNumberInput,
} from '../../../components';
import { serviceInformation } from '../../../constants/organisation';
import '../../../styles/organisationManagement/organisationForm.scss';

const ServiceForm = ({ form, serviceData, sendValue  }) => {
  useEffect(() => {
    if (Object.keys(serviceData).length > 0) {
      form.setFieldsValue(serviceData)
    }
  }, [serviceData]);

  const onFinish = (values) => {
    sendValue(values);
  }

  const validateMessages = { required: 'Lütfen Zorunlu Alanları Doldurunuz.' };
  return (
    <div className="organisation-form">
      <CustomForm
        labelCol={{ flex: '200px' }}
        autoComplete="off"
        layout="horizontal"
        labelWrap
        labelAlign="left"
        colon={false}
        form={form}
        validateMessages={validateMessages}
        onFinish={onFinish}
        name="form"
      >
        <CustomFormItem label="Servis Bilgisi" name="serviceInfoChoice" rules={[{ required: true }]}>
          <CustomSelect allowClear showArrow placeholder="Seçiniz">
            {serviceInformation?.map((item) => {
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.value}
                </Option>
              );
            })}
          </CustomSelect>
        </CustomFormItem>

        <div className='flex-row'>
          <CustomFormItem
            label="Sözleşme Numarası"
            name="contractNumber"
            rules={[
              { required: true },
              { type: 'number' },
            ]}
            style={{ width: '50%', marginRight: 50 }}
          >
            <CustomNumberInput placeholder="Sözleşme Numarası" />
          </CustomFormItem>

          <CustomFormItem
            label="Host"
            name="hostName"
            rules={[{ required: true }, { whitespace: true }]}
            style={{ width: '50%' }}
          >
            <CustomInput placeholder="Host" />
          </CustomFormItem>
        </div>

        <CustomFormItem
          label="API Key"
          name="apiKey"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomInput placeholder="API Key" />
        </CustomFormItem>

        <CustomFormItem
          label="API Secret"
          name="apiSecret"
          rules={[{ required: true }, { whitespace: true }]}
        >
          <CustomInput placeholder="API Secret" />
        </CustomFormItem>

        <div className='flex-row'>
          <CustomFormItem
            label="Sanal Eğitim Kotası"
            name="virtualTrainingRoomQuota"
            rules={[
              { required: true },
              { type: 'number' },
            ]}
            style={{ width: '50%', marginRight: 50 }}
          >
            <CustomNumberInput placeholder="Sanal Eğitim Kotası" />
          </CustomFormItem>

          <CustomFormItem
            label="Sanal Toplantı Salonu Kotası"
            name="virtualMeetingRoomQuota"
            rules={[
              { required: true },
              { type: 'number' },
            ]}
            style={{ width: '50%' }}
          >
            <CustomNumberInput placeholder="Sanal Toplantı Salonu Kotası" />
          </CustomFormItem>
        </div>
      </CustomForm>
    </div>
  );
};

export default ServiceForm;
