import { Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
  successDialog,
  Text,
} from '../../../components';
import { getPublisherList, getPublisherListAdd, getPublisherUpdate } from '../../../store/slice/publisherSlice';
import '../../../styles/settings/publisher.scss';

const Publisher = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const { publisherList } = useSelector((state) => state.publisher);
  const [form] = Form.useForm();
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
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      render: (text, record) => {
        return <>{text === 1 ? 'Aktif' : 'Pasif'}</>;
      },
    },
    {
      title: 'İŞLEMLER',
      dataIndex: 'draftDeleteAction',
      key: 'draftDeleteAction',
      width: 200,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="action-btns">
            <CustomButton
              onClick={() => {
                setUpdateData(record);
                setShowAddModal(true);
                form.setFieldsValue({ ...record, recordStatus: record.recordStatus === 1 ? 'Aktif' : 'Pasif' });
              }}
              className="edit-button"
            >
              DÜZENLE
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const sumbit = useCallback(
    async (e) => {
      if (updateData) {
        const action = await dispatch(
          getPublisherUpdate({
            entity: {
              recordStatus: e.recordStatus,
              name: e.name,
              id: updateData.id,
            },
          }),
        );
        if (getPublisherUpdate.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              dispatch(getPublisherList());
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      } else {
        const action = await dispatch(
          getPublisherListAdd({
            entity: {
              recordStatus: 1,
              name: e.name,
            },
          }),
        );
        if (getPublisherListAdd.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              dispatch(getPublisherList());
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: 'Bilgileri kontrol ediniz.',
          });
        }
      }
    },
    [dispatch, form, updateData],
  );
  useEffect(() => {
    dispatch(getPublisherList());
  }, [dispatch]);
  return (
    <div>
      <CustomPageHeader>
        <CustomCollapseCard cardTitle={'Yayın Tanılama'}>
          <div className=" table-head">
            <CustomButton
              onClick={() => setShowAddModal(true)}
              style={{ paddingRight: '40px', paddingLeft: '40px', marginBottom: '5px' }}
              type="primary"
            >
              Yeni Ekle
            </CustomButton>
          </div>
          <div>
            <CustomTable
              pagination={{
                total: publisherList?.pagedProperty?.totalCount,
                current: publisherList?.pagedProperty?.currentPage,
                pageSize: publisherList?.pagedProperty?.pageSize,
                position: 'bottomRight',
                showSizeChanger: true,
              }}
              onChange={(e) => {
                dispatch(getPublisherList({ params: { PageSize: e.pageSize, PageNumber: e.current } }));
              }}
              columns={columns}
              dataSource={publisherList?.items}
            />
          </div>
        </CustomCollapseCard>
        <CustomModal
          className={'publisher-modal'}
          visible={showAddModal}
          onOk={() => {
            form.submit();
          }}
          title={'Yayın Tanımlama'}
          onCancel={() => {
            form.resetFields();
            setShowAddModal(false);
            setUpdateData(null);
          }}
          okText={updateData ? 'Güncelle' : 'Kaydet'}
        >
          <CustomForm layout={'horizontal'} onFinish={sumbit} form={form}>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              name={'name'}
              label={<Text t="Yayın İsmi" />}
            >
              <CustomInput />
            </CustomFormItem>
            {updateData && (
              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                name={'recordStatus'}
                label={<Text t="Durumu" />}
              >
                <CustomSelect
                  options={[
                    {
                      value: 1,
                      label: 'Aktif',
                    },
                    {
                      value: 0,
                      label: 'Pasif',
                    },
                  ]}
                ></CustomSelect>
              </CustomFormItem>
            )}
          </CustomForm>
        </CustomModal>
      </CustomPageHeader>
    </div>
  );
};

export default Publisher;
