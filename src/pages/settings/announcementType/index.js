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
import {
  addAnnouncementType,
  getAnnouncementType,
  updateAnnouncementType,
} from '../../../store/slice/announcementTypeSlice';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';

const AnnouncementType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedAnnouncementTypeId, setSelectedAnnouncementTypeId] = useState();
  const { announcementTypes } = useSelector((state) => state?.announcementTypes);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadAnnouncementType();
  }, []);

  const loadAnnouncementType = useCallback(async () => {
    dispatch(getAnnouncementType());
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
      title: 'Duyuru Tipi Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
            <CustomButton className="update-btn" onClick={() => editAnnouncementType(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editAnnouncementType = (record) => {
    setOpen(true);
    setSelectedAnnouncementTypeId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddAnnouncementType = () => {
    setSelectedAnnouncementTypeId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      name: values?.name,
      isActive: values?.isActive,
      id: selectedAnnouncementTypeId ? selectedAnnouncementTypeId : undefined,
    };
    const action = await dispatch(
      selectedAnnouncementTypeId ? updateAnnouncementType(data) : addAnnouncementType(data),
    );
    const reducer = selectedAnnouncementTypeId ? updateAnnouncementType : addAnnouncementType;

    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedAnnouncementTypeId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
        // message: action?.payload.message,
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

  const onOk = async () => {
    if (!selectedAnnouncementTypeId) {
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
    <CustomPageHeader title="Duyuru Tipi Tanımlama" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Duyuru Tipi Tanımlama">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddAnnouncementType}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={announcementTypes}
          //   onChange={handleSort}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `announcementType-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedAnnouncementTypeId ? 'Duyuru Tipi Güncelle' : 'Yeni Duyuru Tipi Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedAnnouncementTypeId ? 'Güncelle' : 'Kaydet'}
        cancelText="İptal"
        onCancel={onCancel}
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
            label="Duyuru Tipi Adı"
            name="name"
          >
            <CustomInput placeholder="Duyuru Tipi Adı" />
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

export default AnnouncementType;
