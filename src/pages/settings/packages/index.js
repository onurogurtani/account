import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomSelect,
  CustomTable,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';
import { getPackageList, addPackage, updatePackage } from '../../../store/slice/packageSlice';

const Packages = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState();
  const { packages } = useSelector((state) => state?.packages);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = useCallback(async () => {
    dispatch(getPackageList());
  }, [dispatch]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => b.isActive - a.isActive,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Paket Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Sınav Türü',
      dataIndex: 'examType',
      key: 'examTypeme',
      sorter: (a, b) => a.examType - b.examType,
      render: (text, record) => {
        return <div>{text === 10 ? 'LGS' : 'YKS'}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'schoolDeleteAction',
      key: 'schoolDeleteAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="update-btn" onClick={() => editPackage(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editPackage = (record) => {
    setOpen(true);
    setSelectedPackageId(record.id);
    setIsEdit(true);
    form.setFieldsValue(record);
  };

  const handleAddPackage = () => {
    setSelectedPackageId();
    setIsEdit(false);
    form.resetFields();
    setOpen(true);
  };
  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      entity: {
        name: values?.name,
        isActive: values?.isActive,
        examType: values?.examType,
        id: isEdit ? selectedPackageId : undefined,
      },
    };
    if (isEdit) {
      const action = await dispatch(updatePackage(data));
      if (updatePackage.fulfilled.match(action)) {
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
      return;
    }

    const action = await dispatch(addPackage(data));
    if (addPackage.fulfilled.match(action)) {
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
  };
  const onOk = () => {
    if (!isEdit) {
      form.submit();
      return;
    }
    confirmDialog({
      title: 'Uyarı',
      message: 'Seçtiğiniz Kayıt Üzerinde Değişiklik Yapılacaktır. Emin misiniz?',
      onOk: () => {
        form.submit();
      },
    });
  };
  return (
    <CustomPageHeader title="Paketler" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Paketler">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddPackage}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={packages}
          //   onChange={handleSort}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `packages-${record?.id || record?.headText}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title="Paket Ekle"
        visible={open}
        onOk={onOk}
        okText={isEdit ? 'Güncelle ve Kaydet' : 'Kaydet'}
        cancelText="Vazgeç"
        onCancel={() => setOpen(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        // width={600}
      >
        <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Sınav Türü"
            name="examType"
          >
            <CustomSelect placeholder="Sınav Türü">
              <Option key={20} value={20}>
                YKS
              </Option>
              <Option key={10} value={10}>
                LGS
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
            label="Paket Adı"
            name="name"
          >
            <CustomInput placeholder="Paket Adı" />
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
              <Option key={1} value={true}>
                Aktif
              </Option>
              <Option key={2} value={false}>
                Pasif
              </Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default Packages;
