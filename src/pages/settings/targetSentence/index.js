import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomFormItem,
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
  getTargetSentenceDelete,
  getTargetSentenceList,
  getTargetSentenceUpdate,
} from '../../../store/slice/targetSentenceSlice';

const TargetSentence = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editInfo, setEditInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [textValue, setTextValue] = useState('');
  const { targetSentenceList } = useSelector((state) => state?.targetSentence);
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
      dataIndex: 'text',
      key: 'text',
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
            <CustomButton
              className="update-btn"
              onClick={() => {
                setEditInfo(record);
                setTextValue(record.text);
                setShowAddModal(true);
              }}
            >
              Güncelle
            </CustomButton>
            {/* <CustomButton
              style={{ background: 'red' }}
              className="update-btn"
              onClick={() => {
                confirmDialog({
                  title: <Text t="attention" />,
                  message: 'Silmek istediğinizden emin misiniz?',
                  onOk: async () => {
                    const action = await dispatch(getTargetSentenceDelete({ id: record.id }));

                    if (getTargetSentenceDelete.fulfilled.match(action)) {
                      successDialog({
                        title: <Text t="success" />,
                        message: action?.payload?.message,
                      });
                      setShowAddModal(false);
                      setEditInfo(null);
                      setTextValue('');
                    } else {
                      errorDialog({
                        title: <Text t="error" />,
                        message: action?.payload?.message,
                      });
                    }

                    await dispatch(getTargetSentenceList());
                  },
                });
              }}
            >
              Sil
            </CustomButton>*/}
          </div>
        );
      },
    },
  ];
  const formEdit = async () => {
    const action = await dispatch(getTargetSentenceUpdate({ entity: { id: editInfo.id, text: textValue } }));
    if (getTargetSentenceUpdate.fulfilled.match(action)) {
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
    const action = await dispatch(getTargetSentenceAdd({ entity: { text: textValue } }));
    if (getTargetSentenceAdd.fulfilled.match(action)) {
      successDialog({
        title: <Text t="successfullySent" />,
        message: action?.payload?.message,
        onOk: () => {
          setTextValue('');
          setEditInfo(null);
          setShowAddModal(false);
          dispatch(getTargetSentenceList());
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
          dataSource={targetSentenceList?.items}
          columns={columns}
          pagination={{
            total: targetSentenceList?.pagedProperty?.totalCount,
            current: targetSentenceList?.pagedProperty?.currentPage,
            pageSize: targetSentenceList?.pagedProperty?.pageSize,
            position: 'bottomRight',
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              const data = {
                PageNumber: page,
                PageSize: pageSize,
              };
              dispatch(getTargetSentenceList({ params: data }));
            },
          }}
          rowKey={(record) => `announcementType-${record?.id || record?.text}`}
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
        <CustomForm form={form} autoComplete="off" layout={'horizontal'} onFinish={editInfo ? formEdit : formAdd}>
          <CustomFormItem label="Hedef Cümle Şablon">
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

export default TargetSentence;
