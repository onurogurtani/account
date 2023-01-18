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
import { addVideoCategory, editVideoCategory, getVideoCategoryList } from '../../../store/slice/videoSlice';
import { addFormCategory, editFormCategory, getFormCategoryList } from '../../../store/slice/categoryOfFormsSlice';
import { categoryCodes } from '../../../constants/settings/category';

const Categories = () => {
  const [form] = Form.useForm();
  const [parentForm] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryType, setCategoryType] = useState();
  const [subCategryList, setSubCategryList] = useState([]);

  const selectedSubCategoryId = Form.useWatch('subCategoryName', parentForm);

  const addSubCategory = () => {
    setIsEdit(false);
    setOpen(true);
  };
  const editSubCategory = () => {
    const mainCategoryType = parentForm.getFieldValue('mainCategory');
    setCategoryType(mainCategoryType);
    setOpen(true);
    setIsEdit(true);
    const selectedSubCategory = subCategryList?.filter((item) => item.id === selectedSubCategoryId);
    form.setFieldsValue(selectedSubCategory[0]);
  };

  const handleClose = () => {
    form.resetFields();
    setCategoryType();
    setOpen(false);
  };

  const onFinish = async (values) => {
    const category = categories.filter((item) => item.id === categoryType);

    const data = {
      entity: {
        name: values?.name,
        code: values?.code,
        isActive: true,
      },
    };
    if (isEdit) {
      data.entity.id = selectedSubCategoryId;
      data.entity.isActive = values?.isActive;
      data.entity.recordStatus = values?.recordStatus;

      const action = await dispatch(category[0].edit(data));
      if (category[0].edit.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: async () => {
            await handleClose();
            handleChange(categoryType);
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
      return;
    }
    const action = await dispatch(category[0].add(data));
    if (category[0].add.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload.message,
        onOk: async () => {
          await handleClose();
          await handleChange(categoryType);
          parentForm.setFieldsValue({
            mainCategory: categoryType,
            subCategoryName: action?.payload?.data?.id,
          });
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };

  const handleChange = async (value) => {
    setCategoryType(value);
    const category = categories.filter((item) => item.id === value);
    const action = await dispatch(category[0].action());
    if (category[0].action.fulfilled.match(action)) {
      setSubCategryList(action?.payload?.data?.items);
    } else {
      setSubCategryList([]);
    }
  };

  const onCategoryTypeChange = (value) => {
    setCategoryType(value);
  };

  const categories = [
    {
      id: 1,
      name: 'Video Kategorileri',
      action: getVideoCategoryList,
      add: addVideoCategory,
      edit: editVideoCategory,
    },
    {
      id: 2,
      name: 'Anket Kategorileri',
      action: getFormCategoryList,
      add: addFormCategory,
      edit: editFormCategory,
    },
  ];
  return (
    <CustomPageHeader title="Kategoriler" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Kategoriler">
        <div className="categories-container">
          <CustomButton className="mb-3" type="primary" onClick={addSubCategory}>
            Yeni Kategori Ekle
          </CustomButton>
          <CustomForm form={parentForm} layout="vertical" name="form">
            <CustomFormItem label="Ana Kategori" name="mainCategory">
              <CustomSelect onChange={handleChange} placeholder="Ana Kategori">
                {categories?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem label="Kategori Adı" name="subCategoryName">
              <CustomSelect placeholder="Kategori Adı">
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
              {selectedSubCategoryId && (
                <CustomButton type="secondary" onClick={editSubCategory}>
                  Kategori Düzenle
                </CustomButton>
              )}
            </div>
          </CustomForm>
        </div>

        <CustomModal
          title={isEdit ? 'Kategori Düzenle' : 'Kategori Ekle'}
          visible={open}
          onOk={() => form.submit()}
          okText="Kaydet"
          cancelText="Vazgeç"
          onCancel={() => {
            form.resetFields();
            setCategoryType();
            setOpen(false);
          }}
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
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Ana Kategori"
              >
                <CustomSelect placeholder="Ana Kategori" onChange={onCategoryTypeChange}>
                  {categories?.map((item) => {
                    return (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>
            )}
            {categoryType === 1 && (
              <CustomFormItem name="code" label="Kategori Tipi">
                <CustomSelect allowClear placeholder="Kategori Tipi">
                  {categoryCodes?.map((item) => {
                    return (
                      <Option key={item?.code} value={item?.code}>
                        {item?.value}
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>
            )}

            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                },
              ]}
              label="Kategori Adı"
              name="name"
            >
              <CustomInput placeholder="Kategori Adı" />
            </CustomFormItem>
            {isEdit && (
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                  },
                ]}
                label="Durumu"
                name={categoryType === 1 ? 'recordStatus' : 'isActive'}
              >
                <CustomSelect placeholder="Durumu">
                  <Option key="true" value={categoryType === 1 ? 1 : true}>
                    Aktif
                  </Option>
                  <Option key="false" value={categoryType === 1 ? 0 : false}>
                    Pasif
                  </Option>
                </CustomSelect>
              </CustomFormItem>
            )}
          </CustomForm>
        </CustomModal>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default Categories;
