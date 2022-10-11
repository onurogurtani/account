import React, { useCallback } from 'react';
import { Form } from 'antd';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  CustomSelect,
  Option,
} from '../../components';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/tableFilter.scss';

const VideoFilter = () => {
  const [form] = Form.useForm();

  return (
    <div className="table-filter">
      <CustomForm
        name="filterForm"
        className="filter-form"
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <div className="form-item">
          <CustomFormItem label="Video Kodu" name="videocode">
            <CustomInput placeholder="Video Kodu" />
          </CustomFormItem>

          <CustomFormItem label="Kategori" name="category">
            <CustomSelect
              maxTagCount="responsive"
              mode="multiple"
              showArrow
              showSearch={false}
              placeholder="Kategori"
            >
              <Option key={1}>deneme</Option>
              <Option key={2}>deneme2</Option>
              <Option key={3}>deneme3</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Başlık" name="subject">
            <CustomInput placeholder="Başlık" />
          </CustomFormItem>

          <CustomFormItem label="Sınıf Seviyesi" name="gradeLevel">
            <CustomSelect placeholder="Sınıf Seviyesi">
              <Option key={1}>deneme</Option>
              <Option key={2}>deneme2</Option>
              <Option key={3}>deneme3</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Ders" name="lesson">
            <CustomInput placeholder="Ders" />
          </CustomFormItem>

          <CustomFormItem label="Ünite" name="unit">
            <CustomInput placeholder="Ünite" />
          </CustomFormItem>

          <CustomFormItem label="Durum" name="status">
            <CustomSelect placeholder="Durum">
              <Option key={1}>Aktif</Option>
              <Option key={2}>Pasif</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Anahtar Kelime" name="keyword">
            <CustomSelect
              maxTagCount="responsive"
              mode="tags"
              tokenSeparators={[',']}
              placeholder="Anahtar Kelime"
            ></CustomSelect>
          </CustomFormItem>

          <div className="form-footer">
            <div className="action-buttons">
              <CustomButton className="clear-btn">Temizle</CustomButton>
              <CustomButton className="search-btn">
                <CustomImage className="icon-search" src={iconSearchWhite} />
                Filtrele
              </CustomButton>
            </div>
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default VideoFilter;
