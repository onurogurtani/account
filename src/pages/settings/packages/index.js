import { Form } from 'antd';
import React, { useState } from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomSelect,
  CustomTable,
  Option,
} from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';

let Pack = [
  { id: 1, name: 'Ayşe 1' },
  { id: 2, name: 'Mehmet 2' },
  { id: 3, name: 'Şeyme 2' },
  { id: 4, name: 'Burcu 2' },
  { id: 5, name: 'Abidin 2' },
  { id: 6, name: 'video 2' },
  { id: 7, name: 'video 2' },
  { id: 8, name: 'video 2' },
  { id: 9, name: 'video 2' },
  { id: 10, name: 'video 2' },
  { id: 11, name: 'video 2' },
  { id: 12, name: 'video 2' },
  { id: 13, name: 'video 2' },
  { id: 14, name: 'video 2' },
  { id: 15, name: 'video 2' },
];
const Packages = () => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(false);

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
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, record) => {
        return <div>{text}</div>;
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
      sorter: (a, b) => a.examType.localeCompare(b.examType),
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
            <CustomButton className="detail-btn" onClick={() => editPackage(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editPackage = (record) => {
    console.log(record);
    setSelectedPackage(record);
    setOpen(true);
  };

  const addPackage = (record) => {
    setSelectedPackage(null);
    setOpen(true);
  };
  return (
    <>
      <CustomCollapseCard className="Paketler" cardTitle="Paketler">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addPackage}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={Pack}
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
        onOk={() => form.submit()}
        okText="Kaydet"
        cancelText="Vazgeç"
        onCancel={() => setOpen(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        // width={600}
      >
        <CustomForm
          initialValues={selectedPackage ? selectedPackage : {}}
          form={form}
          layout="vertical"
          name="form"
        >
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Sınav Türü"
            name="status"
          >
            <CustomSelect placeholder="Sınav Türü">
              <Option key={20}>YKS</Option>
              <Option key={10}>LGS</Option>
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
              <Option key={true}>Aktif</Option>
              <Option key={false}>Pasif</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default Packages;
