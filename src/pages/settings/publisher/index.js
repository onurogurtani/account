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
      sorter: true,

      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      sorter: true,

      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durum',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: true,

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
                console.log(record);

                setUpdateData(record);
                setShowAddModal(true);
                form.setFieldsValue(record);
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
              dispatch(
                getPublisherList({
                  params: { 'PublisherDetailSearch.OrderBy': 'UpdateTimeDESC' },
                }),
              );
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
    dispatch(
      getPublisherList({
        params: { 'PublisherDetailSearch.OrderBy': 'UpdateTimeDESC' },
      }),
    );
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
              onChange={(pagination, filters, sorter) => {
                let field = '';
                if (sorter.field) {
                  field = sorter?.field[0]?.toUpperCase() + sorter?.field?.substring(1);
                }
                dispatch(
                  getPublisherList({
                    params: {
                      'PublisherDetailSearch.PageSize': pagination.pageSize,
                      'PublisherDetailSearch.PageNumber': pagination.current,
                      'PublisherDetailSearch.OrderBy': field + (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                    },
                  }),
                );
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
