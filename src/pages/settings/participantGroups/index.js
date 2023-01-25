import React, { useEffect, useState } from 'react';
import { Form, Popconfirm } from 'antd';
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
  Option,
  CustomImage,
  Text,
} from '../../../components';
import {
  createParticipantGroups,
  deleteParticipantGroups,
  getParticipantGroupsPagedList,
  updateParticipantGroups,
} from '../../../store/slice/participantGroupsSlice';
import { getPackageTypeList } from '../../../store/slice/packageTypeSlice';
import '../../../styles/settings/participantGroups.scss';
import iconFilter from '../../../assets/icons/icon-filter.svg';
import ParticipantGroupsFilter from './ParticipantGroupsFilter';

const ParticipantGroups = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const { participantsGroupList } = useSelector((state) => state.participantGroups);
  const { packageTypeList } = useSelector((state) => state?.packageType);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipantGroupsPagedList());
    dispatch(getPackageTypeList());
  }, [dispatch]);

  const submit = async (values) => {
    if (updateData) {
      const action = await dispatch(updateParticipantGroups(updateData));
      if (updateParticipantGroups.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            form.resetFields();
            setShowAddModal(false);
            dispatch(getParticipantGroupsPagedList());
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: 'Bilgileri kontrol ediniz.',
        });
      }
    } else {
      const action = await dispatch(createParticipantGroups(values));
      if (createParticipantGroups.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
          onOk: () => {
            form.resetFields();
            setShowAddModal(false);
            dispatch(getParticipantGroupsPagedList());
          },
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: 'Bilgileri kontrol ediniz.',
        });
      }
    }
  };

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
      title: 'Katılımcı Grubu Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: true,

      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Katılımcı Türü',
      dataIndex: 'participantType',
      key: 'participantType',
      sorter: true,

      render: (text, record) => {
        return <>{text === 1 ? 'Öğrenci' : 'Veli'}</>;
      },
    },
    {
      title: 'Dahil Olan Paketler',
      dataIndex: 'packagesId',
      key: 'packagesId',
      sorter: true,

      render: (text, record) => {
        return <>{text}</>;
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'draftDeleteAction',
      key: 'draftDeleteAction',
      width: 300,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="action-btns">
            <CustomButton
              type="primary"
              onClick={() => {
                setUpdateData(record);
                setShowAddModal(true);
                form.setFieldsValue({ ...record, participantType: record.participantType === 1 ? 'Öğrenci' : 'Veli' });
              }}
              className="edit-button"
            >
              DÜZENLE
            </CustomButton>
            <Popconfirm
              onConfirm={() => {
                dispatch(deleteParticipantGroups(record.id));
                dispatch(getParticipantGroupsPagedList());
              }}
              title="Silmek İstediğinizden Emin Misiniz?"
              okText="Evet"
              cancelText="Hayır"
            >
              <CustomButton type="primary" danger className="delete-button">
                SİL
              </CustomButton>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <CustomPageHeader>
        <CustomCollapseCard cardTitle={'Katılımcı Grubu'}>
          <div className=" table-head">
            <CustomButton
              onClick={() => setShowAddModal(true)}
              style={{
                paddingRight: '40px',
                paddingLeft: '40px',
                marginBottom: '5px',
                backgroundColor: 'green',
                border: 'none',
              }}
              type="primary"
            >
              Yeni Ekle
            </CustomButton>
            <CustomButton
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              type="primary"
              style={{ float: 'right', marginRight: '15px' }}
            >
              <CustomImage src={iconFilter} />
            </CustomButton>
            {showFilter && <ParticipantGroupsFilter />}

            <CustomTable
              pagination={{
                total: participantsGroupList?.pagedProperty?.totalCount,
                current: participantsGroupList?.pagedProperty?.currentPage,
                pageSize: participantsGroupList?.pagedProperty?.pageSize,
                position: 'bottomRight',
                showSizeChanger: true,
              }}
              onChange={(pagination, filters, sorter) => {
                dispatch(
                  getParticipantGroupsPagedList({
                    params: {
                      'ParticipantGroupDetailSearch.PageSize': pagination.pageSize,
                      'ParticipantGroupDetailSearch.PageNumber': pagination.current,
                    },
                  }),
                );
              }}
              columns={columns}
              dataSource={participantsGroupList?.items}
            />
          </div>
          <CustomModal
            className={'publisher-modal'}
            width={600}
            visible={showAddModal}
            onOk={() => {
              form.submit();
            }}
            title={'Yeni Katılımcı Grubu Ekleme'}
            onCancel={() => {
              form.resetFields();
              setShowAddModal(false);
            }}
            okText={updateData ? 'Güncelle' : 'Kaydet'}
          >
            <CustomForm onFinish={submit} form={form}>
              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                name={'name'}
                label={<Text t="Katılımcı Grubu Adı" />}
              >
                <CustomInput />
              </CustomFormItem>
              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                name={'participantType'}
                label={<Text t="Katılımcı Türü" />}
              >
                <CustomSelect placeholder="Katılımcı Türü">
                  <Option key={'1'} value={1}>
                    <Text t={'Öğrenci'} />
                  </Option>
                  <Option key={'2'} value={2}>
                    <Text t={'Veli'} />
                  </Option>
                </CustomSelect>
              </CustomFormItem>
              <CustomFormItem
                rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                name={'packageIds'}
                label={<Text t="Dahil Olan Paketler" />}
              >
                <CustomSelect placeholder="Paket Seçiniz" mode="multiple">
                  {packageTypeList?.map((item) => {
                    return (
                      <Option key={`packageTypeList-${item.id}`} value={item.id}>
                        <Text t={item.name} />
                      </Option>
                    );
                  })}
                </CustomSelect>
              </CustomFormItem>
            </CustomForm>
          </CustomModal>
        </CustomCollapseCard>
      </CustomPageHeader>
    </div>
  );
};

export default ParticipantGroups;
