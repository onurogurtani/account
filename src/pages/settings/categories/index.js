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
import {
  addVideoCategory,
  editVideoCategory,
  getVideoCategoryList,
} from '../../../store/slice/videoSlice';
import {
  addFormCategory,
  editFormCategory,
  getFormCategoryList,
} from '../../../store/slice/categoryOfFormsSlice';

const Categories = () => {
  const [form] = Form.useForm();
  const [parentForm] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryType, setCategoryType] = useState();
  const [subCategryList, setSubCategryList] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState();

  const addSubCategory = () => {
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

  const onFinish = async (values) => {
    const category = categories.filter((item) => item.id === categoryType);

    const data = {
      entity: {
        name: values?.name,
        isActive: values?.isActive,
      },
    };
    if (isEdit) {
      data.entity.id = selectedSubCategoryId;
      const action = await dispatch(category[0].edit(data));
      // const action = await dispatch(editVideoCategory(data));
      if (category[0].edit.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: async () => {
            await handleClose();
          },
        });
        handleChange(categoryType);
        parentForm.setFieldsValue({
          subCategoryName: data.entity.id,
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
        },
      });
      handleChange(categoryType);
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
  const onSubCategoryChange = (value) => {
    setSelectedSubCategoryId(value);
  };
  const onCategoryTypeChange = (value) => {
    setCategoryType(value);
  };
  //yeni kategori eklenicekse buraya eklemeniz yeterli
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
          <CustomForm form={parentForm} layout="vertical" name="form">
            <CustomFormItem label="Kategori Türü">
              <CustomSelect onChange={handleChange} placeholder="Kategori Türü">
                {categories?.map((item) => {
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })}
              </CustomSelect>
            </CustomFormItem>

            <CustomFormItem label="Alt Kategori Adı" name="subCategoryName">
              <CustomSelect placeholder="Alt Kategori Adı" onChange={onSubCategoryChange}>
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
          onCancel={() => {
            form.resetFields();
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
                label="Kategori Türü"
              >
                <CustomSelect placeholder="Kategori Türü" onChange={onCategoryTypeChange}>
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
