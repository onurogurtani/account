import { Form } from 'antd';
import React, { useState } from 'react';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  Option,
} from '../../../components';
import '../../../styles/settings/categories.scss';

const Categories = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const addSubCategory = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="categories-container">
        <CustomForm layout="vertical" name="form">
          <CustomFormItem label="Kategori Türü">
            <CustomSelect placeholder="Kategori Türü">
              <Option key={1}>Video Kategorileri</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem label="Alt Kategori Adı">
            <CustomSelect placeholder="Alt Kategori Adı">
              <Option key={1}>Canlı</Option>
              <Option key={2}>Asenkron</Option>
            </CustomSelect>
          </CustomFormItem>
          <div className="btn-group">
            <CustomButton type="primary" onClick={addSubCategory}>
              Alt Kategori Ekle
            </CustomButton>
          </div>
        </CustomForm>
      </div>

      <CustomModal
        title="Alt Kategori Ekle"
        visible={open}
        onOk={() => form.submit()}
        okText="Kaydet"
        cancelText="Vazgeç"
        onCancel={() => setOpen(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        // width={600}
      >
        <CustomForm form={form} layout="vertical" name="form">
          <CustomFormItem
            name="categoryTypeName"
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Kategori Türü"
          >
            <CustomSelect placeholder="Kategori Türü">
              <Option key={1}>Video Kategorileri</Option>
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Alt Kategori Adı"
            name="subCategoryTypeName"
          >
            <CustomInput placeholder="Alt Kategori Adı" />
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Durumu"
            name="status"
          >
            <CustomSelect placeholder="Durumu">
              <Option key={1}>Canlı</Option>
              <Option key={2}>Asenkron</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default Categories;
