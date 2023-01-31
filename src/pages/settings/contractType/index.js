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
  CustomTextArea,
  errorDialog,
  Option,
  successDialog,
  Text,
} from '../../../components';
import '../../../styles/settings/packages.scss';
import '../../../styles/table.scss';
import {
  getContractTypeAdd,
  getContractTypeList,
  getContractTypeUpdate,
} from '../../../store/slice/contractTypeSlice';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';

const ContractTypes = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedContractTypeId, setSelectedContractTypeId] = useState();
  const { contractTypes } = useSelector((state) => state?.contractTypes);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadContractType();
  }, []);

  const loadContractType = useCallback(async () => {
    dispatch(getContractTypeList({ data: null, params: { 'ContractTypeDetailSearch.PageSize': 999999 } }));
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
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: (a, b) => b.recordStatus - a.recordStatus,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Sözleşme Tipi',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'contractTypeUpdateAction',
      key: 'contractTypeUpdateAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="update-btn" onClick={() => editContractType(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editContractType = (record) => {
    setOpen(true);
    setSelectedContractTypeId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddContractType = () => {
    setSelectedContractTypeId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      contractTypeDto: {
        ...values,
        recordStatus: 1
      }
    };

    selectedContractTypeId && (data.contractTypeDto.id = selectedContractTypeId)

    const action = await dispatch(
      selectedContractTypeId ? getContractTypeUpdate(data) : getContractTypeAdd(data),
    );
    const reducer = selectedContractTypeId ? getContractTypeUpdate : getContractTypeAdd;

    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedContractTypeId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
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
    if (!selectedContractTypeId) {
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
    <CustomPageHeader title="Sözleşme Tipi" showBreadCrumb routes={['Tanımlamalar']}>
      <CustomCollapseCard cardTitle="Sözleşme Tipi">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddContractType}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={contractTypes}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `contractType-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedContractTypeId ? 'Sözleşme Tipi Güncelleme' : 'Sözleşme Tipi Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedContractTypeId ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
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
            label="Sözleşme Tipi Adı"
            name="name"
          >
            <CustomInput placeholder="Sözleşme Tipi Adı" />
          </CustomFormItem>
          <CustomFormItem
            rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
            name={'description'}
            label={<Text t="Açıklama" />}
          >
            <CustomTextArea />
          </CustomFormItem>

          {
            selectedContractTypeId
            &&
            <CustomFormItem
              rules={[
                {
                  required: true,
                  message: 'Lütfen Zorunlu Alanları Doldurunuz.',
                },
              ]}
              label="Durumu"
              name="recordStatus"
            >
              <CustomSelect placeholder="Durumu">
                <Option key={1} value={true}>
                  Aktif
                </Option>
                <Option key={0} value={false}>
                  Pasif
                </Option>
              </CustomSelect>
            </CustomFormItem>
          }

        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default ContractTypes;
