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
import { recordStatus } from '../../../constants';
import usePaginationProps from '../../../hooks/usePaginationProps';

const ContractTypes = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedContractTypeId, setSelectedContractTypeId] = useState();
  const { contractTypeList, tableProperty } = useSelector((state) => state?.contractTypes);
  const paginationProps = usePaginationProps(tableProperty);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadContractType(tableProperty);
  }, []);

  const loadContractType = useCallback(
    async (data = null) => {
      dispatch(getContractTypeList({
        data: {
          contractTypeDto: {
            ...data
          }
        }
      }));
    }, [dispatch]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: true,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },
    {
      title: 'Sözleşme Tipi',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
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
      contractType: {
        ...values,
      }
    };

    selectedContractTypeId ? (data.contractType.id = selectedContractTypeId) : (data.contractType.recordStatus = 1)

    const action = await dispatch(
      selectedContractTypeId ? getContractTypeUpdate(data) : getContractTypeAdd(data),
    );
    const reducer = selectedContractTypeId ? getContractTypeUpdate : getContractTypeAdd;

    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedContractTypeId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
        onOk: async () => {
          await handleClose();
        },
      });
      loadContractType(tableProperty)
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
          dataSource={contractTypeList}
          columns={columns}
          onChange={(pagination, _, sorter) => {
            if (JSON.stringify(sorter) !== '{}') {
              let field = sorter.field[0].toUpperCase() + sorter.field.substring(1);
              const data = {
                PageNumber: pagination.current,
                PageSize: pagination.pageSize,
                orderBy: field + (sorter.order === 'descend' ? 'DESC' : 'ASC')
              };
              loadContractType(data);
            } else {
              const data = {
                PageNumber: pagination.current,
                PageSize: pagination.pageSize,
              };
              loadContractType(data);
            }
          }}
          pagination={paginationProps}
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
                {recordStatus.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.value}
                  </Option>
                ))}
              </CustomSelect>
            </CustomFormItem>
          }

        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default ContractTypes;
