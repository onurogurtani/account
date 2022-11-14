import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
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
import classes from '../../../styles/settings/classStages.module.scss';
import {
  getAllClassStages,
  addNewClassStage,
  updateClassStage,
  deleteClassStage,
} from '../../../store/slice/classStageSlice';

const ClassStages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClassStages());
  }, []);

  const { allClassList} = useSelector((state) => state?.classStages);
 

  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState();
  const [updateObject, setUpdateObject] = useState({});

  const stages = [
    { id: 10, value: 'İlkokul', text: 'İlkokul' },
    { id: 20, value: 'Ortaokul', text: 'Ortaokul' },
    { id: 30, value: 'Lise', text: 'Lise' },
  ];

  const schoolLevelReverseEnum = {
    10: 'İlkokul',
    20: 'Ortaokul',
    30: 'Lise',
  };
  const schoolLevelEnum = {
    İlkokul: 10,
    Ortaokul: 20,
    Lise: 30,
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'no',
      width: 90,
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 1,
      },
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
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name, 'tr', { numeric: true }),
        multiple: 3,
      },
      render: (text, record) => {
        return <div className={classes.classContainer}>{text}</div>;
      },
    },

    {
      title: 'Okul Seviyesi',
      dataIndex: 'schoolLevel',
      key: 'schoolLevel',
      align: 'center',
      sortDirections: ['ascend', 'descend'],
      sorter: {
        compare: (a, b) => schoolLevelReverseEnum[a.schoolLevel].localeCompare(schoolLevelReverseEnum[b.schoolLevel], 'tr', { numeric: false }),
        multiple: 2,
      },
      render: (text, record) => {
        return <div className={classes.classContainer}>{schoolLevelReverseEnum[text]}</div>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'updateClassStage',
      key: 'updateClassStage',
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
            <div className={classes["action-btns"]} style={{ marginRight: '5px' }}>
              <CustomButton
                className={classes["update-btn"]}
                onClick={() => {
                  setIsEdit(true);
                  setSelectedClassId(record.id);
                  editClassStage(record);
                }}
              >
                Güncelle
              </CustomButton>
            </div>
            <div className={classes["action-btns"]}>
              <CustomButton
                className={classes["delete-btn"]}
                onClick={() => {
                  deleteClassStageHandler(record);
                }}
              >
                Sil
              </CustomButton>
            </div>
          </div>
        );
      },
    },
  ];

  const editClassStage = useCallback((record) => {
    setOpen(true);
    setIsEdit(true);
    setUpdateObject(record);
    form.setFieldsValue({
      name: record.name,
      schoolLevel: schoolLevelReverseEnum[record.schoolLevel],
    });
  });
  const handleaddNewClassStage = () => {
    setSelectedClassId();
    setIsEdit(false);
    form.resetFields();
    setOpen(true);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    const data = {
      entity: {
        name: values?.name,
        isActive: true,
        schoolLevel: schoolLevelEnum[values.schoolLevel],
        id: isEdit ? selectedClassId : undefined,
      },
    };
    if (isEdit) {
      if (_.isEqual(data.entity, updateObject)) {
        errorDialog({
          title: <Text t="error" />,
          message: 'Kayıt üzerinde herhangi bir değişiklik yapmadınız!',
        });
        return false;
      }
      const action = await dispatch(updateClassStage(data));
      if (updateClassStage.fulfilled.match(action)) {
        setOpen(false);
        successDialog({
          title: <Text t="success" />,
          message: 'İlgili kayıt güncellenmiştir.',
          onOk: () => {
            form.resetFields();
          },
        });
        setIsEdit(false);
        dispatch(getAllClassStages());
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload.message,
        });
      }
      return;
    }

    const action = await dispatch(addNewClassStage(data));
    if (addNewClassStage.fulfilled.match(action)) {
      setOpen(false);
      successDialog({
        title: <Text t="success" />,
        message: 'Yeni kayıt başarıyla eklenmiştir.',
        onOk: () => {
          setOpen(false);
          form.resetFields();
        },
      });
      dispatch(getAllClassStages());
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };
  const onOk = async () => {
    onFinish();
  };

  const onCancel = useCallback(() => {
    {
      confirmDialog({
        title: 'Uyarı',
        message: 'İptal Etmek İstediğinizden Emin Misiniz?',
        okText: 'Evet',
        cancelText: 'Hayır',
        onOk: () => {
          form.resetFields();
          setOpen(false);
        },
      });
    }
  });

  const deleteClassStageHandler = async (record) => {
    confirmDialog({
      title: 'Uyarı',
      message: 'Üzerinde olduğunuz ilgili kaydı silmek istediğinize emin misiniz?',
      onOk: async () => {
        const data = record.id;
        const action = await dispatch(deleteClassStage(data));
        if (deleteClassStage.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: 'İlgili kayıt silinmiştir',
            onOk: () => {
              dispatch(getAllClassStages());
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload.message,
          });
        }
      },
    });
  };
 

  return (
    <CustomPageHeader title="Sınıf Seviye Tanım Bilgileri" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Sınıf Seviye Tanım Bilgileri">
        <div className={classes["table-header"]}>
          <CustomButton className={classes["add-btn"]} onClick={handleaddNewClassStage}>
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={allClassList}
          columns={columns}
          pagination={false}
          rowKey={(record) => `events-${record?.id || record?.name}`}
          scroll={{
            y: 750,
          }}
        />
      </CustomCollapseCard>

      <CustomModal
        title={isEdit ? 'Sınıf Seviye Tanımı Güncelle' : 'Sınıf Seviye Tanımı  Ekle'}
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
            label="Sınıf Seviyesi"
            name="schoolLevel"
          >
            <CustomSelect placeholder="Okul Seviyesi">
              {stages.map(({ id, value }) => (
                <Option key={id} value={value}>
                  {value}
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
