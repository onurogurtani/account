import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
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
import { addBranchs, getBranchs, updateBranchs } from '../../../store/slice/branchsSlice';
import { classroomArray, fieldType, fieldTypeArray } from '../../../constants/classroom';
import { getAllClassStages } from '../../../store/slice/classStageSlice';

const Branch = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isfieldTypeDisable, setIsfieldTypeDisable] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState();
  const { allBranchs, tableProperty } = useSelector((state) => state?.branchs);
  const { allClassList } = useSelector((state) => state?.classStages);

  useResetFormOnCloseModal({ form, open });

  useEffect(() => {
    loadBranchs();
    loadClassStages();
  }, []);

  const loadBranchs = useCallback(
    async (data = null) => {
      dispatch(getBranchs(data));
    },
    [dispatch],
  );

  const loadClassStages = useCallback(async () => {
    dispatch(getAllClassStages());
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
      title: 'Sınıf',
      dataIndex: 'classroom',
      key: 'classroom',
      sorter: (a, b) => b.classroom.name - b.classroom.name,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'Şube Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Şube Türü',
      dataIndex: 'fieldType',
      key: 'fieldType',
      sorter: (a, b) => a.name.localeCompare(b.fieldType),
      render: (text, record) => {
        return <div>{fieldType[text]}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'branchUpdateAction',
      key: 'branchUpdateAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="update-btn" onClick={() => editBranch(record)}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const editBranch = (record) => {
    record.classroom.name === '11' || record.classroom.name === '12'
      ? setIsfieldTypeDisable(false)
      : setIsfieldTypeDisable(true);
    setOpen(true);
    setSelectedBranchId(record.id);
    form.setFieldsValue(record);
  };

  const handleAddBranch = () => {
    setSelectedBranchId();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      entity: {
        name: values?.name,
        classroomId: values?.classroomId,
        id: selectedBranchId ? selectedBranchId : undefined,
      },
    };

    if (selectedBranchId) data.entity['isActive'] = values?.isActive;
    if (!isfieldTypeDisable) data.entity['fieldType'] = values?.fieldType;

    const action = await dispatch(selectedBranchId ? updateBranchs(data) : addBranchs(data));
    const reducer = selectedBranchId ? updateBranchs : addBranchs;
    if (reducer.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: selectedBranchId ? 'Kayıt Güncellenmiştir' : 'Kaydedildi',
        onOk: async () => {
          await handleClose();
        },
      });
      setIsfieldTypeDisable(true);
      loadBranchs();
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };

  const onOk = async () => {
    if (!selectedBranchId) {
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

  const checkClassroomAccess = (_, item) => {
    if (item.children === '11' || item.children === '12') {
      setIsfieldTypeDisable(false);
    } else {
      setIsfieldTypeDisable(true);
    }
  };

  return (
    <CustomPageHeader title="Şube Bilgileri Tanımlama" showBreadCrumb routes={['Tanımlamalar']}>
      <CustomCollapseCard cardTitle="Şube Bilgileri Tanımlama">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddBranch}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={allBranchs}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            total: tableProperty.totalCount,
            current: tableProperty.currentPage,
            pageSize: tableProperty.pageSize,
            position: 'bottomRight',
            onChange: (page, pageSize) => {
              const data = {
                PageNumber: page,
                PageSize: pageSize,
              };
              loadBranchs(data);
            },
          }}
          rowKey={(record) => `Branch-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={selectedBranchId ? 'Şube Güncelle' : 'Şube Ekleme'}
        visible={open}
        onOk={onOk}
        okText={selectedBranchId ? 'Güncelle' : 'Kaydet'}
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
            label="Sınıf Bilgisi"
            name="classroomId"
          >
            <CustomSelect placeholder="Seçiniz" onChange={checkClassroomAccess}>
              {allClassList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item?.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Şube Adı"
            name="name"
          >
            <CustomSelect placeholder="Seçiniz">
              {classroomArray.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            rules={[
              {
                required: !isfieldTypeDisable,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Sınıf Bilgisi"
            name="fieldType"
          >
            <CustomSelect placeholder="Seçiniz" disabled={isfieldTypeDisable}>
              {fieldTypeArray.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item?.value}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          {selectedBranchId && (
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
          )}
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default Branch;
