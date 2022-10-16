import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomSelect,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import '../../../styles/settings/categories.scss';
import { addVideoCategory, getVideoCategoryList } from '../../../store/slice/videoSlice';

const Categories = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [subCategryList, setSubCategryList] = useState([]);
  const dispatch = useDispatch();

  const addSubCategory = () => {
    setOpen(true);
  };

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    if (values.categoryType === 1) {
      const data = {
        entity: {
          name: values?.name,
          isActive: values?.isActive,
        },
      };
      const action = await dispatch(addVideoCategory(data));
      if (addVideoCategory.fulfilled.match(action)) {
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
    }
  };
  const handleChange = async (value) => {
    if (value === 1) {
      const action = await dispatch(getVideoCategoryList());
      if (getVideoCategoryList.fulfilled.match(action)) {
        setSubCategryList(action?.payload?.data?.items);
      } else {
        setSubCategryList([]);
      }
    }
  };
  return (
    <CustomPageHeader title="Kategoriler" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Kategoriler">
        <div className="categories-container">
          <CustomForm layout="vertical" name="form">
            <CustomFormItem label="Kategori Türü">
              <CustomSelect onChange={handleChange} placeholder="Kategori Türü">
                <Option key={1} value={1}>
                  Video Kategorileri
                </Option>
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem label="Alt Kategori Adı">
              <CustomSelect placeholder="Alt Kategori Adı">
                {subCategryList?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
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
          <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
            <CustomFormItem
              name="categoryType"
              rules={[
                {
                  required: true,
                  message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                },
              ]}
              label="Kategori Türü"
            >
              <CustomSelect placeholder="Kategori Türü">
                <Option key="1" value={1}>
                  Video Kategorileri
                </Option>
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
              name="name"
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
              name="isActive"
            >
              <CustomSelect placeholder="Durumu">
                <Option key="true" value={true}>
                  Aktif
                </Option>
                <Option key="false" value={false}>
                  Pasif
                </Option>
              </CustomSelect>
            </CustomFormItem>
          </CustomForm>
        </CustomModal>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default Categories;
