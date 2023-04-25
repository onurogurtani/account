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
  getContractTypeAll,
} from '../../../store/slice/contractTypeSlice';
import useResetFormOnCloseModal from '../../../hooks/useResetFormOnCloseModal';
import { recordStatus } from '../../../constants';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { addContractKinds, getContractKindsList, updateContractKinds } from '../../../store/slice/contractKindsSlice';

const ContractKinds = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedContractKindsId, setSelectedContractKindsId] = useState();
  const { contractKindsList, tableProperty } = useSelector((state) => state?.contractKinds);
  const { contractTypeAllList } = useSelector((state) => state?.contractTypes);

  const paginationProps = usePaginationProps(tableProperty);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadContractKinds(tableProperty);
    loadContractType()
  }, []);

  const loadContractKinds = useCallback(
    async (data = null) => {
      dispatch(getContractKindsList({
        data: {
          contractKindDto: {
            ...data
          }
        }
      }));
    }, [dispatch]);

  const loadContractType = useCallback(
    async () => {
      if (contractTypeAllList.length > 0) return false
      dispatch(getContractTypeAll());
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
      title: 'Sözleşme Türü Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Sözleşme Tipi',
      dataIndex: ['contractType', 'name'],
      key: ['contractType', 'name'],
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
      dataIndex: 'contractKindsUpdateAction',
      key: 'contractKindsUpdateAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="update-btn" onClick={() => editContractKinds(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editContractKinds = (record) => {
    setOpen(true);
    setSelectedContractKindsId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddContractKind = () => {
    setSelectedContractKindsId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      contractKind: {
        ...values,
      }
    };

    selectedContractKindsId ? (data.contractKind.id = selectedContractKindsId) : (data.contractKind.recordStatus = 1)

    const action = await dispatch(
      selectedContractKindsId ? updateContractKinds(data) : addContractKinds(data),
    );
    const reducer = selectedContractKindsId ? updateContractKinds : addContractKinds;

    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedContractKindsId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
        onOk: async () => {
          await handleClose();
        },
      });
      loadContractKinds(tableProperty)
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };

  const onOk = async () => {
    if (!selectedContractKindsId) {
      form.submit();
      return;
    }
    await form.validateFields();
    confirmDialog({
      title: 'Uyarı',
      message: 'Güncellemekte olduğunuz kayıt Sözleşmeler ekranında tanımlı olan kayıtları etkileyeceği için Güncelleme yapmak istediğinizden Emin misiniz?',
      onOk: () => {
        form.submit();
      },
      okText: 'Evet',
      cancelText: 'Hayır',
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
    <CustomPageHeader title="Sözleşme Türü" showBreadCrumb routes={['Tanımlamalar']}>
      <CustomCollapseCard cardTitle="Sözleşme Türü">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddContractKind}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={contractKindsList}
          columns={columns}
          onChange={(pagination, _, sorter) => {
            if (JSON.stringify(sorter) !== '{}') {
              let field = sorter.field[0].toUpperCase() + sorter.field.substring(1);
              const data = {
                PageNumber: pagination.current,
                PageSize: pagination.pageSize,
                orderBy: field + (sorter.order === 'descend' ? 'DESC' : 'ASC')
              };
              loadContractKinds(data);
            } else {
              const data = {
                PageNumber: pagination.current,
                PageSize: pagination.pageSize,
              };
              loadContractKinds(data);
            }
          }}
          pagination={paginationProps}
          rowKey={(record) => `contractKinds-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedContractKindsId ? 'Sözleşme Türü Güncelleme' : 'Sözleşme Türü Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedContractKindsId ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
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
            label="Sözleşme Türü Adı"
            name="name"
          >
            <CustomInput placeholder="Sözleşme Türü Adı" />
          </CustomFormItem>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Sözleşme Tipi"
            name="contractTypeId"
          >
            <CustomSelect placeholder="Seçiniz">
              {contractTypeAllList?.filter(contract => contract.recordStatus === 1).map((item) => (
                <Option key={item.id} value={item.id}>
                  {item?.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
          <CustomFormItem
            name={'description'}
            label={<Text t="Açıklama" />}
          >
            <CustomTextArea />
          </CustomFormItem>
          {
            selectedContractKindsId
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

export default ContractKinds;
