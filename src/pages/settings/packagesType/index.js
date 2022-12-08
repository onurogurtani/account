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
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';
import {
  addNewPackageType,
  getAllPackageType,
  updatePackageType,
} from '../../../store/slice/packageType';
import { getAllTargetScreen } from '../../../store/slice/targetScreen';

const PackagesType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedPackagesTypeId, setSelectedPackagesTypeId] = useState();
  const { allPackageType } = useSelector((state) => state?.packageType);
  const { allTargetScreen } = useSelector((state) => state?.targetScreen);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadPackagesType();
    loadTargetScreen();
  }, []);

  const loadPackagesType = useCallback(async () => {
    dispatch(getAllPackageType());
  }, [dispatch]);

  const loadTargetScreen = useCallback(async () => {
    dispatch(getAllTargetScreen());
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
      dataIndex: 'packageTypeTargetScreens',
      key: 'packageTypeTargetScreens',
      sorter: (a, b) => a.name.localeCompare(b.packageAccessPage),
      render: (text, record) => {
        let packageTypeTargetScreens = '';
        let iterations = text?.length;
        if (iterations > 0) {
          for (const item of text) {
            if (!--iterations) {
              packageTypeTargetScreens += item.targetScreen.name;
            } else {
              packageTypeTargetScreens += item.targetScreen.name + ' + ';
            }
          }
        } else {
          packageTypeTargetScreens = 'Hedeflerim sayfasının içeriğini göremez';
        }

        return <div>{packageTypeTargetScreens}</div>;
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

    const targetScreenArray = [];
    if (record.packageTypeTargetScreens.length > 0) {
      record.packageTypeTargetScreens.map((item) => targetScreenArray.push(item.targetScreen.id));
    } else {
      targetScreenArray.push('Hedeflerim sayfasının içeriğini göremez');
    }

    form.setFieldsValue({
      packageTypeTargetScreens: targetScreenArray,
    });
  };

  const handleAddPackagesType = () => {
    setSelectedPackagesTypeId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    let data = {
      packageType: {
        name: values?.name,
        isActive: values?.isActive,
      },
    };
    if (selectedPackagesTypeId) data.packageType['id'] = selectedPackagesTypeId;
    if (values?.packageTypeTargetScreens?.includes('Hedeflerim sayfasının içeriğini göremez')) {
      data.packageType['isCanSeeTargetScreen'] = false;
    } else {
      data.packageType['isCanSeeTargetScreen'] = true;
      data.packageType['packageTypeTargetScreens'] = values.packageTypeTargetScreens.map((item) => {
        return { targetScreenId: item };
      });
    }
    const action = await dispatch(
      selectedPackagesTypeId ? updatePackageType(data) : addNewPackageType(data),
    );
    const reducer = selectedPackagesTypeId ? updatePackageType : addNewPackageType;
    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedPackagesTypeId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
        onOk: async () => {
          await handleClose();
        },
      });
      loadPackagesType();
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
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
    if (value.includes('Hedeflerim sayfasının içeriğini göremez'))
      form.setFieldsValue({
        packageTypeTargetScreens: ['Hedeflerim sayfasının içeriğini göremez'],
      });
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
          dataSource={allPackageType}
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
            name="packageTypeTargetScreens"
          >
            <CustomSelect
              placeholder="Seçiniz"
              mode="multiple"
              showArrow
              onChange={onSecondSelectChange}
            >
              {allTargetScreen?.map((item, i) => {
                return (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                );
              })}
              <Option value={'Hedeflerim sayfasının içeriğini göremez'}>
                Hedeflerim sayfasının içeriğini göremez
              </Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default PackagesType;
