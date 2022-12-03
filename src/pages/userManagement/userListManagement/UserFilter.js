import React, { useCallback } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomSelect,
  Option,
} from '../../../components';
import iconSearchWhite from '../../../assets/icons/icon-white-search.svg';
import '../../../styles/tableFilter.scss';
import { useDispatch } from 'react-redux';
import { userType } from '../../../constants/users';

const VideoFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = useCallback(
    async (values) => {
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

          <CustomFormItem label="Durum" name="Status">
            <CustomSelect placeholder="Durum">
              <Option key={0} value={0}>
                Hepsi
              </Option>
              <Option key={1} value={true}>
                Aktif
              </Option>
              <Option key={2} value={false}>
                Pasif
              </Option>
            </CustomSelect>
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

export default VideoFilter;
