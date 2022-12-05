import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomPageHeader,
  CustomTable,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import '../../../styles/table.scss';
import { Form } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getTargetSentenceAdd,
  getTargetSentenceList,
  getTargetSentenceUpdate,
} from '../../../store/slice/targetSentenceSlice';
const TargetStence = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editInfo, setEditInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [textValue, setTextValue] = useState('');

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Hedef Cümle',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'İşlemler',
      dataIndex: 'update',
      key: 'update',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="update-btn" onClick={() => console.log('d')}>
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];
  const formEdit = async () => {
    const action = await dispatch(getTargetSentenceUpdate({ value: textValue }));
    if (getTargetSentenceAdd.fulfilled.match(action)) {
      successDialog({
        title: <Text t="successfullySent" />,
        message: action?.payload?.message,
        onOk: () => {
          dispatch(getTargetSentenceList());
          setEditInfo(null);
          setTextValue('');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };

  const formAdd = async () => {
    console.log(textValue);
    if (!textValue) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Lütfen gerekli alanı giriniz.',
      });
      return;
    }
    const action = await dispatch(getTargetSentenceAdd({ value: textValue }));
    if (getTargetSentenceAdd.fulfilled.match(action)) {
      successDialog({
        title: <Text t="successfullySent" />,
        message: action?.payload?.message,
        onOk: () => {
          dispatch(getTargetSentenceList());
          setEditInfo(null);
          setTextValue('');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
      });
    }
  };
  useEffect(() => {
    dispatch(getTargetSentenceList());
  }, [dispatch]);
  return (
    <CustomPageHeader title="Hedef Cümle Şablonları Tanımlama " showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Hedef Cümle Şablonları Tanımlama ">
        <div className="table-header">
          <CustomButton
            className="add-btn"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          dataSource={['s']}
          columns={columns}
          pagination={{
            showQuickJumper: {
              goButton: <CustomButton className="go-button">Git</CustomButton>,
            },
            position: 'bottomRight',
          }}
          rowKey={(record) => `announcementType-${record?.id || record?.name}`}
        />
      </CustomCollapseCard>

      <CustomModal
        width={900}
        visible={showAddModal}
        title={editInfo ? 'Hedef Cümle Şablonları Güncelleme' : 'Hedef Cümle Şablonları Tanımlama'}
        onCancel={() => {
          form.resetFields();
          setShowAddModal(false);
          setEditInfo(null);
          setTextValue('');
        }}
        okText={editInfo ? 'Kaydet ve Güncelle' : 'Kaydet'}
        onOk={() => {
          form.submit();
        }}
      >
        <CustomForm
          form={form}
          autoComplete="off"
          layout={'horizontal'}
          onFinish={editInfo ? formEdit : formAdd}
        >
          <CustomFormItem name={'ati'} label="Hedef Cümle Şablon">
            <ReactQuill
              value={textValue}
              onChange={(e) => {
                setTextValue(e);
              }}
            />
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </CustomPageHeader>
  );
};

export default TargetStence;
