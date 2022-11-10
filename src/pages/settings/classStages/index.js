import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Tag, Button } from 'antd';
import {
  confirmDialog,
  CustomButton,
  CustomPagination,
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
import { getEventTypes, addEventType, updateEventType } from '../../../store/slice/eventTypeSlice';

const ClassStages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventTypes());
  }, []);
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState();
  const { eventTypes, filterObject, tableProperty } = useSelector((state) => state?.eventType);
  console.log(tableProperty);

  const stages = [
    { id: 1, value: 'ilkOkul', text: 'İlkokul' },
    { id: 2, value: 'ortaOkul', text: 'Ortaokul' },
    { id: 3, value: 'lise', text: 'Lise' },
  ];
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 90,
      sorter: true,
      align: 'center',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Sınıf Adı',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: true,
      render: (text, record) => {
        return <div className="eventDescriptionContainer">{text}</div>;
      },
    },

    {
      title: 'Okul Seviyesi',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (text, record) => {
        return <div className="eventDescriptionContainer">{text}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'updateEventType',
      key: 'updateEventType',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'space-around',
            }}
          >
            <div className="action-btns" style={{ marginRight: '5px' }}>
              <CustomButton
                className="update-btn"
                onClick={() => {
                  console.log(record);
                  editEventType(record);
                }}
              >
                Güncelle
              </CustomButton>
            </div>
            <div className="action-btns">
              <CustomButton className="delete-btn" onClick={deleteClassStageHandler}>
                Sil
              </CustomButton>
            </div>
          </div>
        );
      },
    },
  ];

  const sortFields = [
    {
      key: 'no',
      ascend: 'idASC',
      descend: 'idDESC',
    },
    {
      key: 'name',
      ascend: 'nameASC',
      descend: 'nameDESC',
    },
    {
      key: 'isActive',
      ascend: 'isActiveASC',
      descend: 'isActiveDESC',
    },
  ];

  const editEventType = useCallback((record) => {
    setOpen(true);
    setSelectedPackageId(record.no);
    setIsEdit(true);
    form.setFieldsValue(record);
  });
  const handleAddEventType = () => {
    setSelectedPackageId();
    setIsEdit(false);
    form.resetFields();
    setOpen(true);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    console.log(values);
    const data = {
      name: values?.name,
      isActive: values?.isActive,
      description: values?.description,
      id: isEdit ? selectedPackageId : undefined,
    };
    console.log(data);
    if (isEdit) {
      const action = await dispatch(updateEventType(data));
      if (updateEventType.fulfilled.match(action)) {
        setOpen(false);
        successDialog({
          title: <Text t="success" />,
          message: action?.payload.message,
          onOk: () => {
            form.resetFields();
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

    const action = await dispatch(addEventType(data));
    if (addEventType.fulfilled.match(action)) {
      setOpen(false);
      successDialog({
        title: <Text t="success" />,
        message: action?.payload.message,
        onOk: () => {
          setOpen(false);
          form.resetFields();
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };
  const onOk = useCallback(() => {
    {
      !isEdit && onFinish();
    }
    {
      isEdit &&
        confirmDialog({
          title: 'Uyarı',
          message: 'Seçtiğiniz Kayıt Üzerinde Değişiklik Yapılacaktır. Emin misiniz?',
          onOk: () => {
            onFinish();
          },
        });
    }
  }, [isEdit]);

  const onCancel = useCallback(() => {
    {
      confirmDialog({
        title: 'Uyarı',
        message: 'İşlemi İptal Etmek İstediğinizden Emin Misiniz?',
        onOk: () => {
          form.resetFields();
          setOpen(false);
        },
      });
    }
  });

  const handleSort = (pagination, filters, sorter) => {
    console.log(pagination);
    if (sorter.order == undefined) {
      const data = { ...filterObject };
      dispatch(getEventTypes(data));
    } else {
      const sortType = sortFields.filter((field) => field.key === sorter.columnKey);
      console.log(sortType);
      const data = {
        OrderBy: sortType.length ? sortType[0][sorter.order] : '',
      };
      dispatch(getEventTypes(data));
    }
  };
  const paginationProps = {
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
        ...filterObject,
        PageNumber: page,
        PageSize: pageSize,
      };
      dispatch(getEventTypes(data));
    },
  };

  const TableFooter = ({ paginationProps }) => {
    return (
      <Row justify="end">
        <CustomPagination className="custom-pagination" {...paginationProps} />
      </Row>
    );
  };

  const deleteClassStageHandler = useCallback(() => {
    confirmDialog({
      title: 'Uyarı',
      message: 'Üzerinde olduğunuz ilgili kaydı silmek istediğinize emin misiniz?',
      onOk: () => {
        onFinish();
      },
    });
  });

  return (
    <CustomPageHeader title="Sınıf Seviye Tanım Bilgileri" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Sınıf Seviye Tanım Bilgileri">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={handleAddEventType}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={eventTypes}
          columns={columns}
          onChange={handleSort}
          pagination={false}
          rowKey={(record) => `events-${record?.id || record?.headText}`}
          footer={() => <TableFooter paginationProps={paginationProps} />}
          scroll={{
            y: 750,
          }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={isEdit ? 'Sınıf Sevite Tanımı Güncelle' : 'Sınıf Sevite Tanımı  Ekle'}
        visible={open}
        okText={isEdit ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
        onOk={onOk}
        cancelText="İptal Et"
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
            label="Sınıf Seviyesi"
            name="isActive"
          >
            <CustomSelect placeholder="Sınıf Seviyesi">
              {stages.map(({ id, value, text }) => (
                <Option key={id} value={id}>
                  {text}
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
            label="Sınıf Adı"
            name="name"
          >
            <CustomInput placeholder="Sınıf Adı" />
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default ClassStages;
