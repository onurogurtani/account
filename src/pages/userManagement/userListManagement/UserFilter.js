import React, { useCallback } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomMaskInput,
  CustomSelect,
  Option,
} from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch } from 'react-redux';
import { packagePurchaseStatus, userType } from '../../../constants/users';
import { formPhoneRegex, tcknValidator } from '../../../utils/formRule';

const UserFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = useCallback(
    async (values) => {
      values.CitizenId = values.CitizenId
        ? values?.CitizenId.toString().replaceAll('_', '')
        : undefined;
      console.log(values);
    },
    [dispatch],
  );
  const handleFilter = () => form.submit();
  const handleReset = () => form.resetFields();

  return (
    <div className="table-filter">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <div className="form-item">
          <CustomFormItem label="Kullanıcı Türü" name="UserType">
            <CustomSelect placeholder="Seçiniz">
              <Option key={0} value={''}>
                Seçiniz
              </Option>
              {userType.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Ad" name="Name">
            <CustomInput placeholder="Ad" />
          </CustomFormItem>

          <CustomFormItem label="Soyad" name="SurName">
            <CustomInput placeholder="Soyad" />
          </CustomFormItem>

          <CustomFormItem label="Paket Satın Alma Durumu" name="packagePurchaseStatus">
            <CustomSelect placeholder="Seçiniz">
              <Option key={0} value={''}>
                Seçiniz
              </Option>
              {packagePurchaseStatus.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            rules={[{ validator: tcknValidator, message: '11 Karakter İçermelidir' }]}
            label="TC Kimlik Numarası"
            name="CitizenId"
          >
            <CustomMaskInput maskPlaceholder={null} mask={'99999999999'}>
              <CustomInput placeholder="TC Kimlik Numarası" />
            </CustomMaskInput>
          </CustomFormItem>

          <CustomFormItem
            rules={[{ validator: formPhoneRegex, message: 'Geçerli Telefon Giriniz' }]}
            label="Telefon Numarası"
            name="MobilePhones"
          >
            <CustomMaskInput mask={'+\\90 (999) 999 99 99'}>
              <CustomInput placeholder="Telefon Numarası" />
            </CustomMaskInput>
          </CustomFormItem>
        </div>
        <div className="form-footer">
          <div className="action-buttons">
            <CustomButton className="clear-btn" onClick={handleReset}>
              Temizle
            </CustomButton>
            <CustomButton className="search-btn" onClick={handleFilter}>
              <CustomImage className="icon-search" src={iconSearchWhite} />
              Filtrele
            </CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default UserFilter;
