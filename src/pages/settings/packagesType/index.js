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
// import {
//   addPackagesType,
//   getPackagesType,
//   updatePackagesType,
// } from '../../../store/slice/PackagesTypeSlice';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';

const PackagesType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedPackagesTypeId, setSelectedPackagesTypeId] = useState();
  // const { PackagesTypes } = useSelector((state) => state?.PackagesTypes);

  const PackagesTypes = [
    { id: 1, name: 'ders Paket', status: true, packageAccessPage: 'Net Hedef Aralığı' },
    { id: 2, name: 'ful yks Paketi', status: true, packageAccessPage: 'Hedef Listesi tayfası' },
    { id: 3, name: 'Paket türü 3', status: false, packageAccessPage: 'net aralığı + Hedef' },
    {
      id: 4,
      name: 'Ayt Paketi',
      status: false,
      packageAccessPage: 'Hedeflerim sayfasının içeriğini göremez',
    },
  ];

  const testolist = [
    'Net Hedef Aralığı',
    'Hedef Listesi tayfası',
    'net aralığı',
    'Hedeflerim sayfasının içeriğini göremez' ,
  ];

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    // loadPackagesType();
  }, []);

  // const loadPackagesType = useCallback(async () => {
  //   dispatch(getPackagesType());
  // }, [dispatch]);

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
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => b.isActive - a.isActive,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Paket Türü Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Paketin Erişebileceği Hedef Ekranı',
      dataIndex: 'packageAccessPage',
      key: 'packageAccessPage',
      sorter: (a, b) => a.name.localeCompare(b.packageAccessPage),
      render: (text, record) => {
        return <div>{text}</div>;
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
            <CustomButton className="update-btn" onClick={() => editPackagesType(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editPackagesType = (record) => {
    setOpen(true);
    setSelectedPackagesTypeId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddPackagesType = () => {
    setSelectedPackagesTypeId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    // const data = {
    //   name: values?.name,
    //   isActive: values?.isActive,
    //   id: selectedPackagesTypeId ? selectedPackagesTypeId : undefined,
    // };
    // const action = await dispatch(
    //   selectedPackagesTypeId ? updatePackagesType(data) : addPackagesType(data),
    // );
    // const reducer = selectedPackagesTypeId ? updatePackagesType : addPackagesType;
    // if (reducer.fulfilled.match(action)) {
    //   successDialog({
    //     title: <Text t="success" />,
    //     message: selectedPackagesTypeId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
    //     // message: action?.payload.message,
    //     onOk: async () => {
    //       await handleClose();
    //     },
    //   });
    // } else {
    //   errorDialog({
    //     title: <Text t="error" />,
    //     message: action?.payload.message,
    //   });
    // }
  };

  const onOk = async () => {
    if (!selectedPackagesTypeId) {
      form.submit();
      return;
    }
    await form.validateFields();
    confirmDialog({
      title: 'Uyarı',
      message: 'Seçtiğiniz Kayıt Üzerinde Değişiklik Yapılacaktır. Emin misiniz?',
      onOk: () => {
        form.submit();
      },
    });
  };

  const onCancel = () => {
    confirmDialog({
      title: 'Uyarı',
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => {
        setOpen(false);
      },
    });
  };

  const onSecondSelectChange = (value) => {
    if(value.includes("Hedeflerim sayfasının içeriğini göremez"))
    form.setFieldsValue({packageAccessPage:["Hedeflerim sayfasının içeriğini göremez"]})
  };

  return (
    <CustomPageHeader title="Paket Türü Tanımlama" showBreadCrumb routes={['Tanımlamalar']}>
      <CustomCollapseCard cardTitle="Paket Türü Tanımlama">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddPackagesType}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={PackagesTypes}
          //   onChange={handleSort}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `PackagesType-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedPackagesTypeId ? 'Paket Türü Güncelle' : 'Yeni Paket Türü Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedPackagesTypeId ? 'Güncelle' : 'Kaydet'}
        cancelText="İptal"
        onCancel={onCancel}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
      >
        <CustomForm form={form} layout="vertical" name="form" onFinish={onFinish}>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Paket Türü Adı"
            name="name"
          >
            <CustomInput placeholder="Paket Türü Adı" />
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
            <CustomSelect placeholder="Seçiniz">
              <Option key={1} value={true}>
                Aktif
              </Option>
              <Option key={2} value={false}>
                Pasif
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
            label="Paketin Erişebileceği Hedef Ekranı"
            name="packageAccessPage"
          >
            <CustomSelect
              placeholder="Seçiniz"
              mode="multiple"
              showArrow
              onChange={onSecondSelectChange}
              options={testolist.map((province) => ({
                label: province,
                value: province,
              }))}
            />
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default PackagesType;
