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
  CustomTextArea,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import { getTrialTypeAdd, getTrialTypeList, getTrialTypeUpdate } from '../../../store/slice/trialTypeSlice';
import { Form } from 'antd';
import '../../../styles/settings/trialType.scss';

const TrialType = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrialTypeList({ data: {} }));
  }, [dispatch]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [form] = Form.useForm();

  const { trialTypeList } = useSelector((state) => state.trialType);
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
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: true,

      render: (text, record) => {
        return <>{text ? 'Aktif' : 'Pasif'}</>;
      },
    },
    {
      title: 'Deneme Türü Adı',
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
  const sumbit = useCallback(
    async (e) => {
      if (updateData) {
        const action = await dispatch(
          getTrialTypeUpdate({
            testExamType: {
              isActive: e.isActive,
              name: e.name,
              id: updateData.id,
              description: e.description,
            },
          }),
        );
        if (getTrialTypeUpdate.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              setUpdateData(null);
              dispatch(getTrialTypeList());
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
          getTrialTypeAdd({
            testExamType: {
              isActive: e.isActive,
              name: e.name,
              description: e.description,
            },
          }),
        );
        if (getTrialTypeAdd.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: action?.payload?.message,
            onOk: () => {
              form.resetFields();
              setShowAddModal(false);
              dispatch(getTrialTypeList());
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
  return (
    <div className="trial-type">
      <CustomPageHeader title={'Deneme Türü'}>
        <CustomCollapseCard cardTitle={'Denem Türü'}>
          <div className=" trial-type-table-head">
            <CustomButton
              onClick={() => setShowAddModal(true)}
              style={{ paddingRight: '40px', paddingLeft: '40px', marginBottom: '5px' }}
              type="primary"
            >
              Yeni Ekle
            </CustomButton>
          </div>{' '}
          <CustomTable
            pagination={{
              total: trialTypeList?.pagedProperty?.totalCount,
              current: trialTypeList?.pagedProperty?.currentPage,
              pageSize: trialTypeList?.pagedProperty?.pageSize,
              position: 'bottomRight',
              showSizeChanger: true,
            }}
            onChange={(pagination, filters, sorter) => {
              let field = sorter.field[0].toUpperCase() + sorter.field.substring(1);
              dispatch(
                getTrialTypeList({
                  data: {
                    testExamTypeDetailSearch: {
                      pageSize: pagination.pageSize,
                      pageNumber: pagination.current,
                      orderBy: field + (sorter.order === 'descend' ? 'DESC' : 'ASC'),
                    },
                  },
                }),
              );
            }}
            dataSource={trialTypeList?.items}
            columns={columns}
          ></CustomTable>
        </CustomCollapseCard>
        <CustomModal
          width={'750px'}
          className={'trial-type-modal'}
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
          <CustomForm onFinish={sumbit} form={form}>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              name={'name'}
              label={<Text t="Deneme Türü Adı" />}
            >
              <CustomInput />
            </CustomFormItem>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              name={'description'}
              label={<Text t="Açıklama" />}
            >
              <CustomTextArea />
            </CustomFormItem>
            <CustomFormItem
              rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
              name={'isActive'}
              label={<Text t="Durumu" />}
            >
              <CustomSelect
                options={[
                  {
                    value: true,
                    label: 'Aktif',
                  },
                  {
                    value: false,
                    label: 'Pasif',
                  },
                ]}
              ></CustomSelect>
            </CustomFormItem>
          </CustomForm>
        </CustomModal>
      </CustomPageHeader>
    </div>
  );
};

export default TrialType;
