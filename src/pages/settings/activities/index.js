import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';
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
import classes from '../../../styles/settings/eventTypes.module.scss'
import '../../../styles/settings/eventTypesPagination.scss'
import { getEventTypes, addEventType, updateEventType } from '../../../store/slice/eventTypeSlice';

const Activities = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventTypes());
  },[])
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState();
  const { eventTypes, filterObject, tableProperty } = useSelector((state) => state?.eventType);

  const [form] = Form.useForm();

  useEffect(() => {
  }, [selectedPackageId, isEdit]);
  console.log(selectedPackageId, isEdit);

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 90,
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 170,
      sorter: true,
      render: (isPublished) => {
        return isPublished ? (
          <span
            style={{
              backgroundColor: '#00a483',
              borderRadius: '5px',
              boxShadow: '0 5px 5px 0',
              padding: '5px',
              width: '100px',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Aktif
          </span>
        ) : (
          <span
            style={{
              backgroundColor: '#ff8c00',
              borderRadius: '5px',
              boxShadow: '0 5px 5px 0',
              padding: '5px',
              width: '100px',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Pasif
          </span>
        );
      },
    },
    {
      title: 'Etkinlik Türü Adı',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: true,
      render: (text, record) => {
        return <div className={classes["eventDescriptionContainer"]}>{text}</div>;
      },
    },

    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      sorter:true,
      render: (text, record) => {
        return <div className={classes["eventDescriptionContainer"]}>{text}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'updateEventType',
      key: 'updateEventType',
      align: 'center',
      width: 170,
      render: (text, record) => {
        return (
          <div className={classes["action-btns"]}>
            <CustomButton
              className={classes["update-btn"]}
              onClick={() => {
                setSelectedPackageId(record.no);
                editEventType(record);
              }}
            >
              Güncelle
            </CustomButton>
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
    {
      key: 'description',
      ascend: 'descriptionASC',
      descend: 'descriptionDESC',
    }
  ];

  const editEventType = useCallback((record) => {
    confirmDialog({
      title: 'Uyarı',
      message:'Seçtiğiniz kayıt üzerinde değişiklik yapmak istediğinize emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => {
        setOpen(true);
        console.log()
        setIsEdit(true);
        form.setFieldsValue(record);
      },
    });

   
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
          message: 'Kayıt güncellenmiştir',
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
    onFinish();
  }, [isEdit]);

  const onCancel = useCallback(() => {
    {
      confirmDialog({
        title: 'Uyarı',
        message: 'İşlemi İptal Etmek İstediğinizden Emin Misiniz?',
        okText: 'Evet',
        cancelText: 'Hayır',
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
        <CustomPagination className='custom-pagination' {...paginationProps} />
      </Row>
    );
  };
  return (
    <CustomPageHeader title="Etkinlikler" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Etkinlik Türü Tanımları">
        <div className={classes["table-header"]}>
          <CustomButton className={classes["add-btn"]} onClick={handleAddEventType}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={eventTypes}
          columns={columns}
          onChange={handleSort}
          pagination={false}
          rowKey={(record) => `events-${record?.id || record?.name}`}
          footer={() => <TableFooter paginationProps={paginationProps} />}
          scroll={{
            y: 750,
          }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={isEdit ? 'Etkinlik Türü Güncelle' : 'Etkinlik Türü Ekle'}
        visible={open}
        okText={isEdit ? 'Güncelle ve Kaydet' : 'Kaydet ve Bitir'}
        onOk={onOk}
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
            label="Etkinlik Türü Adı"
            name="name"
          >
            <CustomInput placeholder="Etkinlik Türü Adı" />
          </CustomFormItem>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: 'Lütfen Zorunlu Alanları Doldurunuz.',
              },
            ]}
            label="Açıklama"
            name="description"
          >
            <CustomInput placeholder="Etkinlik Hakkında Açıklama..." />
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
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default Activities;
