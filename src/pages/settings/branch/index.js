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
//   addTargetScreen,
//   getTargetScreen,
//   updateTargetScreen,
// } from '../../../store/slice/TargetScreenSlice';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';

const Branch = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedTargetScreenId, setSelectedTargetScreenId] = useState();
  // const { TargetScreens } = useSelector((state) => state?.TargetScreens);

  const TargetScreens = [
    { id: 1, name: 'Net Hedef Aralığı', status: true, packageAccessPage: 'Net Hedef Aralığı' },
    {
      id: 2,
      name: 'Hedef Listesi + Terchi Sihirbaz',
      status: false,
      packageAccessPage: 'Hedeflerim',
    },
  ];

  const testolist = [
    'Net Hedef Aralığı',
    'Hedef Listesi tayfası',
    'net aralığı',
    'Dersler Sayfası',
  ];

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    // loadTargetScreen();
  }, []);

  // const loadTargetScreen = useCallback(async () => {
  //   dispatch(getTargetScreen());
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
      title: 'Hedef Ekranı Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'İlgili Sayfa Adı',
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
            <CustomButton className="update-btn" onClick={() => editTargetScreen(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editTargetScreen = (record) => {
    setOpen(true);
    setSelectedTargetScreenId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddTargetScreen = () => {
    setSelectedTargetScreenId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    // const data = {
    //   name: values?.name,
    //   isActive: values?.isActive,
    //   id: selectedTargetScreenId ? selectedTargetScreenId : undefined,
    // };
    // const action = await dispatch(
    //   selectedTargetScreenId ? updateTargetScreen(data) : addTargetScreen(data),
    // );
    // const reducer = selectedTargetScreenId ? updateTargetScreen : addTargetScreen;
    // if (reducer.fulfilled.match(action)) {
    //   successDialog({
    //     title: <Text t="success" />,
    //     message: selectedTargetScreenId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
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
    if (!selectedTargetScreenId) {
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

  return (
    <CustomPageHeader title="Şube Tanımlama" showBreadCrumb routes={['Tanımlamalar']}>
      <CustomCollapseCard cardTitle="Şube Tanımlama">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddTargetScreen}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={TargetScreens}
          //   onChange={handleSort}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `TargetScreen-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedTargetScreenId ? 'Şube Güncelle' : 'Şube Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedTargetScreenId ? 'Güncelle' : 'Kaydet'}
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
            label="Hedef Ekranı Adı"
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
            label="İlgili Sayfa Seçimi"
            name="packageAccessPage"
          >
            <CustomSelect
              placeholder="Seçiniz"
              mode="multiple"
              showArrow
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

export default Branch;
