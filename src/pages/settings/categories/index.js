import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getByFilterPagedCategoriesQuery } from '../../../store/slice/categorySlice';
import { getByFilterPagedSubCategories, addSubCategory, updateSubCategory } from '../../../store/slice/subCategorySlice ';

const Categories = () => {
  const [form] = Form.useForm();
  const [parentForm] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryType, setCategoryType] = useState();
  const [subCategryList, setSubCategryList] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState();
  const { categories } = useSelector((state) => state.category);

  const addSubCategories = () => {
    setIsEdit(false);
    setOpen(true);
  };
  const editSubCategory = () => {
    setOpen(true);
    setIsEdit(true);
    const selectedSubCategory = subCategryList?.filter((item) => item.id === selectedSubCategoryId);
    form.setFieldsValue(selectedSubCategory[0]);
  };

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getByFilterPagedCategoriesQuery());
  }, []);

  const onFinish = async (values) => {
    const data = {
      name: values?.name,
      isActive: values?.isActive,
    };
    if (isEdit) {

      data.categoryId = categoryType;
      data.id = selectedSubCategoryId ;
      const action = await dispatch(updateSubCategory(data));
      if (updateSubCategory.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: async () => {
            await handleClose();
          },
        });
        handleChange(categoryType);
        parentForm.setFieldsValue({
          subCategoryName: data.id,
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
      return;
    } else {
      data.categoryId = values?.categoryType;
      const action = await dispatch(addSubCategory(data));
      if (addSubCategory.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: async () => {
            await handleClose();
          },
        });
        handleChange(categoryType);
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
    }
  };

  const handleChange = async (value) => {
    setCategoryType(value);
    const action = await dispatch(getByFilterPagedSubCategories({ id: value }));
    if (getByFilterPagedSubCategories.fulfilled.match(action)) {
      console.log(action?.payload, 11);
      setSubCategryList(action?.payload?.data?.items);
    } else {
      setSubCategryList([]);
    }
  };
  const onSubCategoryChange = (value) => {
    setSelectedSubCategoryId(value);
  };
  const onCategoryTypeChange = (value) => {
    setCategoryType(value);
  };
  return (
    <CustomPageHeader title="Kategoriler" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Kategoriler">
        <div className="categories-container">
          <CustomForm form={parentForm} layout="vertical" name="form">
            <CustomFormItem label="Kategori Türü">
              <CustomSelect onChange={handleChange} placeholder="Kategori Türü">
                {categories.map((item, i) => (
                  <Option key={`categories-${item?.id}`} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem label="Alt Kategori Adı" name="subCategoryName">
              <CustomSelect placeholder="Alt Kategori Adı" onChange={onSubCategoryChange}>
                {subCategryList?.map((item) => {
                  return (
                    <Option key={`subCategories-${item?.id}`} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
              </CustomSelect>
            </CustomFormItem>
            <div className="btn-group">
              <CustomButton type="primary" onClick={addSubCategories}>
                Alt Kategori Ekle
              </CustomButton>
              {selectedSubCategoryId && (
                <CustomButton type="secondary" onClick={editSubCategory}>
                  Alt Kategori Düzenle
                </CustomButton>
              )}
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
            {!isEdit && (
              <CustomFormItem
                name="categoryType"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.11',
                  },
                ]}
                label="Kategori Türü"
              >
                <CustomSelect placeholder="Kategori Türü" onChange={onCategoryTypeChange}>
                  {categories.map((item, i) => (
                    <Option key={`categories-Add-${item?.id}`} value={item?.id}>
                      {item?.name}
                    </Option>
                  ))}
                </CustomSelect>
              </CustomFormItem>
            )}

            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen Zorunlu Alanları Doldurunuz.22',
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
                  message: 'Lütfen Zorunlu Alanları Doldurunuz.33',
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
